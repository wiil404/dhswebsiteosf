import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { getUser } from "@/app/lib/auth";



export async function DELETE(

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






const {id} =
await params;







/*
    Delete clearance records first
*/


const {

error:clearanceError

}

=
await supabaseAdmin

.from("security_clearances")

.delete()

.eq(
"subject_id",
id
);






if(clearanceError){


console.error(clearanceError);


return NextResponse.json(

{
error:clearanceError.message
},

{
status:500
}

);


}








/*
    Delete subject
*/


const {

error:subjectError

}

=
await supabaseAdmin

.from("security_subjects")

.delete()

.eq(
"id",
id
);







if(subjectError){


console.error(subjectError);


return NextResponse.json(

{
error:subjectError.message
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

catch(error:any){


console.error(error);


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
