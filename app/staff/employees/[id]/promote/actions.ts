"use server";


import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";





export async function changePosition(formData:FormData){



const employeeId =
String(
formData.get("employeeId")
);



const positionId =
String(
formData.get("positionId")
);



const reason =
String(
formData.get("reason")
);








const {error}=await supabaseAdmin

.from("employees")

.update({

position_id:
positionId,


notes:

`POSITION CHANGE:
${reason}`


})

.eq(
"id",
employeeId
);







if(error){

throw new Error(error.message);

}






redirect(
`/staff/employees/${employeeId}`
);



}
