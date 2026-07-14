import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabase-admin";
import { hasPermission } from "../../../../../lib/permissions";



export async function POST(

request:Request,

{
params

}:{
params:Promise<{
id:string
}>
}

){



const allowed =
await hasPermission(
"EMPLOYEES_EDIT"
);



if(!allowed){

return NextResponse.json(
{
error:"No permission"
},
{
status:403
}
);

}





const {
id

}=await params;




const form =
await request.formData();





const update = {


roblox_username:
form.get("roblox_username"),


roblox_user_id:
form.get("roblox_user_id"),


email:
form.get("email"),


employee_number:
form.get("employee_number"),


position_id:
form.get("position_id"),


division_id:
form.get("division_id"),


status:
form.get("status")

};







const {

error

}=await supabaseAdmin

.from("employees")

.update(update)

.eq(
"id",
id
);







if(error){

return NextResponse.json(
{
error:error.message
},
{
status:500
}
);

}





return NextResponse.redirect(

new URL(

`/staff/employees/${id}`,

request.url

)

);


}