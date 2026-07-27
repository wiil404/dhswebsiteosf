import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";

import AcknowledgePolicy from "@/components/AcknowledgePolicy";


export const dynamic = "force-dynamic";
export const revalidate = 0;



const executiveRoles = [

"Secretary of Homeland Security",
"Deputy Secretary of Homeland Security",
"Chief of Staff",
"Under Secretary"

];






export default async function EmployeePolicyView({

params

}:{

params:Promise<{
id:string
}>

}){


const {
id

}=await params;





const session =
await getEmployeeSession();




if(!session){

redirect("/employee/login");

}







const {

data:employee

}=await supabaseAdmin

.from("employees")

.select(`

id,

division_id,

positions(

title

),

divisions(

name

)

`)

.eq(

"id",

session.employees.id

)

.single();






if(!employee){

redirect("/employee/login");

}







const position =
(employee.positions as any)?.title || "";



const isExecutive =
executiveRoles.includes(position);









const {

data:policy,

error

}=await supabaseAdmin

.from("policies")

.select(`

*,

divisions(

name

)

`)

.eq(

"id",

id

)

.eq(

"status",

"Approved"

)

.single();






if(error || !policy){

return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">

<section className="
max-w-4xl
mx-auto
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

Policy Not Found

</h1>


<p className="
mt-4
text-gray-600
">

This policy does not exist or has not been approved.

</p>


</section>

</main>

);

}









//
// Permission Check
//

if(!isExecutive){



const allowed =

policy.scope==="UNIVERSAL"

||

(

policy.scope==="DIVISIONAL"

&&

policy.division_id===employee.division_id

);




if(!allowed){


return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">

<section className="
max-w-4xl
mx-auto
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

Access Denied

</h1>


<p className="
mt-4
text-gray-700
">

You do not have permission to view this policy.

</p>


</section>

</main>

);


}


}









const {data:acknowledgement}=await supabaseAdmin

.from("policy_acknowledgements")

.select("*")

.eq(

"policy_id",

id

)

.eq(

"employee_id",

employee.id

)

.maybeSingle();









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

Policy Number:

{" "}

{policy.policy_number}

</p>


</div>









<div className="
p-10
space-y-10
">








{

policy.classification==="FOUO"

&&

(

<div className="
bg-yellow-50
border
border-yellow-400
p-6
">

<h2 className="
text-xl
font-black
text-yellow-800
">

⚠ For Official Use Only

</h2>


<p className="
mt-2
text-yellow-900
">

This policy contains information intended for authorised Department personnel only.

</p>


</div>

)

}









<section>

<h2 className="
text-2xl
font-black
text-[#003B6F]
">

Policy Information

</h2>



<div className="
grid
md:grid-cols-3
gap-5
mt-5
">



<Card

title="Category"

value={policy.category || "Unknown"}

/>



<Card

title="Scope"

value={

policy.scope==="UNIVERSAL"

?

"Department Wide"

:

"Division Specific"

}

/>




<Card

title="Division"

value={

(policy.divisions as any)?.name ||

"All Departments"

}

/>



</div>



</section>









{

policy.featured_image && (

<section>


<img

src={policy.featured_image}

alt="Policy Image"

className="
w-full
max-h-[500px]
object-cover
border
"

/>


</section>


)

}









<section>

<h2 className="
text-2xl
font-black
text-[#003B6F]
mb-5
">

Policy Content

</h2>



<div

className="
prose
max-w-none
border
p-8
bg-gray-50
"

dangerouslySetInnerHTML={{

__html:policy.content

}}

/>



</section>









{

policy.attachments?.length > 0 && (

<section>


<h2 className="
text-2xl
font-black
text-[#003B6F]
">

Attachments

</h2>




<div className="
mt-5
space-y-3
">


{

policy.attachments.map((file:any)=>(


<a

key={file.url}

href={file.url}

target="_blank"

className="
block
border
p-4
bg-gray-50
hover:bg-blue-50
"

>


📎 {file.name}



</a>


))


}



</div>



</section>


)

}









{

policy.tag !== "Civil" && (

<section className="
border
bg-white
p-6
">


<h2 className="
text-2xl
font-black
text-[#003B6F]
">

Policy Acknowledgement

</h2>



<p className="
mt-2
text-gray-600
">

Employees are required to acknowledge that they have reviewed and understood this policy.

</p>




<div className="
mt-5
">


<AcknowledgePolicy

policyId={policy.id}

alreadyAcknowledged={!!acknowledgement}

/>


</div>



</section>

)

}








<section className="
bg-[#F5F8FB]
border
p-6
">


<h2 className="
font-black
text-[#003B6F]
">

Effective Date

</h2>


<p className="
mt-2
">

{

policy.effective_date

?

new Date(
policy.effective_date
)
.toLocaleDateString("en-GB")

:

"Pending"

}

</p>



</section>








</div>


</div>



</section>


</main>

);


}








function Card({

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
p-5
">

<p className="
uppercase
text-xs
font-bold
text-gray-500
">

{title}

</p>


<p className="
mt-2
font-black
text-[#003B6F]
">

{value}

</p>


</div>

);


}
