import Link from "next/link";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { getEmployeeSession } from "@/app/lib/employee-auth";

import { canCreatePolicy } from "@/app/lib/policy-permissions";



export const dynamic = "force-dynamic";
export const revalidate = 0;



export default async function StaffPoliciesPage(){



const session = await getEmployeeSession();



if(!session){

    return null;

}



const employee = session.employees;



const {data:position}=await supabaseAdmin

.from("positions")

.select("title")

.eq(
"id",
employee.position_id
)

.single();





const canCreate =
canCreatePolicy(
position?.title
);







const {data:policies,error}=await supabaseAdmin

.from("policies")

.select(`

*,

divisions(

name

),

employees!policies_created_by_fkey(

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
shadow-2xl
border
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
">


<h1 className="
text-5xl
font-black
">

Policy Registry

</h1>





{

canCreate && (

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

)

}



</div>




<p className="
mt-4
text-blue-100
">

Manage Department policies and official documentation.

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
flex
justify-between
items-center
"

>



<div>



<h3 className="
text-xl
font-black
text-[#003B6F]
">

{policy.title}

</h3>





<p className="
mt-2
text-gray-700
">

{policy.policy_number}

</p>





<p className="
text-sm
text-gray-500
mt-1
">

{

policy.divisions?.name ||

"Department Wide"

}

</p>





<div className="
mt-4
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

{policy.status}

</span>





<span className="
bg-white
border
px-4
py-2
font-bold
text-sm
">

{policy.classification}

</span>





</div>





<p className="
text-xs
text-gray-500
mt-4
">

Created by:

{" "}

{
policy.employees?.roblox_username ||
"Unknown"
}

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

View

</Link>






</div>



))



}






{

(!policies || policies.length === 0) && (

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