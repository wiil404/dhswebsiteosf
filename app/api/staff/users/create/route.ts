import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { getProfile } from "../../../../lib/permissions";

import { createAuditLog } from "../../../../lib/audit";





export async function POST(request:Request){


    try {


        const adminProfile =
            await getProfile();





        if(
            !adminProfile ||
            adminProfile.role !== "Administrator"
        ){

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

            email,

            password,

            role,

            employee_id

        } = await request.json();







        if(
            !email ||
            !password ||
            !role
        ){

            return NextResponse.json(
                {
                    error:"Missing information"
                },
                {
                    status:400
                }
            );

        }







        /*
            CREATE AUTH ACCOUNT
        */


        const {

            data:userData,

            error:userError

        } = await supabaseAdmin.auth.admin.createUser({

            email,

            password,

            email_confirm:true

        });








        if(userError){


            return NextResponse.json(
                {
                    error:userError.message
                },
                {
                    status:500
                }
            );

        }








        /*
            CREATE PROFILE
        */


        const {

            error:profileError

        } = await supabaseAdmin

            .from("profiles")

            .insert({

                id:userData.user.id,

                email,

                role,

                added_by:
                adminProfile.email


            });







        if(profileError){


            await supabaseAdmin.auth.admin.deleteUser(
                userData.user.id
            );


            return NextResponse.json(
                {
                    error:profileError.message
                },
                {
                    status:500
                }
            );

        }









        /*
            LINK EMPLOYEE ACCOUNT
        */


        if(employee_id){

            const {
                data:employee,
                error:employeeError
            } = await supabaseAdmin

                .from("employees")

                .update({

                    user_id:userData.user.id,

                    email

                })

                .eq(
                    "id",
                    employee_id
                )

                .select()

                .single();



            if(employeeError){

                console.error(
                    "EMPLOYEE LINK ERROR:",
                    employeeError
                );


            }
            else{

                console.log(
                    "EMPLOYEE LINKED:",
                    employee
                );

            }

        }









        await createAuditLog({

            action:"STAFF_CREATED",

            severity:"INFO",

            targetType:"Staff User",

            targetId:String(
                userData.user.id
            ),


            description:

            `Created staff account "${email}" with role "${role}"`


        });







        return NextResponse.json({

            success:true,

            user_id:userData.user.id


        });








    }
    catch(error){


        console.error(
            "CREATE STAFF ERROR:",
            error
        );



        return NextResponse.json(
            {
                error:"Server error"
            },
            {
                status:500
            }
        );

    }


}