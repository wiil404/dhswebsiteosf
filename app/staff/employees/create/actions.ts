"use server";

import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";





export async function createEmployee(formData:FormData){



const roblox_username =
String(
formData.get("roblox_username")
);



const roblox_user_id =
Number(
formData.get("roblox_user_id")
);



const employee_number =
String(
formData.get("employee_number")
);



const email =
String(
formData.get("email")
);



const division_id =
String(
formData.get("division_id")
);



const position_id =
String(
formData.get("position_id")
);



const status =
String(
formData.get("status")
);





const {error}=await supabaseAdmin

.from("employees")

.insert({

roblox_username,

roblox_user_id,

employee_number,

email,

division_id,

position_id,

status

});






if(error){

throw new Error(error.message);

}






redirect("/staff/employees");



}
