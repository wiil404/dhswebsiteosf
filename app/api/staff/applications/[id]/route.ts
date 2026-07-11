import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase-server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";





async function getEmployee(){


    const supabase = await createClient();



    const {
        data:{
            user
        }

    } = await supabase.auth.getUser();




    if(!user){

        return null;

    }







    const {
        data:employee,
        error

    } = await supabaseAdmin

        .from("employees")

        .select(`

            id,

            division_id,

            positions(
                title
            )

        `)

        .eq(
            "user_id",
            user.id
        )

        .single();






    if(error){

        return null;

    }




    return employee;


}









function hasAccess(
    employee:any
){


    if(!employee){

        return false;

    }




    // Supabase returns relationships as arrays

    const position =
        employee.positions?.[0]?.title || "";





    const allowedRoles = [



        // Office of the Secretary

        "Secretary of Homeland Security",

        "Deputy Secretary of Homeland Security",

        "Chief of Staff",

        "Under Secretary",




        // Secret Service

        "Deputy Special Agent in Charge (SS)",

        "Special Agent in Charge (SS)",

        "Assistant Director",

        "Deputy Director",

        "Secret Service Director",




        // LEHT

        "Flight Officer",

        "Senior Flight Officer",

        "Under Secretary for Aviation Operations",




        // Public Affairs

        "Under Secretary for Public Affairs",




        // CBP

        "Supervisory Customs Agent",

        "CBP Deputy Commissioner",

        "CBP Commissioner"


    ];






    return allowedRoles.some(role =>

        position.includes(role)

    );


}













export async function GET(

    request:Request,

    context:{
        params:{
            id:string
        }
    }

){



    const employee =
        await getEmployee();





    if(!hasAccess(employee)){


        return NextResponse.json(

            {
                error:
                "You do not have permission to view applications"
            },

            {
                status:403
            }

        );


    }







    const {

        data:application,

        error

    } = await supabaseAdmin

        .from("applications")

        .select(`

            *,

            divisions(
                name
            ),


            application_answers(

                id,

                answer,

                questions(

                    question

                )

            ),


            application_reviews(

                *

            )


        `)

        .eq(

            "id",

            context.params.id

        )

        .single();








    if(error){


        return NextResponse.json(

            {
                error:error.message
            },

            {
                status:500
            }

        );


    }








    return NextResponse.json({

        ...application,

        answers:
        application.application_answers || []

    });



}













export async function PATCH(

    request:Request,

    context:{
        params:{
            id:string
        }
    }

){



    const employee =
        await getEmployee();






    if(!hasAccess(employee)){


        return NextResponse.json(

            {
                error:
                "You do not have permission to update applications"
            },

            {
                status:403
            }

        );


    }








    const body =
        await request.json();





    const {

        status,

        internal_notes

    } = body;









    const {

        error:updateError

    } = await supabaseAdmin

        .from("applications")

        .update({

            status,

            internal_notes


        })

        .eq(

            "id",

            context.params.id

        );









    if(updateError){


        return NextResponse.json(

            {
                error:updateError.message
            },

            {
                status:500
            }

        );


    }









    await supabaseAdmin

        .from("application_reviews")

        .insert({


            application_id:

            context.params.id,



            employee_id:

            employee.id,



            action:

            status,



            notes:

            internal_notes || null


        });









    return NextResponse.json({

        success:true

    });


}