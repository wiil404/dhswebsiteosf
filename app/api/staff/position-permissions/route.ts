import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";



export async function GET(
request:Request
){

const {searchParams}=new URL(request.url);


const position_id =
searchParams.get("position_id");



if(!position_id){

return NextResponse.json([]);

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






export async function POST(
request:Request
){

const body =
await request.json();



const {
position_id,
permission_ids

}=body;



await supabaseAdmin

.from("position_permissions")

.delete()

.eq(
"position_id",
position_id
);





const insert =
permission_ids.map(
(id:string)=>({

position_id,

permission_id:id

})
);



const {
error

}=await supabaseAdmin

.from("position_permissions")

.insert(
insert
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
{
success:true
}
);


}