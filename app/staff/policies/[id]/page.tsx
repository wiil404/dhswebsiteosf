import { redirect } from "next/navigation";
import Link from "next/link";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";

import {
approvePolicy,
rejectPolicy,
deletePolicy
} from "./actions";


export const dynamic = "force-dynamic";
export const revalidate = 0;



const approvalRoles = [

"Secretary of Homeland Security",
"Deputy Secretary of Homeland Security",
"Chief of Staff",
"Under Secretary"

];





export default async function PolicyViewPage({

params

}:{

params:Promise<{
id:string
}>

}){


const session = await getEmployeeSession();


if(!session){

redirect("/employee/login");

}




const {id}=await params;







const {data:policy,error}=await supabaseAdmin

.from("policies")

.select(`

*,

divisions(

name

),

created_employee:employees!policies_created_by_fkey(

roblox_username,

positions(

title

)

),

approved_employee:employees!policies_approved_by_fkey(

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

<h1 className="text-3xl font-black">

Policy Not Found

</h1>

</main>

);

}







const {data:currentEmployee}=await supabaseAdmin

.from("employees")

.select(`

positions(

title

)

`)

.eq(
"id",
session.employees.id
)

.single();






const currentPosition =

(currentEmployee?.positions as any)?.title || "";





const canApprove =

approvalRoles.includes(
currentPosition
);






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



<Link

href="/staff/policies"

className="
bg-[#F2C94C]
text-[#003B6F]
px-5
py-3
font-black
inline-block
"

>

← Back to Policies

</Link>






<p className="
uppercase
tracking-[0.35em]
text-[#F2C94C]
font-black
text-sm
mt-8
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

value={policy.policy_number}

/>



<Info

title="Classification"

value={policy.classification}

/>



<Info

title="Status"

value={policy.status}

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
border
bg-[#F5F8FB]
p-6
mt-6
space-y-3
">


<p>

Created By:

{" "}

<b>

{policy.created_employee?.roblox_username || "Unknown"}

</b>

</p>




<p>

Position:

{" "}

<b>

{(policy.created_employee?.positions as any)?.title || "Unknown"}

</b>

</p>




<p>

Division:

{" "}

<b>

{(policy.divisions as any)?.name || "Department Wide"}

</b>

</p>





{

policy.approved_employee && (

<p>

Approved By:

{" "}

<b>

{policy.approved_employee.roblox_username}

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

Policy Content

</h2>




<div className="
mt-6
border
bg-[#F5F8FB]
p-8
prose
max-w-none
">


<div

dangerouslySetInnerHTML={{

__html:policy.content || ""

}}

/>


</div>


</section>









<section>

<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Policy Management

</h2>



<div className="
mt-6
flex
flex-wrap
gap-4
">






<Link

href={`/staff/policies/${policy.id}/edit`}

className="
bg-blue-700
text-white
px-6
py-3
font-black
"

>

Edit Policy

</Link>






<Link

href={`/staff/policies/${policy.id}/acknowledgements`}

className="
bg-[#003B6F]
text-white
px-6
py-3
font-black
"

>

View Acknowledgements

</Link>







<Link

href={`/staff/policies/${policy.id}/delete`}

className="
bg-red-600
text-white
px-6
py-3
font-black
"

>

Delete Policy

</Link>





</div>


</section>









{

canApprove && policy.status !== "Approved" && (


<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Executive Actions

</h2>



<div className="
mt-6
flex
gap-4
">



<form action={approvePolicy}>


<input

type="hidden"

name="policyId"

value={policy.id}

/>



<button

className="
bg-green-600
text-white
px-6
py-3
font-black
"

>

Approve Policy

</button>



</form>








<form action={rejectPolicy}>


<input

type="hidden"

name="policyId"

value={policy.id}

/>



<button

className="
bg-red-700
text-white
px-6
py-3
font-black
"

>

Reject Policy

</button>



</form>




</div>


</section>


)

}





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

{value || "Unknown"}

</p>


</div>

);


}
