import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";



export async function GET(

request: Request,

{
params
}:{
params: Promise<{
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






if(!id){

return NextResponse.json(

{
error:"Missing policy ID"
},

{
status:400
}

);

}








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