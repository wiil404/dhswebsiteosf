import { NextResponse } from "next/server";

import { supabaseAdmin } from "../../../lib/supabase-admin";

import { hasPermission } from "../../../lib/permissions";



export async function GET(){


    const allowed = await hasPermission(
        "audit.view"
    );



    if(!allowed){

        return NextResponse.json(
            {
                error:"Unauthorized"
            },
            {
                status:403
            }
        );

    }




    const {

        data,

        error

    } = await supabaseAdmin

        .from("audit_logs")

        .select("*")

        .order(
            "created_at",
            {
                ascending:false
            }
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
        data
    );


}