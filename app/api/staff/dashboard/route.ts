import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { getProfile } from "../../../lib/permissions";


export async function GET(){

    try{


        const profile = await getProfile();



        if(
            !profile ||
            (
                profile.role !== "Administrator" &&
                profile.role !== "Editor"
            )
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

            count:publishedNews

        } = await supabaseAdmin

            .from("news")

            .select(
                "*",
                {
                    count:"exact",
                    head:true
                }
            )

            .eq(
                "published",
                true
            );






        const {

            count:draftNews

        } = await supabaseAdmin

            .from("news")

            .select(
                "*",
                {
                    count:"exact",
                    head:true
                }
            )

            .eq(
                "published",
                false
            );








        const {

            count:scheduledNews

        } = await supabaseAdmin

            .from("news")

            .select(
                "*",
                {
                    count:"exact",
                    head:true
                }
            )

            .not(
                "publish_at",
                "is",
                null
            )

            .eq(
                "published",
                false
            );









        const {

            count:auditCount

        } = await supabaseAdmin

            .from("audit_logs")

            .select(
                "*",
                {
                    count:"exact",
                    head:true
                }
            );









        const {

            data:recentActivity

        } = await supabaseAdmin

            .from("audit_logs")

            .select("*")

            .order(
                "created_at",
                {
                    ascending:false
                }
            )

            .limit(5);







        return NextResponse.json({

            publishedNews:
                publishedNews || 0,

            draftNews:
                draftNews || 0,

            scheduledNews:
                scheduledNews || 0,

            auditCount:
                auditCount || 0,

            recentActivity:
                recentActivity || []

        });



    }
    catch(error:any){


        console.error(
            "DASHBOARD ERROR:",
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