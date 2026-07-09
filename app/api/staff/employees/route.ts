import {NextResponse} from "next/server";
import {supabaseAdmin} from "../../../lib/supabase-admin";



export async function GET(){


const {
data,
error

}=await supabaseAdmin

.from("employees")

.select(`

id,

roblox_username,

roblox_user_id,

status,

employee_number,


divisions(
name
),


positions(
title
)


`)

.order(
"created_at",
{
ascending:false
}
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



return NextResponse.json(
data || []
);



}






export async function POST(
request:Request
){


const body =
await request.json();



const {
data,
error

}=await supabaseAdmin

.from("employees")

.insert({

roblox_username:
body.roblox_username,


roblox_user_id:
Number(body.roblox_user_id),


division_id:
body.division_id || null,


position_id:
body.position_id || null,


status:
body.status || "Active",


hire_date:
body.hire_date || null,


notes:
body.notes || null

})

.select()

.single();





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




return NextResponse.json(
data
);



}