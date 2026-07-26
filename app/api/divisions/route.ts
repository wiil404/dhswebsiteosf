import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase-admin";


export async function GET(){

const allowed = [

"United States Secret Service",

"United States Customs and Border Protection",

"Law Enforcement Helicopter Taskforce",

"Special Response Team",

"Public Affairs Office"

];


const {data,error}=await supabaseAdmin

.from("divisions")

.select(
"id,name"
)

.in(
"name",
allowed
)

.order(
"name"
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



return NextResponse.json({

divisions:data || []

});


}