"use server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { redirect } from "next/navigation";


export async function signExecutiveContract(
    formData: FormData
){

const contractId =
String(
formData.get("contractId")
);



const executiveName = "WiIl404";
const executiveRobloxId = "333195903";



const {error}=await supabaseAdmin

.from("contracts")

.update({

executive_signed:true,

executive_signature_name:
executiveName,

executive_signature_id:
executiveRobloxId,

executive_signature_date:
new Date()

})

.eq(
"id",
contractId
);




if(error){

throw new Error(error.message);

}




const {data:contract}=await supabaseAdmin

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




if(
contract?.employee_signed &&
contract?.executive_signed
){

await supabaseAdmin

.from("contracts")

.update({

status:"Completed"

})

.eq(
"id",
contractId
);


}

else if(
contract?.employee_signed
){

await supabaseAdmin

.from("contracts")

.update({

status:"Awaiting Executive Signature"

})

.eq(
"id",
contractId
);

}



redirect(
`/staff/contracts/${contractId}`
);


}
