import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";



export async function POST(
request: Request
){


try{


const session =
await getEmployeeSession();



if(!session){

return NextResponse.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}



const {
policyId
}=await request.json();





if(!policyId){

return NextResponse.json(
{
error:"Missing policy ID"
},
{
status:400
}
);

}






const {error}=await supabaseAdmin

.from("policy_acknowledgements")

.insert({

policy_id: policyId,

employee_id: session.employees.id

});






if(error){


if(error.code==="23505"){

return NextResponse.json({

success:true,

message:"Already acknowledged"

});

}



throw error;


}







return NextResponse.json({

success:true

});






}catch(error:any){


return NextResponse.json(

{
error:error.message
},

{
status:500
}

);


}


}