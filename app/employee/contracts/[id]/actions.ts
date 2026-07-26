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



const {error}=await supabaseAdmin

.from("contracts")

.update({

employee_signed:true,

employee_signature_name:
employee.roblox_username,

employee_signature_id:
employee.roblox_user_id,

employee_signature_date:
new Date()

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