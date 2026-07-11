import {NextResponse} from "next/server";
import {supabaseAdmin} from "../../../../lib/supabase-admin";



export async function POST(
request:Request
){


const body =
await request.json();



const {
    application_number,
    roblox_username
} = body;




if(
!application_number ||
!roblox_username
){

return NextResponse.json(
{
error:"Application number and Roblox username required."
},
{
status:400
}
);

}







const {
data:application,
error
}=await supabaseAdmin

.from("applications")

.select(`

*,

divisions(
name
),

application_answers(

answer,

questions(
question
)

)

`)

.eq(
"application_number",
application_number
)

.ilike(
"roblox_username",
roblox_username
)

.single();






if(error || !application){


return NextResponse.json(
{
error:
"No application found with those details."
},
{
status:404
}
);


}







return NextResponse.json({

application

});


}