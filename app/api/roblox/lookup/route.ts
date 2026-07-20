import { NextResponse } from "next/server";



export async function POST(
    request: Request
){


try{


const body =
await request.json();



const username =
body.username;



if(!username){


return NextResponse.json(

{
error:"Roblox username required"
},

{
status:400
}

);


}







/*
    Convert username to Roblox ID
*/


const response =
await fetch(

"https://users.roblox.com/v1/usernames/users",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

usernames:[
username
],

excludeBannedUsers:true

})

}

);








if(!response.ok){


return NextResponse.json(

{
error:"Unable to contact Roblox"
},

{
status:500
}

);


}








const data =
await response.json();





const user =
data?.data?.[0];








if(!user){


return NextResponse.json(

{
error:"Roblox user not found"
},

{
status:404
}

);


}







return NextResponse.json({

success:true,


username:user.name,


displayName:user.displayName,


id:String(user.id)


});







}

catch(error:any){


console.error(
"ROBLOX LOOKUP ERROR:",
error
);



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