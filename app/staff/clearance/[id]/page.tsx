import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { getProfile } from "../../../lib/permissions";
import { canManageClearance } from "../../../lib/clearance";
import EditClearanceForm from "./EditClearanceForm";



export default async function ClearanceEditPage({

params

}:{

params: Promise<{
    id:string
}>

}){


const {
    id
} = await params;





const profile =
await getProfile();



if(!profile){

redirect("/staff/login");

}





const allowed =
await canManageClearance();



if(!allowed){

redirect("/staff/dashboard");

}








const {

data:clearance,
error

} = await supabaseAdmin

.from("security_clearances")

.select(`

*,

security_subjects(
    *
)

`)

.eq(
"id",
id
)

.single();







if(error || !clearance){


return (

<main className="p-10">

<h1 className="
text-3xl
font-bold
">

Clearance Not Found

</h1>


<p className="mt-4 text-red-600">

{error?.message}

</p>


</main>

);


}









return (

<main className="
max-w-5xl
mx-auto
px-6
py-16
">


<div className="
bg-white
shadow-xl
border
p-10
">





<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Edit Security Clearance

</h1>





<div className="
mt-8
bg-[#F5F8FB]
border
p-6
">


<h2 className="
text-2xl
font-bold
">

Subject

</h2>




<p className="mt-3">

<b>Name:</b>

{" "}

{
clearance.security_subjects?.full_name ||
"N/A"
}

</p>




<p className="mt-2">

<b>Organisation:</b>

{" "}

{
clearance.security_subjects?.organisation ||
"N/A"
}

</p>






{

clearance.security_subjects?.roblox_username && (

<>

<p className="mt-2">

<b>Roblox:</b>

{" "}

{
clearance.security_subjects.roblox_username
}

</p>



<p>

<b>ID:</b>

{" "}

{
clearance.security_subjects.roblox_user_id
}

</p>


</>

)

}


</div>









<EditClearanceForm

clearance={clearance}

/>









</div>


</main>

);


}
