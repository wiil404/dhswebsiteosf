import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase-admin";


export async function GET(){


    const {

        data:employee

    } = await supabaseAdmin

    .from("employees")

    .select("id, roblox_user_id")

    .eq(
        "roblox_user_id",
        333195903
    )

    .single();





    if(!employee){

        return NextResponse.json(
            {
                error:"Employee not found"
            },
            {
                status:404
            }
        );

    }






    const {

        data:session

    } = await supabaseAdmin

    .from("employee_sessions")

    .insert({

        employee_id:employee.id,

        roblox_user_id:employee.roblox_user_id

    })

    .select()

    .single();







    const response = NextResponse.redirect(

        new URL(
            "/employee/dashboard",
            process.env.NEXT_PUBLIC_SITE_URL ||
            "https://www.osfusadhs.com"
        )

    );




    response.cookies.set(

        "employee_session",

        session.id,

        {

            httpOnly:true,

            secure:false,

            sameSite:"lax",

            maxAge:60 * 60 * 24 * 7

        }

    );




    return response;


}
