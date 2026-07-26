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
mt-5
gap-5
">


<div>


<h1 className="
text-5xl
font-black
">

Policy Management

</h1>



<p className="
mt-3
text-blue-100
">

Create, review and manage Department policies.

</p>



</div>





{

canCreate && (

<Link

href="/staff/policies/create"

className="
bg-[#F2C94C]
text-[#003B6F]
px-7
py-4
font-black
text-lg
hover:scale-105
transition
"

>

+ Create Policy

</Link>

)

}





</div>




</div>









<div className="
p-10
">



<div className="
flex
justify-between
items-center
">

<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Policy Registry

</h2>


<p className="
text-gray-500
">

{
policies?.length || 0
}

 Policies

</p>


</div>







<div className="
mt-8
grid
md:grid-cols-2
gap-6
">






{

policies?.map((policy:any)=>(


<div

key={policy.id}

className="
border
bg-[#F5F8FB]
p-7
shadow-sm
hover:shadow-lg
transition
"

>



<div className="
flex
justify-between
gap-4
">



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
text-sm
text-gray-500
">

{policy.policy_number}

</p>



</div>




<span className="
bg-white
border
px-3
py-2
text-xs
font-black
h-fit
">

{policy.status}

</span>




</div>







<div className="
mt-5
space-y-2
text-gray-700
">


<p>

<b>Division:</b>

{" "}

{

policy.divisions?.name ||

"Department Wide"

}

</p>



<p>

<b>Classification:</b>

{" "}

{

policy.classification

}

</p>




<p>

<b>Created:</b>

{" "}

{

policy.created_at

?

new Date(
policy.created_at
)
.toLocaleDateString("en-GB")

:

"N/A"

}

</p>




</div>








<div className="
mt-6
flex
justify-between
items-center
">


<div className="
flex
gap-3
">



{

policy.classification === "FOUO" && (

<span className="
bg-red-100
border
border-red-300
text-red-700
px-3
py-1
text-xs
font-black
">

FOUO

</span>

)

}




{

policy.status === "Published" && (

<span className="
bg-green-100
border
border-green-300
text-green-700
px-3
py-1
text-xs
font-black
">

Published

</span>

)

}




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






</div>



))

}




{

(!policies || policies.length === 0) && (

<div className="
border
p-10
text-center
text-gray-500
col-span-2
">

No policies have been created yet.

</div>

)

}



</div>




</div>




</div>


</section>


</main>

);


}
