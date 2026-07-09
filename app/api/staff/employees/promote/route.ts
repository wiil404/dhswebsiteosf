import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";
import { getProfile } from "../../../../lib/permissions";


export async function POST(
    request: Request
){

    try {


        const profile = await getProfile();



        if(!profile){

            return NextResponse.json(
                {
                    error:"Not logged in"
                },
                {
                    status:401
                }
            );

        }



        if(
            profile.role !== "Administrator" &&
            profile.role !== "Editor"
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
            employee_id,
            position_id,
            reason
        } = await request.json();




        if(
            !employee_id ||
            !position_id
        ){

            return NextResponse.json(
                {
                    error:"Missing fields"
                },
                {
                    status:400
                }
            );

        }





        // Get employee current details

        const {
            data:employee,
            error:employeeError

        } = await supabaseAdmin

        .from("employees")

        .select(`
            id,
            position_id,
            division_id
        `)

        .eq(
            "id",
            employee_id
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





        // Get new position information

        const {
            data:newPosition,
            error:positionError

        } = await supabaseAdmin

        .from("positions")

        .select(`
            division_id
        `)

        .eq(
            "id",
            position_id
        )

        .single();




        if(positionError || !newPosition){

            return NextResponse.json(
                {
                    error:"Position not found"
                },
                {
                    status:404
                }
            );

        }





        // Update employee

        const {
            error:updateError

        } = await supabaseAdmin

        .from("employees")

        .update({

            position_id,

            division_id:
                newPosition.division_id

        })

        .eq(
            "id",
            employee_id
        );





        if(updateError){

            return NextResponse.json(
                {
                    error:updateError.message
                },
                {
                    status:500
                }
            );

        }






        // Add career history

        const {
            error:historyError

        } = await supabaseAdmin

        .from("employment_history")
.insert({

    employee_id,

    old_position_id:
        employee.position_id,

    new_position_id:
        position_id,


    old_division_id:
        employee.division_id,

    new_division_id:
        newPosition.division_id,


    action:
        "Promotion",


    notes:
        reason || "Promotion",


    changed_by:
        profile.employee_id,


    effective_date:
        new Date()
        .toISOString()
        .split("T")[0]

});





        if(historyError){

            console.error(
                "PROMOTION HISTORY ERROR:",
                historyError
            );


            return NextResponse.json(
                {
                    error:historyError.message
                },
                {
                    status:500
                }
            );

        }





        return NextResponse.json(
            {
                success:true
            }
        );



    }
    catch(error:any){

        console.error(
            "PROMOTION ERROR:",
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