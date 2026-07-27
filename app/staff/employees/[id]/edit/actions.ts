"use server";


import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";





export async function updateEmployee(formData:FormData){



const id =
String(
formData.get("id")
);



const update = {


roblox_username:

String(
formData.get("roblox_username")
),



roblox_user_id:

Number(
formData.get("roblox_user_id")
),



email:

String(
formData.get("email")
),



division_id:

String(
formData.get("division_id")
),



position_id:

String(
formData.get("position_id")
),



status:

String(
formData.get("status")
),



notes:

String(
formData.get("notes")
)



};






const {error}=await supabaseAdmin

.from("employees")

.update(update)

.eq(
"id",
id
);







if(error){

throw new Error(error.message);

}






redirect(
`/staff/employees/${id}`
);


}
