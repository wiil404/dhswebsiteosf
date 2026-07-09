import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";


export async function GET(
    request: Request,
    context:{
        params: Promise<{
            id:string
        }>
    }
){


    const {
        id
    } = await context.params;



    const {
        data,
        error

    } = await supabaseAdmin

    .from("employees")

    .select(`

        id,

        roblox_username,

        roblox_user_id,

        email,

        employee_number,

        status,

        position_id,

        division_id,


        positions(
            title
        ),


        divisions(
            name
        )

    `)

    .eq(
        "id",
        id
    )

    .single();





    if(error || !data){


        console.error(
            "EMPLOYEE API ERROR:",
            error
        );


        return NextResponse.json(
            {
                error:error?.message || "Employee not found"
            },
            {
                status:500
            }
        );

    }





    const employee = {

        ...data,


        positions:

            Array.isArray(data.positions)

            ?

            data.positions[0] || null

            :

            data.positions,



        divisions:

            Array.isArray(data.divisions)

            ?

            data.divisions[0] || null

            :

            data.divisions


    };





    return NextResponse.json(
        employee
    );


}







export async function PATCH(
    request:Request,
    context:{
        params:Promise<{
            id:string
        }>
    }
){


    const {
        id
    } = await context.params;



    const updates =
        await request.json();





    const {
        error

    } = await supabaseAdmin

    .from("employees")

    .update(
        updates
    )

    .eq(
        "id",
        id
    );





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
        {
            success:true
        }
    );


}