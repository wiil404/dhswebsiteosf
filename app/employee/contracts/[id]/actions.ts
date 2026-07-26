"use server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { redirect } from "next/navigation";
import { getEmployeeSession } from "@/app/lib/employee-auth";


export async function signEmployeeContract(
    contractId:string
){


const session = await getEmployeeSession();


if(!session){
    throw new Error("Unauthorized");
}


const employee = session.employees;



const {data:contract,error:contractError}=await supabaseAdmin

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



if(contractError || !contract){

throw new Error("Contract not found");

}




let status =
"Pending Employee Signature";


if(contract.executive_signed){

status="Completed";

}

else{

status="Awaiting Executive Signature";

}







const {error}=await supabaseAdmin

.from("contracts")

.update({

employee_signed:true,

employee_signature_name:
employee.roblox_username,

employee_signature_id:
employee.roblox_user_id,

employee_signature_date:
new Date(),


status

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
"CONTRACT_SIGNED",

details:
`${employee.roblox_username} signed contract ${contractId}`

});





redirect(
"/employee/contracts"
);


}
