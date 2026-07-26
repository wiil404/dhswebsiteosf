import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";


const executiveRoles = [

"Secretary of Homeland Security",
"Deputy Secretary of Homeland Security",
"Chief of Staff",
"Under Secretary"

];



function generatePolicyNumber(){

const year = new Date().getFullYear();

const random =
Math.floor(Math.random() * 9000) + 1000;


return `DHS-POL-${year}-${random}`;

}





export async function POST(
request:Request
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




const body =
await request.json();




const {

title,

category,

scope,

division_id,

classification,

content,

attachments

}=body;







const {data:employee,error}=await supabaseAdmin

.from("employees")

.select(`

id,

positions(

title

)

`)

.eq(

"id",

session.employees.id

)

.single();







if(error || !employee){

return NextResponse.json(

{
error:"Employee not found"
},

{
status:404
}

);

}







const position =
(employee.positions as any)?.title || "";







const allowedRoles=[


"Secretary of Homeland Security",
"Deputy Secretary of Homeland Security",
"Chief of Staff",
"Under Secretary",
"Secret Service Director",
"CBP Commissioner",
"Special Response Team Commander",
"Under Secretary for Aviation Operations",
"Senior Flight Officer",
"Deputy Director",
"Assistant Director",
"Chief of Operations",
"CBP Deputy Commissioner",
"Special Agent in Charge (SRT)"

];








if(!allowedRoles.includes(position)){


return NextResponse.json(

{
error:"No permission"
},

{
status:403
}

);


}









const autoApprove =
executiveRoles.includes(position);









const {error:insertError}=await supabaseAdmin

.from("policies")

.insert({


policy_number:
generatePolicyNumber(),



title,



category,



content,



classification,



scope,



division_id:
scope==="DIVISIONAL"
?
division_id
:
null,



created_by:
employee.id,



approved_by:
autoApprove
?
employee.id
:
null,



status:
autoApprove
?
"Approved"
:
"Pending Approval",



effective_date:
autoApprove
?
new Date()
:
null,



review_date:null,



image_urls:
attachments || []

});









if(insertError){


console.error(insertError);



return NextResponse.json(

{
error:insertError.message
},

{
status:500
}

);


}









return NextResponse.json(

{
success:true
}

);


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