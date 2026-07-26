import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";


export const dynamic = "force-dynamic";
export const revalidate = 0;



const executiveRoles = [

"Secretary of Homeland Security",
"Deputy Secretary of Homeland Security",
"Chief of Staff",
"Under Secretary"

];




export default async function EmployeePoliciesPage(){



const session =
await getEmployeeSession();



if(!session){

redirect("/employee/login");

}







const {data:employee}=await supabaseAdmin

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






let query =
supabaseAdmin

.from("policies")

.select(`

id,

policy_number,

title,

category,

classification,

scope,

status,

division_id,

created_at,

divisions(

name

)

`)

.eq(

"status",

"Approved"

)

.order(

"created_at",

{
ascending:false
}

);







let {data:policies}=await query;







if(!isExecutive){


policies = policies?.filter((policy:any)=>{


return (

policy.scope==="UNIVERSAL"

||

(

policy.scope==="DIVISIONAL"

&&

policy.division_id===employee.division_id

)

);


});


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
border
shadow-xl
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

Policy Library

</h1>




<p className="
mt-3
text-blue-100
">

{

isExecutive

?

"Executive access - viewing all Department policies."

:

`Policies available for ${employee.divisions?.name || "your assignment"}.`

}

</p>


</div>









<div className="
p-10
">





{

policies?.length ?



<div className="
grid
md:grid-cols-2
gap-6
">


{

policies.map((policy:any)=>(



<a

key={policy.id}

href={`/employee/policies/${policy.id}`}

className="
border
bg-[#F5F8FB]
p-6
hover:shadow-lg
transition
"

>


<div className="
flex
justify-between
items-start
">


<h2 className="
text-xl
font-black
text-[#003B6F]
">

{policy.title}

</h2>



<span className="
text-xs
font-black
uppercase
bg-yellow-400
px-3
py-1
">

{policy.scope}

</span>


</div>





<p className="
mt-4
text-gray-600
">

Category:

{" "}

{policy.category}

</p>





<p className="
mt-2
text-gray-600
">

Classification:

{" "}

{policy.classification}

</p>







{

policy.scope==="DIVISIONAL" && (

<p className="
mt-2
text-gray-600
">

Division:

{" "}

{policy.divisions?.name}

</p>

)

}





<p className="
mt-4
text-sm
text-gray-400
">

Created:

{" "}

{
new Date(
policy.created_at
)
.toLocaleDateString("en-GB")
}

</p>




</a>



))

}



</div>



:



<p className="
text-gray-500
">

No policies available.

</p>


}




</div>



</div>



</section>


</main>

);


}