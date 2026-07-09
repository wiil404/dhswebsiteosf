import {NextResponse} from "next/server";
import {supabaseAdmin} from "../../../../../lib/supabase-admin";
import {getProfile} from "../../../../../lib/permissions";





export async function GET(request:Request){


const {
searchParams
}=new URL(request.url);



const position_id =
searchParams.get("id");



if(!position_id){

return NextResponse.json(
{
error:"Missing position id"
},
{
status:400
}
);

}






const {
data,
error

}=await supabaseAdmin

.from("position_permissions")

.select(`
permission_id,
permissions(
id,
name,
description
)
`)

.eq(
"position_id",
position_id
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



return NextResponse.json(
data || []
);



}








export async function POST(request:Request){



const profile =
await getProfile();



if(
!profile ||
profile.role !== "Administrator"
){

return NextResponse.json(
{
error:"Unauthorized"
},
{
status:403
}
);

}







const {

position_id,
permissions

}=await request.json();







await supabaseAdmin

.from("position_permissions")

.delete()

.eq(
"position_id",
position_id
);








if(
permissions.length
){


const {

error

}=await supabaseAdmin

.from("position_permissions")

.insert(

permissions.map(
(permission_id:string)=>(

{

position_id,

permission_id

}

)

)

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


}







return NextResponse.json({

success:true

});


}