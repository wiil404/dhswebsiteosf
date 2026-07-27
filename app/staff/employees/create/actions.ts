"use server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { redirect } from "next/navigation";



function generateEmployeeNumber(){

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


let code = "";



for(let i = 0; i < 6; i++){

code += chars.charAt(
Math.floor(Math.random() * chars.length)
);

}



return `DHS-${code}`;

}






export async function createEmployee(formData: FormData){


const roblox_username =
String(formData.get("roblox_username") || "")
.trim();



const roblox_user_id =
Number(formData.get("roblox_user_id"));



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
"Roblox User ID is required"
);

}







let employee_number = generateEmployeeNumber();




// Make sure the number does not already exist

const {data:existing}=await supabaseAdmin

.from("employees")

.select("id")

.eq(
"employee_number",
employee_number
)

.single();




if(existing){

employee_number = generateEmployeeNumber();

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
