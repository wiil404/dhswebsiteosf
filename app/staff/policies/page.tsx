import Link from "next/link";

import { supabaseAdmin } from "@/app/lib/supabase-admin";


export const dynamic = "force-dynamic";
export const revalidate = 0;



export default async function StaffPoliciesPage(){



const {data:policies,error}=await supabaseAdmin

.from("policies")

.select(`

*,

divisions(

name

),

created_employee:employees!policies_created_by_fkey(

roblox_username

),

approved_employee:employees!policies_approved_by_fkey(

roblox_username

)

`)

.order(

"created_at",

{
ascending:false
}

);





if(error){

console.error(error);

}








return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">



<section className="
max-w-7xl
mx-auto
px-6
">





<div className="
bg-white
border
shadow-2xl
overflow-hidden
">



<div className="
h-3
bg-[#F2C94C]
"/>







<div className="
bg-gradient-to-r
from-[#003B6F]
to-[#005AA7]
text-white
p-10
">



<p className="
uppercase
tracking-[0.35em]
text-[#F2C94C]
font-black
text-sm
">

Department of Homeland Security

</p>




<div className="
flex
justify-between
items-center
mt-4
gap-4
flex-wrap
">



<h1 className="
text-5xl
font-black
">

Policy Registry

</h1>





<Link

href="/staff/policies/create"

className="
bg-[#F2C94C]
text-[#003B6F]
px-6
py-3
font-black
hover:scale-105
transition
"

>

Create Policy

</Link>



</div>





<p className="
mt-4
text-blue-100
">

Manage Department directives, policies, and official guidance.

</p>



</div>









<div className="
p-10
">





<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Policies

</h2>






<div className="
mt-8
space-y-6
">





{

policies?.map((policy:any)=>(



<div

key={policy.id}

className="
border
bg-[#F5F8FB]
p-7
"

>




<div className="
flex
justify-between
gap-6
items-start
flex-wrap
">





<div>


<h3 className="
text-2xl
font-black
text-[#003B6F]
">

{policy.title}

</h3>



<p className="
mt-2
text-gray-600
font-semibold
">

{policy.policy_number}

</p>




<p className="
mt-3
text-gray-700
">

Created By:

{" "}

{policy.created_employee?.roblox_username || "Unknown"}

</p>





<p className="
text-gray-700
">

Division:

{" "}

{policy.divisions?.name || "Department Wide"}

</p>





</div>









<Link

href={`/staff/policies/${policy.id}`}

className="
bg-[#003B6F]
text-white
px-5
py-3
font-bold
"

>

View Policy

</Link>






</div>









<div className="
mt-5
flex
gap-3
flex-wrap
">





<span className="
bg-white
border
px-4
py-2
font-bold
text-sm
">

{

policy.classification === "FOUO"

?

"🔒 FOUO"

:

"Public"

}

</span>







<span className="
bg-white
border
px-4
py-2
font-bold
text-sm
">

{

policy.status || "Unknown"

}

</span>






<span className="
bg-white
border
px-4
py-2
font-bold
text-sm
">

{

policy.division_id

?

"Divisional Policy"

:

"Universal Policy"

}

</span>





</div>









{

policy.approved_employee && (

<p className="
mt-5
text-sm
text-gray-500
">

Approved By:

{" "}

{policy.approved_employee.roblox_username}

</p>

)



}





</div>



))



}









{

(!policies || policies.length===0) && (


<p className="
text-gray-500
">

No policies created.

</p>


)



}






</div>





</div>







</div>



</section>



</main>



);



}
