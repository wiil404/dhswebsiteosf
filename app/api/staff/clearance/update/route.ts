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

subject_id,

clearance_level,

white_house,

capitol,

dhs,

airport,

blacklisted,

blacklist_reason


}=body;






await supabaseAdmin

.from("security_clearances")

.upsert({

subject_id,

clearance_level,

white_house,

capitol,

dhs,

airport

});







if(blacklisted){


await supabaseAdmin

.from("security_blacklists")

.upsert({

subject_id,

global_blacklist:true,

reason:blacklist_reason

});


}

else{


await supabaseAdmin

.from("security_blacklists")

.delete()

.eq(
"subject_id",
subject_id
);


}





return NextResponse.json({

success:true

});


}