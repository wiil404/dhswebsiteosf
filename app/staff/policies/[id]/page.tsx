import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { getEmployeeSession } from "@/app/lib/employee-auth";

import {
    canApprovePolicy
} from "@/app/lib/policy-permissions";



export const dynamic = "force-dynamic";
export const revalidate = 0;




export default async function PolicyViewPage({

params

}:{

params:Promise<{
    id:string
}>

}){


const {id}=await params;



const session = await getEmployeeSession();



if(!session){

redirect("/staff");

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







const {

data:policy,

error

}=await supabaseAdmin

.from("policies")

.select(`

*,

divisions(

name

),

creator:employees!policies_created_by_fkey(

roblox_username

),

approver:employees!policies_approved_by_fkey(

roblox_username

)

`)

.eq(
"id",
id
)

.single();






if(error || !policy){

return (

<main className="p-12">

<h1 className="
text-4xl
font-black
">

Policy Not Found

</h1>

</main>

);

}







const canApprove =
canApprovePolicy(
position?.title
);









async function approvePolicy(){

"use server";



const session =
await getEmployeeSession();



if(!session){

throw new Error(
"Unauthorized"
);

}




await supabaseAdmin

.from("policies")

.update({

status:"Published",

approved_by:
session.employees.id,

updated_at:
new Date()

})

.eq(
"id",
id
);



redirect(
`/staff/policies/${id}`
);



}










return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-6xl
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




<h1 className="
text-5xl
font-black
mt-4
">

{policy.title}

</h1>



<p className="
mt-3
text-blue-100
">

Official Department Policy Record

</p>



</div>









<div className="
p-10
space-y-10
">







<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Policy Information

</h2>






<div className="
grid
md:grid-cols-3
gap-6
mt-6
">



<Info

title="Policy Number"

value={
policy.policy_number
}

/>




<Info

title="Classification"

value={
policy.classification
}

/>





<Info

title="Status"

value={
policy.status
}

/>



</div>



</section>









<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Ownership

</h2>





<div className="
bg-[#F5F8FB]
border
p-6
mt-6
">


<p>

Created By:

{" "}

<b>
{
policy.creator?.roblox_username ||
"Unknown"
}
</b>

</p>




<p className="mt-2">

Division:

{" "}

<b>
{
policy.divisions?.name ||
"Department Wide"
}
</b>

</p>





{

policy.approver && (

<p className="mt-2">

Approved By:

{" "}

<b>
{
policy.approver.roblox_username
}
</b>

</p>

)

}




</div>



</section>









<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Approval

</h2>




<div className="
border
bg-[#F5F8FB]
p-8
mt-6
">





{

policy.status !== "Published" && canApprove && (

<form action={approvePolicy}>


<button

className="
bg-[#003B6F]
text-white
px-8
py-4
font-black
"

>

Approve & Publish Policy

</button>


</form>

)

}





{

policy.status === "Published" && (

<p className="
text-green-700
font-black
">

✓ Policy Published

</p>

)

}





{

policy.status !== "Published" && !canApprove && (

<p className="
text-gray-600
">

Awaiting executive approval.

</p>

)

}





</div>



</section>









<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Policy Content

</h2>




<div className="
mt-6
border
bg-[#F5F8FB]
p-8
whitespace-pre-wrap
leading-relaxed
">

{policy.content}

</div>




</section>







</div>





</div>


</section>


</main>

);


}







function Info({

title,

value

}:{

title:string;

value:string;

}){


return (

<div className="
border
bg-[#F5F8FB]
p-6
">


<p className="
uppercase
tracking-widest
text-xs
font-bold
text-gray-500
">

{title}

</p>



<p className="
mt-3
font-black
text-[#003B6F]
">

{value}

</p>



</div>

);


}