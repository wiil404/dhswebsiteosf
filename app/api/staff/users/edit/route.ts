import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";
import { getProfile } from "../../../../lib/permissions";
import { createAuditLog } from "../../../../lib/audit";



export async function PATCH(request: Request){


    try {


        const admin = await getProfile();



        if(
            !admin ||
            admin.role !== "Administrator"
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
            id,
            email,
            password,
            role

        } = await request.json();





        if(!id){

            return NextResponse.json(
                {
                    error:"Missing user ID"
                },
                {
                    status:400
                }
            );

        }







        // Get existing profile

        const {
            data:oldUser,
            error:findError

        } = await supabaseAdmin

            .from("profiles")

            .select(
                "id,email,role"
            )

            .eq(
                "id",
                id
            )

            .single();






        if(findError || !oldUser){


            return NextResponse.json(
                {
                    error:"User not found"
                },
                {
                    status:404
                }
            );

        }








        const changes:any = {};





        if(
            email &&
            email !== oldUser.email
        ){

            changes.old_email = oldUser.email;

            changes.new_email = email;

        }






        if(
            role &&
            role !== oldUser.role
        ){

            changes.old_role = oldUser.role;

            changes.new_role = role;

        }






        if(password){

            changes.password_changed = true;

        }








        // Update Supabase Auth account

        if(
            email ||
            password
        ){


            const {
                error:userError

            } = await supabaseAdmin.auth.admin.updateUserById(

                id,

                {

                    email: email || undefined,

                    password: password || undefined

                }

            );




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

        }










        // Update profile table

        const {
            error:profileError

        } = await supabaseAdmin

            .from("profiles")

            .update({

                ...(email && {
                    email
                }),

                ...(role && {
                    role
                }),

                updated_by:
                    admin.email

            })

            .eq(
                "id",
                id
            );






        if(profileError){

            return NextResponse.json(
                {
                    error:profileError.message
                },
                {
                    status:500
                }
            );

        }









        // Create audit entry

        await createAuditLog({

            action:"STAFF_UPDATED",

            targetType:"Staff",

            targetId:id,

            description:
                `Updated staff account "${oldUser.email}"`,

            details:changes

        });










        return NextResponse.json({

            success:true

        });





    } catch(error){


        console.error(
            "EDIT STAFF ERROR:",
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