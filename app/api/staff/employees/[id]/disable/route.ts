import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabase-admin";
import { createClient } from "../../../../../lib/supabase-server";
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
    "staff.manage"
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





const {
error
}=await supabaseAdmin

.from("employees")

.update({

status:"Inactive"

})

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
