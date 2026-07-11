import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";


export async function GET(
    request: Request
){

    const { searchParams } = new URL(request.url);


    const division =
        searchParams.get("division");



    if(!division){

        return NextResponse.json(
            {
                error:"No division provided"
            },
            {
                status:400
            }
        );

    }






    const {

        data,

        error

    } = await supabaseAdmin


        .from("application_questions")


        .select(`

            id,

            question,

            question_order

        `)


        .eq(

            "division_id",

            division

        )


        .eq(

            "active",

            true

        )


        .order(

            "question_order",

            {
                ascending:true
            }

        );







    if(error){

        console.error(
            "QUESTIONS ERROR:",
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