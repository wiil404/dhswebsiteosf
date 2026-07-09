import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase-server";
import { createAuditLog } from "../../../lib/audit";
import { getProfile } from "../../../lib/permissions";


export async function POST(request: Request) {


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
            (
                profile.role !== "Administrator" &&
                profile.role !== "Editor" &&
                profile.role !== "Public Affairs Officer"
            )
        ){


            return NextResponse.json(
                {
                    error:"You do not have permission to edit news"
                },
                {
                    status:403
                }
            );


        }







        const body = await request.json();



        const {
            id,
            title,
            slug,
            category,
            summary,
            content,
            published
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







        // Get old article data

        const {
            data: oldArticle,
            error: findError
        } = await supabase

            .from("news")

            .select("*")

            .eq("id", id)

            .single();






        if(findError || !oldArticle){


            return NextResponse.json(
                {
                    error:"Article not found"
                },
                {
                    status:404
                }
            );


        }







        const changes:string[] = [];



        if(oldArticle.title !== title){

            changes.push(
                "Title changed"
            );

        }



        if(oldArticle.slug !== slug){

            changes.push(
                "Slug changed"
            );

        }



        if(oldArticle.category !== category){

            changes.push(
                "Category changed"
            );

        }



        if(oldArticle.summary !== summary){

            changes.push(
                "Summary changed"
            );

        }



        if(oldArticle.content !== content){

            changes.push(
                "Content changed"
            );

        }



        if(oldArticle.published !== published){

            changes.push(
                published
                ?
                "Article published"
                :
                "Article unpublished"
            );

        }







        const {
            error
        } = await supabase

            .from("news")

            .update({

                title,

                slug,

                category,

                summary,

                content,

                published

            })

            .eq("id", id);







        if(error){


            return NextResponse.json(
                {
                    error:error.message
                },
                {
                    status:400
                }
            );


        }









        await createAuditLog({

            action:"NEWS_UPDATED",

            
            severity:"WARNING",


            targetType:"News",


            targetId:String(id),


            description:

                `Updated news article "${oldArticle.title}". Changes: ${changes.join(", ") || "No changes detected"}`


        });







        return NextResponse.json({

            success:true

        });







    } catch(error){



        console.error(
            "UPDATE ERROR:",
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