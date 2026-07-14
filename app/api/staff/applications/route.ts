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





    const {
        data:employee,
        error:employeeError

    } = await supabaseAdmin

    .from("employees")

    .select(`
        id,
        division_id,
        position_id
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






    let positionTitle = "";



    if(employee.position_id){


        const {
            data:position

        } = await supabaseAdmin

        .from("positions")

        .select("title")

        .eq(
            "id",
            employee.position_id
        )

        .single();



        positionTitle =
            position?.title || "";

    }




    console.log(
        "STAFF POSITION:",
        positionTitle
    );







    const secretaryAccess = [

        "Secretary of Homeland Security",
        "Deputy Secretary of Homeland Security",
        "Chief of Staff",
        "Under Secretary"

    ];



    const divisionAccess = [

        "Supervisory Special Agent",
        "Deputy Special Agent in Charge (SS)",
        "Special Agent in Charge (SS)",
        "Assistant Director",
        "Deputy Director",
        "Secret Service Director",

        "Flight Officer",
        "Senior Flight Officer",
        "Under Secretary for Aviation Operations",

        "Under Secretary for Public Affairs",

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
        )
    `)

    .order(
        "created_at",
        {
            ascending:false
        }
    );








    if(
        secretaryAccess.includes(positionTitle)
    ){

        // Full access


    }


    else if(

        divisionAccess.includes(positionTitle)

    ){


        query = query.eq(
            "division_id",
            employee.division_id
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
