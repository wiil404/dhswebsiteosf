import { NextResponse } from "next/server";

import { supabaseAdmin } from "../../../../lib/supabase-admin";

import { canManageClearance } from "../../../../lib/clearance";



export async function POST(
request:Request
){


const allowed =
await canManageClearance();



if(!allowed){

return NextResponse.json(
{
error:"Unauthorised"
},
{
status:403
}
);

}





const body =
await request.json();





const {

data:subject,

error

} = await supabaseAdmin


.from("security_subjects")


.insert({

full_name:
body.full_name,

organisation:
body.organisation,

subject_type:
body.subject_type,

roblox_username:
body.roblox_username,

roblox_user_id:
body.roblox_user_id,

discord_username:
body.discord_username,

email:
body.email,

notes:
body.notes


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







const {

error:clearanceError

} = await supabaseAdmin


.from("security_clearances")


.insert({

subject_id:
subject.id,

clearance_level:
body.clearance_level,


white_house:
body.white_house,


capitol:
body.capitol,


dhs:
body.dhs,


airport:
body.airport

});







if(clearanceError){

return NextResponse.json(
{
error:clearanceError.message
},
{
status:500
}
);

}






return NextResponse.json({

success:true

});


}