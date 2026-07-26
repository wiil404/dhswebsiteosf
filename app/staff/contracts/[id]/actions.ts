"use server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { redirect } from "next/navigation";


export async function signExecutiveContract(
formData:FormData
){


const contractId =
String(
formData.get("contractId")
);



const executiveName = "WiIl404";

const executiveRobloxId = "333195903";





const {error:updateError}=await supabaseAdmin

.from("contracts")

.update({

executive_signed:true,

executive_signature_name:
executiveName,

executive_signature_id:
executiveRobloxId,

executive_signature_date:
new Date(),

status:"Completed"

})

.eq(
"id",
contractId
);





if(updateError){

console.error(updateError);

throw new Error(
updateError.message
);

}





redirect(
`/staff/contracts/${contractId}`
);


}
