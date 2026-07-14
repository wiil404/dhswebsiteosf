import { NextResponse } from "next/server";
import { hasPermission, getProfile } from "../../../lib/permissions";


export async function GET(request:Request){


const {searchParams} =
new URL(request.url);



const permission =
searchParams.get("permission");



const profile =
await getProfile();



const allowed =
permission
?
await hasPermission(permission)
:
false;



console.log("PROFILE:", profile);

console.log("REQUESTED PERMISSION:", permission);

console.log("ALLOWED:", allowed);




return NextResponse.json({

allowed,

role: profile?.role,

employee: profile?.employee,

permission

});


}
