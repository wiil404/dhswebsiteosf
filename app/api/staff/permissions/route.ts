import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { getProfile } from "../../../lib/permissions";
import { createAuditLog } from "../../../lib/audit";



export async function GET(request: Request){


    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");



    if(!id){

        return NextResponse.json(
            {
                error:"Missing id"
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

        .from("user_permissions")

        .select(`
            permission_id,
            permissions(
                name,
                description
            )
        `)

        .eq(
            "user_id",
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
        data || []
    );

}







export async function POST(request: Request){


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
            user_id,
            permissions
        } = await request.json();





        if(!user_id){

            return NextResponse.json(
                {
                    error:"Missing user ID"
                },
                {
                    status:400
                }
            );

        }





        const {
            data:targetProfile
        } = await supabaseAdmin

            .from("profiles")

            .select(
                "email,role"
            )

            .eq(
                "id",
                user_id
            )

            .single();





        if(!targetProfile){

            return NextResponse.json(
                {
                    error:"Staff member not found"
                },
                {
                    status:404
                }
            );

        }





        const {
            data:oldPermissions
        } = await supabaseAdmin

            .from("user_permissions")

            .select(`
                permission_id,
                permissions(
                    name
                )
            `)

            .eq(
                "user_id",
                user_id
            );







        const oldNames =
            oldPermissions?.map(
                (x:any)=>x.permissions.name
            ) || [];







        const {
            data:newPermissions
        } = await supabaseAdmin

            .from("permissions")

            .select(
                "name"
            )

            .in(
                "id",
                permissions
            );





        const newNames =
            newPermissions?.map(
                (x:any)=>x.name
            ) || [];








        const added =
            newNames.filter(
                (x:string)=>!oldNames.includes(x)
            );



        const removed =
            oldNames.filter(
                (x:string)=>!newNames.includes(x)
            );







        const {
            error:deleteError
        } = await supabaseAdmin

            .from("user_permissions")

            .delete()

            .eq(
                "user_id",
                user_id
            );





        if(deleteError){

            return NextResponse.json(
                {
                    error:deleteError.message
                },
                {
                    status:500
                }
            );

        }








        if(
            permissions.length > 0
        ){


            const {
                error:insertError
            } = await supabaseAdmin

                .from("user_permissions")

                .insert(

                    permissions.map(
                        (permission_id:string)=>({

                            user_id,

                            permission_id

                        })
                    )

                );





            if(insertError){

                return NextResponse.json(
                    {
                        error:insertError.message
                    },
                    {
                        status:500
                    }
                );

            }

        }








        if(
            added.length ||
            removed.length
        ){

            await createAuditLog({

                action:
                    "STAFF_PERMISSIONS_UPDATED",


                targetType:
                    "Staff",


                targetId:
                    String(user_id),



                description:
                    `Updated permissions for staff member "${targetProfile.email}"`,



                details:{


                    staff_email:
                        targetProfile.email,


                    staff_role:
                        targetProfile.role,



                    added_permissions:
                        added,



                    removed_permissions:
                        removed,



                    changed_by:
                        admin.email

                }

            });

        }








        return NextResponse.json({

            success:true

        });





    } catch(error:any){


        console.error(
            "PERMISSIONS UPDATE ERROR:",
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


}