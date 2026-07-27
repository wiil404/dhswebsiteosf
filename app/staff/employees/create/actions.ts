"use server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { redirect } from "next/navigation";



export async function createEmployee(formData: FormData){


const roblox_username =
String(formData.get("roblox_username") || "")
.trim();



const roblox_user_id =
Number(formData.get("roblox_user_id"));



const employee_number =
String(formData.get("employee_number") || "")
.trim()
|| null;



const division_id =
String(formData.get("division_id") || "")
|| null;



const position_id =
String(formData.get("position_id") || "")
|| null;



const status =
String(formData.get("status") || "Active");





if(!roblox_username){

throw new Error(
"Roblox username is required"
);

}



if(!roblox_user_id){

throw new Error(
"Roblox user ID is required"
);

}





const {error}=await supabaseAdmin

.from("employees")

.insert({

roblox_username,

roblox_user_id,

employee_number,

division_id,

position_id,

status,

hire_date:
new Date()
.toISOString()
.split("T")[0]

});





if(error){

console.error(
"CREATE EMPLOYEE ERROR:",
error
);


throw new Error(
error.message
);

}





redirect("/staff/employees");

}
