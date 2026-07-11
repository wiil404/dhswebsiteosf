import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";



export async function POST(
    request: Request
){

    try {


        const body = await request.json();



        const {

            roblox_username,

            roblox_user_id,

            discord_username,

            email,

            division,

            experience,

            motivation,

            suitability,

            availability

        } = body;






        if(
            !roblox_username ||
            !email ||
            !division
        ){

            return NextResponse.json(

                {
                    error:
                    "Please complete all required fields."
                },

                {
                    status:400
                }

            );

        }








        /*
            Find division
        */


        const {

            data:divisionData,

            error:divisionError

        } = await supabaseAdmin

            .from("divisions")

            .select("id,name")

            .eq(
                "name",
                division
            )

            .single();







        if(divisionError || !divisionData){


            return NextResponse.json(

                {
                    error:
                    "Invalid division selected."
                },

                {
                    status:400
                }

            );


        }









        /*
            Create Application
        */


        const {

            data:application,

            error

        } = await supabaseAdmin

            .from("applications")

            .insert({

                roblox_username,

                roblox_user_id:
                roblox_user_id
                ?
                Number(roblox_user_id)
                :
                null,


                discord_username,

                email,


                division_id:
                divisionData.id,


                division_name:
                divisionData.name,


                experience,

                motivation,

                suitability,

                availability,


                status:
                "SUBMITTED"


            })

            .select()

            .single();








        if(error){


            console.error(
                "APPLICATION ERROR:",
                error
            );


            return NextResponse.json(

                {
                    error:
                    error.message
                },

                {
                    status:500
                }

            );


        }









        return NextResponse.json(

            {

                success:true,

                application_number:
                application.application_number

            }

        );





    }

    catch(error){


        console.error(error);


        return NextResponse.json(

            {
                error:
                "Server error submitting application."
            },

            {
                status:500
            }

        );


    }


}