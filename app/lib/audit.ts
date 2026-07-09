import { supabaseAdmin } from "./supabase-admin";
import { createClient } from "./supabase-server";


export async function createAuditLog({

    action,

    targetType,

    targetId,

    description,

    details,

    severity

}:{

    action:string;

    targetType?:string;

    targetId?:string;

    description?:string;

    details?:any;

    severity?:string;

}){


    try {


        const supabase = await createClient();



        const {
            data:{
                user
            }
        } = await supabase.auth.getUser();





        const {
            data,
            error
        } = await supabaseAdmin

            .from("audit_logs")

            .insert({

                user_id:user?.id || null,

                user_email:user?.email || "Unknown",

                action,

                target_type:targetType || null,

                target_id:targetId || null,

                description:description || null,

                details:details || {},

                severity: severity || "INFO"

            })

            .select();






        if(error){

            console.error(
                "AUDIT LOG ERROR:",
                error
            );

            return false;

        }





        console.log(
            "AUDIT CREATED:",
            data
        );


        return true;





    } catch(error){


        console.error(
            "AUDIT SYSTEM ERROR:",
            error
        );


        return false;


    }


}