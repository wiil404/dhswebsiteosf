import { redirect } from "next/navigation";

import { supabaseAdmin } from "../../../../lib/supabase-admin";

import { canManageClearance } from "../../../../lib/clearance";

import DepartmentForm from "./DepartmentForm";




export default async function Page({

params

}:{

params:{
id:string
}

}){


const allowed =
await canManageClearance();



if(!allowed){

redirect("/staff/dashboard");

}





const {

data:department

} = await supabaseAdmin


.from("security_organisations")


.select(`

*

,

organisation_clearances(
*
)

`)


.eq(
"id",
params.id
)


.single();






return (

<main className="
max-w-5xl
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
font-bold
text-[#003B6F]
">

{department.name}

</h1>



<DepartmentForm

department={department}

/>


</div>


</main>

);


}