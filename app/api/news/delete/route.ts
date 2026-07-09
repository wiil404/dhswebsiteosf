import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase-server";
import { createAuditLog } from "../../../lib/audit";
import { getProfile } from "../../../lib/permissions";


export async function POST(request: Request){


    try {


        const supabase = await createClient();



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







        const profile = await getProfile();






        if(
            !profile ||
            profile.role !== "Administrator"
        ){


            return NextResponse.json(
                {
                    error:"Insufficient permissions"
                },
                {
                    status:403
                }
            );


        }








        const body = await request.json();



        const {
            id
        } = body;







        if(!id){


            return NextResponse.json(
                {
                    error:"Missing article ID"
                },
                {
                    status:400
                }
            );


        }








        // Get article before deleting

        const {
            data: article,
            error: findError
        } = await supabase

            .from("news")

            .select("id,title")

            .eq("id", id)

            .single();








        if(findError || !article){


            return NextResponse.json(
                {
                    error:"Article not found"
                },
                {
                    status:404
                }
            );


        }









        const {
            error
        } = await supabase

            .from("news")

            .delete()

            .eq("id", id);







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

            action:"NEWS_DELETED",

            
            severity:"CRITICAL",


            targetType:"News",


            targetId:String(article.id),


            description:

                `Deleted news article "${article.title}"`


        });








        return NextResponse.json({

            success:true

        });








    } catch(error){


        console.error(
            "DELETE ERROR:",
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