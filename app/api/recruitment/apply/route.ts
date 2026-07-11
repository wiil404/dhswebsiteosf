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

            answers

        } = body;







        if(
            !roblox_username ||
            !email ||
            !division
        ){

            return NextResponse.json(

                {
                    error:
                    "Please complete all required information."
                },

                {
                    status:400
                }

            );

        }








        /*
            Verify Division
        */


        const {

            data:divisionData,

            error:divisionError

        } = await supabaseAdmin

            .from("divisions")

            .select(
                "id,name"
            )

            .eq(
                "id",
                division
            )

            .single();







        if(
            divisionError ||
            !divisionData
        ){

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

            error:applicationError

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


                status:
                "SUBMITTED"


            })

            .select()

            .single();








        if(applicationError){


            console.error(
                applicationError
            );


            return NextResponse.json(

                {
                    error:
                    applicationError.message
                },

                {
                    status:500
                }

            );


        }









        /*
            Save Answers
        */



        if(
            answers &&
            Object.keys(answers).length > 0
        ){


            const answerRows = Object.entries(
                answers
            )

            .map(
                ([question_id,answer])=>(

                {

                    application_id:
                    application.id,


                    question_id,


                    answer:
                    String(answer)

                }

            ));







            const {

                error:answerError

            } = await supabaseAdmin

                .from("application_answers")

                .insert(
                    answerRows
                );







            if(answerError){


                console.error(
                    answerError
                );



                return NextResponse.json(

                    {
                        error:
                        "Application created but answers failed saving."
                    },

                    {
                        status:500
                    }

                );


            }


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


        console.error(
            error
        );


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
