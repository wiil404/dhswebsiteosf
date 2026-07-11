import {NextResponse} from "next/server";
import {supabaseAdmin} from "../../../lib/supabase-admin";



export async function GET(
request:Request
){


const url =
new URL(request.url);


const number =
url.searchParams.get("number");


const username =
url.searchParams.get("username");





if(
!number ||
!username
){

return NextResponse.json(

{
error:"Application number and username required"
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

.from("applications")

.select(`

*,

divisions(
name
)

`)

.eq(

"application_number",

number

)

.eq(

"roblox_username",

username

)

.single();







if(error || !data){


return NextResponse.json(

{
error:
"Application not found or details do not match"
},

{
status:404
}

);


}







return NextResponse.json(data);



}