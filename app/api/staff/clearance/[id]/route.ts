import { NextResponse } from "next/server";

import { supabaseAdmin } from "../../../../lib/supabase-admin";

import { getUser } from "../../../../lib/auth";

import { getProfile } from "../../../../lib/permissions";

import { canManageClearance } from "../../../../lib/clearance";

import { createAuditLog } from "../../../../lib/audit";




export async function PATCH(

request:Request,

{
params
}:{

params:Promise<{
    id:string
}>

}

){



const user =
await getUser();



if(!user){

return NextResponse.json(

{
error:"Not authenticated"
},

{
status:401
}

);

}







const profile =
await getProfile();



if(!profile){

return NextResponse.json(

{
error:"No profile found"
},

{
status:403
}

);

}







const allowed =
await canManageClearance();



if(!allowed){

return NextResponse.json(

{
error:"You do not have permission to manage security clearances"
},

{
status:403
}

);

}







const {
id
} =
await params;







const body =
await request.json();







const {

white_house,

capitol,

dhs,

airport,

blacklisted,

blacklist_areas,

blacklist_reason,

notes


} = body;









const {

data:clearance,

error

} = await supabaseAdmin

.from("security_clearances")

.update({

white_house,

capitol,

dhs,

airport,

blacklisted,

blacklist_areas,

blacklist_reason,

notes,

updated_at:new Date()

})

.eq(
"id",
id
)

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









await createAuditLog({

action:"SECURITY_CLEARANCE_UPDATED",

severity:"WARNING",

targetType:"Security Clearance",

targetId:id,

description:

`Updated security clearance ${id} by ${profile.email}`


});









return NextResponse.json({

success:true,

clearance

});



}