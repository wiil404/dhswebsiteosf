import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabase-admin";
import { canManageClearance } from "../../lib/clearance";



export default async function ClearancePage(){


const allowed =
await canManageClearance();



if(!allowed){

    redirect("/staff/dashboard");

}





const {
    data:subjects
} = await supabaseAdmin

.from("security_subjects")

.select(`

*

,

security_clearances(
    *
)

`)

.order(
"created_at",
{
ascending:false
}
);







return (

<main className="
max-w-7xl
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

DHS Security Clearance Management

</h1>



<p className="
mt-3
text-gray-600
">

Manage access permissions for DHS, White House, Capitol and Airport restricted areas.

</p>







<div className="
mt-10
space-y-6
">


{

subjects?.map((person:any)=>(


<div

key={person.id}

className="
border
p-6
"

>


<h2 className="
text-2xl
font-bold
text-[#003B6F]
">

{person.full_name}

</h2>



<p>

Organisation:

{" "}

{person.organisation || "N/A"}

</p>



<p>

Type:

{" "}

{person.subject_type}

</p>






{

person.security_clearances?.length ?

<div className="mt-5">


<p className="font-bold">

Current Clearance:

</p>


<p>

Level {

person.security_clearances[0]
.clearance_level

}

</p>



</div>


:

<p className="mt-5 text-red-600">

No clearance assigned

</p>


}





</div>


))


}


</div>




</div>


</main>


);


}