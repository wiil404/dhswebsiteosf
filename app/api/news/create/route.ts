import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase-server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { createAuditLog } from "../../../lib/audit";
import { hasPermission } from "@/app/lib/permissions";



export async function POST(request: Request){


    const supabase =
        await createClient();




    const allowed =
        await hasPermission(
            "news.create"
        );



    if(!allowed){

        return NextResponse.json(
            {
                error:"You do not have permission to create news"
            },
            {
                status:403
            }
        );

    }






    const {
        data:{
            user
        }

    } = await supabase.auth.getUser();





    if(!user){

        return NextResponse.json(
            {
                error:"Not authenticated"
            },
            {
                status:401
            }
        );

    }







    /*
        Find logged in staff profile
    */


    const {
        data:profile,
        error:profileError

    } = await supabaseAdmin

        .from("profiles")

        .select(
            `
            employee_id
            `
        )

        .eq(
            "id",
            user.id
        )

        .single();






    if(profileError || !profile?.employee_id){


        return NextResponse.json(
            {
                error:
                "Your account is not linked to an employee profile"
            },
            {
                status:400
            }
        );


    }









/*
    Find logged in employee profile
*/

const {
    data:employee,
    error:employeeError
} = await supabaseAdmin

    .from("employees")

    .select(`
        *,
        positions(title),
        divisions(name)
    `)

    .eq(
        "user_id",
        user.id
    )

    .single();



if(
    employeeError ||
    !employee
){

    return NextResponse.json(
        {
            error:
            "Your account is not linked to an employee profile"
        },
        {
            status:403
        }
    );

}









    const body =
        await request.json();





    const {

        title,

        slug,

        category,

        summary,

        content,

        published,

        featured,

        attachments = [],

        featuredImage

    } = body;








const {
    data:article,
    error

} = await supabaseAdmin

    .from("news")

    .insert({

        title,

        slug,

        category,

        summary,

        content,

        author_id:
        employee.id,

        published,

        featured:
        featured ?? false,

        attachments:
        attachments ?? [],

        featured_image:
        featuredImage ?? null

    })

    .select()

    .single();







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


        action:
        "NEWS_CREATED",


        severity:
        "INFO",


        targetType:
        "News",


        targetId:
        String(article.id),


        description:
        `Created news article "${article.title}" by ${employee.roblox_username}`


    });








    return NextResponse.json({

        success:true,

        article

    });


}