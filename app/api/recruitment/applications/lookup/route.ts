import {NextResponse} from "next/server";
import {supabaseAdmin} from "../../../../lib/supabase-admin";



export async function POST(
    request:Request
){

    try {


        const body =
            await request.json();



        let {

            application_number,

            roblox_username

        } = body;




        if(
            !application_number ||
            !roblox_username
        ){

            return NextResponse.json(

                {
                    error:
                    "Application number and Roblox username are required."
                },

                {
                    status:400
                }

            );

        }






        // Clean user input

        application_number =
            application_number
            .trim()
            .toUpperCase();



        roblox_username =
            roblox_username
            .trim();







        const {

            data:application,

            error

        } = await supabaseAdmin

            .from("applications")

            .select(`

                *,

                divisions(
                    name
                )

            `)

            .eq(

                "application_number",

                application_number

            )

            .ilike(

                "roblox_username",

                roblox_username

            )

            .maybeSingle();








        console.log(
            "LOOKUP RESULT",
            application,
            error
        );








        if(error || !application){


            return NextResponse.json(

                {
                    error:
                    "No application found with those details."
                },

                {
                    status:404
                }

            );


        }







        return NextResponse.json({

            application

        });







    }

    catch(error){


        console.error(error);



        return NextResponse.json(

            {
                error:
                "Internal server error."
            },

            {
                status:500
            }

        );


    }


}
