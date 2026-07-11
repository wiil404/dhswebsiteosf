import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";


export async function GET(){

    const {
        data,
        error
    } = await supabaseAdmin

        .from("divisions")

        .select(`
            id,
            name
        `)

        .order(
            "name",
            {
                ascending:true
            }
        );



    if(error){

        console.error(
            "DIVISIONS ERROR:",
            error
        );


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
        data || []
    );


}