import { NextResponse } from "next/server";


export async function GET(req:Request){


const {searchParams}=

new URL(req.url);



const code =
searchParams.get("code");



if(!code){

return NextResponse.redirect(

new URL(
"/employee/login",
req.url
)

);

}







const tokenResponse = await fetch(

"https://apis.roblox.com/oauth/v1/token",

{

method:"POST",

headers:{

"Content-Type":
"application/x-www-form-urlencoded"

},


body:

new URLSearchParams({

client_id:
process.env.ROBLOX_CLIENT_ID!,

client_secret:
process.env.ROBLOX_CLIENT_SECRET!,

grant_type:"authorization_code",

code,

redirect_uri:
process.env.ROBLOX_REDIRECT_URI!

})


}

);






const token =
await tokenResponse.json();





const userResponse =
await fetch(

"https://apis.roblox.com/oauth/v1/userinfo",

{

headers:{

Authorization:

`Bearer ${token.access_token}`

}

}

);





const user =
await userResponse.json();






console.log(user);





return NextResponse.json(user);


}