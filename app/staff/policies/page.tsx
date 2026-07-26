import Link from "next/link";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";


export const dynamic = "force-dynamic";
export const revalidate = 0;



export default async function StaffPoliciesPage(){



const session = await getEmployeeSession();



if(!session){

    redirect("/employee/login");

}




const {data:currentEmployee}=await supabaseAdmin

.from("employees")

.select(`

id,

positions(

title

)

`)

.eq(
"id",
session.employees.id
)

.single();





console.log(
"CURRENT EMPLOYEE:",
JSON.stringify(currentEmployee, null, 2)
);


const position =
currentEmployee?.positions?.title || "";


console.log(
"CURRENT POSITION:",
position
);





const policyRoles = [

"Secretary of Homeland Security",

"Deputy Secretary of Homeland Security",

"Chief of Staff",

"Under Secretary",

"Secret Service Director",

"CBP Commissioner",

"Special Response Team Commander",

"Under Secretary for Aviation Operations",

"Senior Flight Officer",

"Deputy Director",

"Assistant Director",

"Chief of Operations",

"CBP Deputy Commissioner",

"Special Agent in Charge (SRT)"

];






const canCreate =
policyRoles.includes(
position.trim()
);









const {

data:policies

}=await supabaseAdmin

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
">


<div>

<h1 className="
text-5xl
font-black
">

Policies

</h1>



<p className="
mt-3
text-blue-100
">

Department policy management and official guidance.

</p>


</div>





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

+ Create Policy

</Link>

)

}



</div>


</div>









<div className="
p-10
">


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Policy Registry

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
text-gray-600
">

Policy Number:

{" "}

{policy.policy_number || "Pending"}

</p>






<p className="
mt-1
text-sm
text-gray-500
">

Division:

{" "}

{policy.divisions?.name || "Department Wide"}

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

{policy.classification || "Public"}

</span>





<span className="
bg-white
border
px-4
py-2
font-bold
text-sm
">

{policy.status || "Draft"}

</span>




</div>



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
