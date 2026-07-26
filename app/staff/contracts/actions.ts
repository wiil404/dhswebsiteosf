"use server";


import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { redirect } from "next/navigation";




export async function signExecutiveContract(

contractId:string

){



const {data:contract,error}=await supabaseAdmin

.from("contracts")

.select(
`
employee_signed,
executive_signed
`
)

.eq(
"id",
contractId
)

.single();





if(error || !contract){

throw new Error(
"Contract not found"
);

}







const status = contract.employee_signed

?

"Completed"

:

"Pending Employee Signature";







const {error:updateError}=await supabaseAdmin

.from("contracts")

.update({

executive_signed:true,

executive_signature_name:
"WiIl404",

executive_signature_id:
"333195903",

executive_signature_date:
new Date(),

status

})

.eq(
"id",
contractId
);







if(updateError){

throw new Error(
updateError.message
);

}







await supabaseAdmin

.from("audit_logs")

.insert({

action:
"EXECUTIVE_CONTRACT_SIGNED",

details:
`Executive signed contract ${contractId}`

});







redirect(
"/staff/contracts"
);



}
