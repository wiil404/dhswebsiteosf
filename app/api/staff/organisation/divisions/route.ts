import {NextResponse} from "next/server";
import {supabaseAdmin} from "../../../../lib/supabase-admin";
import {getProfile} from "../../../../lib/permissions";


export async function GET(){


const {data,error}=await supabaseAdmin

.from("divisions")

.select(`
*,
employees(
roblox_username
)
`)

.order("name");



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


return NextResponse.json(data);


}






export async function POST(request:Request){


const profile = await getProfile();



if(
!profile ||
profile.role !== "Administrator"
){

return NextResponse.json(
{
error:"Unauthorized"
},
{
status:403
}
);

}




const {

name,
abbreviation,
description

}=await request.json();





const {data,error}=await supabaseAdmin

.from("divisions")

.insert({

name,

abbreviation,

description

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



return NextResponse.json(data);


}