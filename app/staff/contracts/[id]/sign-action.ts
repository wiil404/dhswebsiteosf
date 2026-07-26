"use server";


import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";




export async function signExecutiveContract(
    contractId:string
){



const executiveName = "WiIl404";

const executiveRobloxId = 333195903;

const executivePosition = "Secretary of Homeland Security";





const {error}=await supabaseAdmin

.from("contracts")

.update({

executive_signed:true,

executive_signature_name:
executiveName,

executive_signature_id:
executiveRobloxId,

executive_signature_position:
executivePosition,

executive_signature_date:
new Date(),

status:
"Completed"

})

.eq(
"id",
contractId
);






if(error){

    throw new Error(error.message);

}






await supabaseAdmin

.from("audit_logs")

.insert({

action:
"EXECUTIVE_CONTRACT_SIGNED",

details:
`${executiveName} signed contract ${contractId}`

});





redirect(
`/staff/contracts/${contractId}`
);


}