import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabase-admin";
import { getProfile } from "../../../../../lib/permissions";
import { createAuditLog } from "../../../../../lib/audit";



export async function POST(
    request: Request,
    context: {
        params: Promise<{
            id: string;
        }>;
    }
){


    const {
        id
    } = await context.params;





    const admin =
        await getProfile();





    if(!admin){

        return NextResponse.json(
            {
                error:"Unauthorized"
            },
            {
                status:403
            }
        );

    }






    const body =
        await request.json();



    const {
        action
    } = body;







    const {
        data:employee,
        error:employeeError

    } = await supabaseAdmin

        .from("employees")

        .select(`

            *,

            divisions(
                name
            ),

            positions(
                title
            )

        `)

        .eq(
            "id",
            id
        )

        .single();






    if(employeeError || !employee){

        return NextResponse.json(
            {
                error:"Employee not found"
            },
            {
                status:404
            }
        );

    }










    /*
        PROMOTION
    */


    if(action === "PROMOTE"){


        const {
            error
        } = await supabaseAdmin

            .from("employment_history")

            .insert({

                employee_id:employee.id,

                division_id:employee.division_id,

                position_id:body.position_id,

                action:"Promotion",

                notes:
                body.notes ||
                "Employee promoted"

            });



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





        await supabaseAdmin

            .from("employees")

            .update({

                position_id:
                body.position_id

            })

            .eq(
                "id",
                employee.id
            );


    }









    /*
        TRANSFER
    */


    if(action === "TRANSFER"){


        await supabaseAdmin

            .from("employment_history")

            .insert({

                employee_id:employee.id,

                division_id:
                body.division_id,

                position_id:
                employee.position_id,

                action:"Division Transfer",

                notes:
                body.notes ||
                "Transferred"

            });





        await supabaseAdmin

            .from("employees")

            .update({

                division_id:
                body.division_id

            })

            .eq(
                "id",
                employee.id
            );


    }









    /*
        AWARD
    */


    if(action === "AWARD"){


        await supabaseAdmin

            .from("employee_awards")

            .insert({

                employee_id:
                employee.id,

                award_name:
                body.award_name,

                description:
                body.description,

                awarded_by:
                admin.email

            });


    }









    /*
        DISCIPLINE
    */


    if(action === "DISCIPLINE"){


        await supabaseAdmin

            .from("disciplinary_records")

            .insert({

                employee_id:
                employee.id,

                category:
                body.category ||
                "Disciplinary Action",

                description:
                body.description,

                outcome:
                body.outcome ||
                "Pending",

                issued_by:
                admin.email

            });


    }









    /*
        RETIRE
    */


    if(action === "RETIRE"){


        await supabaseAdmin

            .from("employees")

            .update({

                status:"Retired",

                termination_date:
                new Date()

            })

            .eq(
                "id",
                employee.id
            );


    }









    /*
        TERMINATE
    */


    if(action === "TERMINATE"){


        await supabaseAdmin

            .from("employees")

            .update({

                status:"Terminated",

                termination_date:
                new Date()

            })

            .eq(
                "id",
                employee.id
            );


    }









    await createAuditLog({

        action:
        `EMPLOYEE_${action}`,

        targetType:
        "Employee",

        targetId:
        employee.id,

        description:
        `${employee.roblox_username} ${action.toLowerCase()} action performed`,


        details:{

            roblox_username:
            employee.roblox_username,

            roblox_user_id:
            employee.roblox_user_id,

            performed_by:
            admin.email

        }


    });









    return NextResponse.json({

        success:true

    });


}