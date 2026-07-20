import { NextResponse } from "next/server";

import { supabaseAdmin } from "../../../../../lib/supabase-admin";

import { canManageClearance } from "../../../../../lib/clearance";



export async function POST(
request:Request
){


if(
!(await canManageClearance())
){

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



await supabaseAdmin

.from("organisation_clearances")

.upsert({

organisation_id:
body.organisation_id,


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





return NextResponse.json({

success:true

});


}