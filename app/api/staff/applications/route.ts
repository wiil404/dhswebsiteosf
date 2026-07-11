import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase-server";
import { supabaseAdmin } from "../../../lib/supabase-admin";



export async function GET(){



    const supabase = await createClient();




    const {
        data:{
            user
        }

    } = await supabase.auth.getUser();





    if(!user){


        return NextResponse.json(

            {
                error:"Not authenticated"
            },

            {
                status:401
            }

        );


    }









    /*
        Find logged in employee
    */


    const {

        data:employee,

        error:employeeError

    } = await supabaseAdmin

        .from("employees")

        .select(`

            id,

            division_id,

            divisions(
                name
            ),

            positions(
                title
            )

        `)

        .eq(

            "user_id",

            user.id

        )

        .single();







    if(employeeError || !employee){


        return NextResponse.json(

            {
                error:"Employee profile not found"
            },

            {
                status:403
            }

        );


    }









    const position =
        employee.positions?.title || "";



    const division =
        employee.division_id;









    /*
        Permission Groups
    */







    // Office of the Secretary

    const secretaryAccess = [


        "Secretary of Homeland Security",

        "Deputy Secretary of Homeland Security",

        "Chief of Staff",

        "Under Secretary"


    ];









    // United States Secret Service

    const secretServiceAccess = [


        "Deputy Special Agent in Charge (SS)",

        "Special Agent in Charge (SS)",

        "Assistant Director",

        "Deputy Director",

        "Secret Service Director"


    ];









    // Law Enforcement Helicopter Taskforce

    const lehtAccess = [


        "Flight Officer",

        "Senior Flight Officer",

        "Under Secretary for Aviation Operations"


    ];









    // Public Affairs

    const paoAccess = [


        "Under Secretary for Public Affairs"


    ];









    // Customs and Border Protection

    const cbpAccess = [


        "Supervisory Customs Agent",

        "CBP Deputy Commissioner",

        "CBP Commissioner"


    ];













    let query = supabaseAdmin

        .from("applications")

        .select(`

            *,

            divisions(
                name
            ),

            application_reviews(

                *

            )

        `)

        .order(

            "created_at",

            {

                ascending:false

            }

        );












    /*
        Office of Secretary
        Full access
    */


    if(

        secretaryAccess.some(rank =>

            position.includes(rank)

        )

    ){


        // No filter


    }









    /*
        Secret Service leadership

    */


    else if(

        secretServiceAccess.some(rank =>

            position.includes(rank)

        )

    ){



        query = query.eq(

            "division_id",

            division

        );


    }









    /*
        LEHT leadership

    */


    else if(

        lehtAccess.some(rank =>

            position.includes(rank)

        )

    ){



        query = query.eq(

            "division_id",

            division

        );


    }









    /*
        Public Affairs

    */


    else if(

        paoAccess.some(rank =>

            position.includes(rank)

        )

    ){



        query = query.eq(

            "division_id",

            division

        );


    }









    /*
        CBP

    */


    else if(

        cbpAccess.some(rank =>

            position.includes(rank)

        )

    ){



        query = query.eq(

            "division_id",

            division

        );


    }









    else{


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

        data:applications,

        error

    } = await query;









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









    return NextResponse.json(

        applications || []

    );



}