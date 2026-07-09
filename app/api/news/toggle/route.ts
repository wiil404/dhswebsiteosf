import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase-server";
import { createAuditLog } from "../../../lib/audit";
import { getProfile, canPublishNews } from "../../../lib/permissions";



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



if(!profile){

    return NextResponse.json(
        {
            error:"Profile not found"
        },
        {
            status:403
        }
    );

}



if(
    profile.role !== "Administrator" &&
    profile.role !== "Editor"
){

    return NextResponse.json(
        {
            error:"You do not have permission to publish news"
        },
        {
            status:403
        }
    );

}






        const {
            id,
            published
        } = await request.json();




        console.log("TOGGLE ID:", id);
        console.log("NEW STATUS:", published);





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






        const { 
            data: article, 
            error: findError 
        } = await supabase

            .from("news")

            .select("id,title,published")

            .eq("id", id)

            .single();






        console.log("FOUND ARTICLE:", article);





        if(findError || !article){


            console.log("FIND ERROR:", findError);


            return NextResponse.json(
                {
                    error:"Article not found"
                },
                {
                    status:404
                }
            );

        }







        const { data, error } = await supabase

            .from("news")

            .update({

                published

            })

            .eq("id", id)

            .select("id,published");







        console.log("UPDATED ARTICLE:", data);






        if(error){


            console.error("UPDATE ERROR:", error);



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

                published

                ?

                "NEWS_PUBLISHED"

                :

                "NEWS_UNPUBLISHED",



            targetType:"News",

            severity:"WARNING",

            targetId:String(article.id),



            description:

                published

                ?

                `Published news article "${article.title}"`

                :

                `Unpublished news article "${article.title}"`


        });







        return NextResponse.json({

            success:true,

            data

        });






    } catch(error){



        console.error("TOGGLE SERVER ERROR:", error);



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