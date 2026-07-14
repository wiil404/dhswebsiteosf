import { NextResponse } from "next/server";
import { hasPermission } from "../../../lib/permissions";


export async function GET(request:Request){


const {searchParams} =
new URL(request.url);



const permission =
searchParams.get("permission");



if(!permission){

return NextResponse.json({
allowed:false
});

}



const allowed =
await hasPermission(
permission
);



return NextResponse.json({
allowed
});


}