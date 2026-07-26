"use server";

import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase-admin";



export async function approvePolicy(formData: FormData){

    const policyId = String(
        formData.get("policyId")
    );


    const {error} = await supabaseAdmin

    .from("policies")

    .update({

        status: "Approved",

        effective_date:
        new Date()
        .toISOString()
        .split("T")[0]

    })

    .eq(
        "id",
        policyId
    );



    if(error){

        throw new Error(error.message);

    }



    redirect(
        `/staff/policies/${policyId}`
    );

}







export async function rejectPolicy(formData: FormData){

    const policyId = String(
        formData.get("policyId")
    );


    const {error} = await supabaseAdmin

    .from("policies")

    .update({

        status:"Rejected"

    })

    .eq(
        "id",
        policyId
    );



    if(error){

        throw new Error(error.message);

    }



    redirect(
        `/staff/policies/${policyId}`
    );

}
