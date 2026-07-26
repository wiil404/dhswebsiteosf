import { redirect } from "next/navigation";
import Link from "next/link";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";

import { deletePolicy } from "../actions";



export const dynamic = "force-dynamic";



export default async function DeletePolicyPage({

params

}:{

params:Promise<{
id:string
}>

}){


const {id}=await params;



const session =
await getEmployeeSession();



if(!session){

redirect("/employee/login");

}






const {data:policy}=await supabaseAdmin

.from("policies")

.select(`

id,

title,

policy_number

`)

.eq(
"id",
id
)

.single();





if(!policy){

redirect("/staff/policies");

}







return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-20
">


<section className="
max-w-3xl
mx-auto
px-6
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
text-red-600
">

Delete Policy

</h1>



<p className="
mt-5
text-gray-700
">

You are about to permanently delete this policy.

</p>




<div className="
mt-6
bg-red-50
border
border-red-300
p-6
">


<p className="
font-black
text-red-700
">

⚠ Warning

</p>


<p className="
mt-3
text-red-800
">

This will remove:

</p>


<ul className="
mt-3
list-disc
ml-6
text-red-800
">


<li>
The policy record
</li>


<li>
All acknowledgement records
</li>


<li>
Associated policy history
</li>


</ul>



</div>







<div className="
mt-8
border
bg-[#F5F8FB]
p-6
">


<p>

Policy:

{" "}

<b>
{policy.title}
</b>

</p>


<p className="
mt-2
">

Number:

{" "}

<b>
{policy.policy_number}
</b>

</p>


</div>








<div className="
mt-8
flex
gap-4
">



<Link

href={`/staff/policies/${id}`}

className="
bg-gray-500
text-white
px-6
py-3
font-black
"

>

Cancel

</Link>







<form action={deletePolicy}>


<input

type="hidden"

name="policyId"

value={policy.id}

/>




<button

className="
bg-red-600
text-white
px-6
py-3
font-black
"

>

Confirm Delete

</button>



</form>




</div>





</div>


</section>


</main>

);


}