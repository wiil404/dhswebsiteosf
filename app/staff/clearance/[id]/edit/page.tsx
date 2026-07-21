import { notFound } from "next/navigation";

import { supabaseAdmin } from "../../../../lib/supabase-admin";

import EditClearanceForm from "./EditClearanceForm";



export default async function EditClearancePage({

params

}:{

params: Promise<{
    id:string
}>

}){


const {id} =
await params;






const {

data:subject,

error

}=

await supabaseAdmin

.from("security_subjects")

.select(`

id,

organisation,

subject_type,

roblox_username,

roblox_user_id,


security_clearances(

id,

area_id,

clearance_level,

blacklisted,

blacklist_reason,

blacklist_areas,

notes,


security_areas!area_id(

id,

name

)

)

`)

.eq(
"id",
id
)

.single();






if(error || !subject){

notFound();

}







const {

data:areas

}=

await supabaseAdmin

.from("security_areas")

.select(`

id,

name

`)

.order(
"name"
);






return (

<main className="
max-w-6xl
mx-auto
px-6
py-16
">


<div className="
bg-white
border
shadow-xl
p-10
">



<h1 className="
text-4xl
font-black
text-[#003B6F]
">

Edit Security Clearance

</h1>



<p className="
mt-3
text-gray-600
">

{

subject.roblox_username ||

subject.organisation

}

</p>






<EditClearanceForm


subject={subject}

areas={areas || []}


/>




</div>


</main>

);


}