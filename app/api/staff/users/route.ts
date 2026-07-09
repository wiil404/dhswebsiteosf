import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase-server";
import { getProfile } from "../../../lib/permissions";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { createAuditLog } from "../../../lib/audit";



export async function GET(){


    try{


        const profile = await getProfile();



        if(
            !profile ||
            profile.role !== "Administrator"
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
            data:profiles,
            error:profileError
        } = await supabaseAdmin

            .from("profiles")

            .select(
                `
                id,
                email,
                role,
                added_by
                `
            )

            .order(
                "email",
                {
                    ascending:true
                }
            );





        if(profileError){

            console.error(
                "PROFILE LOAD ERROR:",
                profileError
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







        const {
            data:employees,
            error:employeeError
        } = await supabaseAdmin

            .from("employees")

            .select(
                `
                id,
                user_id,
                roblox_username,
                roblox_user_id,
                email,
                division_id,
                position_id
                `
            );







        if(employeeError){

            console.error(
                "EMPLOYEE LOAD ERROR:",
                employeeError
            );

        }








        const users = profiles.map(
            (user:any)=>{


                return {

                    ...user,


                    employees:

                        employees?.find(
                            (employee:any)=>
                                employee.user_id === user.id
                        )
                        ||
                        null


                };


            }
        );







        return NextResponse.json(
            users
        );




    }
    catch(error:any){


        console.error(
            "STAFF USERS GET ERROR:",
            error
        );


        return NextResponse.json(
            {
                error:
                error.message ||
                "Server error"
            },
            {
                status:500
            }
        );


    }


}









export async function PATCH(request:Request){



    const profile = await getProfile();




    if(
        !profile ||
        profile.role !== "Administrator"
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
        role
    } = await request.json();







    if(!id || !role){


        return NextResponse.json(
            {
                error:"Missing information"
            },
            {
                status:400
            }
        );


    }







    // Get current user information before update

    const {
        data: targetUser,
        error: findError
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







    if(findError || !targetUser){


        return NextResponse.json(
            {
                error:"User not found"
            },
            {
                status:404
            }
        );


    }








    const oldRole = targetUser.role;







    const {
        error
    } = await supabaseAdmin

        .from("profiles")

        .update({

            role,

            updated_by: profile.email

        })

        .eq(
            "id",
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








    await createAuditLog({

        action:"STAFF_ROLE_CHANGED",

        severity:"INFO",

        targetType:"Staff User",


        targetId:String(id),


        description:

            `Changed ${targetUser.email}'s role from "${oldRole}" to "${role}"`


    });








    return NextResponse.json({

        success:true

    });



}