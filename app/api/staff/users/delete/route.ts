import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";
import { getProfile } from "../../../../lib/permissions";
import { createAuditLog } from "../../../../lib/audit";



export async function POST(request:Request){


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
        id
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







    // Get user before deletion

    const {
        data:user
    } = await supabaseAdmin

        .from("profiles")

        .select(
            "email,role"
        )

        .eq(
            "id",
            id
        )

        .single();







    if(!user){

        return NextResponse.json(
            {
                error:"User not found"
            },
            {
                status:404
            }
        );

    }








    // Remove profile first

    await supabaseAdmin

        .from("profiles")

        .delete()

        .eq(
            "id",
            id
        );








    // Remove authentication account

    const {
        error
    } = await supabaseAdmin.auth.admin.deleteUser(
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

        action:"STAFF_DELETED",

        severity:"CRITICAL",

        targetType:"Staff User",

        targetId:String(id),

        description:
        `Deleted staff account "${user.email}" with role "${user.role}"`,

        details:{
            severity:"CRITICAL"
        }

    });







    return NextResponse.json({

        success:true

    });


}