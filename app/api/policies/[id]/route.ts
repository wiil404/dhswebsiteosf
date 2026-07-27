import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";



const allowedRoles = [

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





export async function GET(

request:Request,

{
params
}:{
params:Promise<{
id:string
}>
}

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
id
}=await params;





const {

data:policy,

error

}=await supabaseAdmin

.from("policies")

.select(`

*,

divisions(

id,

name

)

`)

.eq(
"id",
id
)

.single();






if(error || !policy){


return NextResponse.json(

{
error:"Policy not found"
},

{
status:404
}

);

}





return NextResponse.json({

policy

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

data:employee,

error:employeeError

}=await supabaseAdmin

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






if(employeeError || !employee){

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







const {

id

}=await params;







const body =
await request.json();






const {

title,

category,

tag,

scope,

division_id,

classification,

content,

attachments,

featuredImage

}=body;









//
// Civil policies override normal settings
//

const finalScope =

tag === "Civil"

?

"UNIVERSAL"

:

scope;





const finalClassification =

tag === "Civil"

?

"PUBLIC"

:

classification;









const {

error:updateError

}=await supabaseAdmin

.from("policies")

.update({

title,

category,

tag:

tag || "Internal",


scope:

finalScope,


division_id:

finalScope==="DIVISIONAL"

?

division_id

:

null,


classification:

finalClassification,


content,


attachments:

attachments || [],


featured_image:

featuredImage || null


})

.eq(

"id",

id

);









if(updateError){


console.error(updateError);



return NextResponse.json(

{
error:updateError.message
},

{
status:500
}

);

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
