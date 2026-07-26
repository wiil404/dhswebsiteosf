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



export default async function PolicyAcknowledgements({

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






const {data:viewer}=await supabaseAdmin

.from("employees")

.select(`

id,

division_id,

positions(

title

)

`)

.eq(

"id",

session.employees.id

)

.single();





if(!viewer){

redirect("/employee/login");

}






const viewerPosition =
(viewer.positions as any)?.title || "";



const isExecutive =
executiveRoles.includes(viewerPosition);








const {data:policy}=await supabaseAdmin

.from("policies")

.select(`

id,

title,

scope,

division_id

`)

.eq(

"id",

id

)

.single();






if(!policy){

redirect("/staff/policies");

}








if(!isExecutive){


const allowed =

policy.scope==="UNIVERSAL"

||

policy.division_id===viewer.division_id;



if(!allowed){

return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">

<div className="
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
">

You cannot view acknowledgement records for this policy.

</p>


</div>

</main>

);

}


}









//
// Find employees affected by policy
//

let employeeQuery =
supabaseAdmin

.from("employees")

.select(`

id,

roblox_username,

employee_number,

divisions(

name

)

`);





if(policy.scope==="DIVISIONAL"){


employeeQuery =
employeeQuery.eq(

"division_id",

policy.division_id

);


}






const {

data:employees

}=await employeeQuery;









const {

data:acknowledgements

}=await supabaseAdmin

.from("policy_acknowledgements")

.select(`

employee_id,

acknowledged_at

`)

.eq(

"policy_id",

id

);









const acknowledgedIds =
new Set(

acknowledgements?.map(

(a:any)=>

a.employee_id

)

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
text-4xl
font-black
mt-4
">

Policy Acknowledgements

</h1>


<p className="
mt-3
text-blue-100
">

{policy.title}

</p>


</div>









<div className="
p-10
">


<div className="
grid
md:grid-cols-3
gap-6
">



<Card

title="Assigned"

value={
String(employees?.length || 0)
}

/>



<Card

title="Acknowledged"

value={
String(acknowledgedIds.size)
}

/>



<Card

title="Outstanding"

value={

String(

(employees?.length || 0)

-

acknowledgedIds.size

)

}

/>



</div>










<section className="
mt-10
">


<h2 className="
text-2xl
font-black
text-[#003B6F]
">

Employee Status

</h2>



<div className="
mt-6
space-y-4
">


{

employees?.map((employee:any)=>{


const acknowledged =
acknowledgedIds.has(
employee.id
);



return (

<div

key={employee.id}

className="
border
bg-[#F5F8FB]
p-5
flex
justify-between
items-center
"

>


<div>


<h3 className="
font-black
text-[#003B6F]
text-lg
">

{employee.roblox_username}

</h3>


<p className="
text-gray-500
">

Employee Number:

{" "}

{employee.employee_number || "Pending"}

</p>


</div>




<div

className={

acknowledged

?

"text-green-700 font-black"

:

"text-red-600 font-black"

}

>

{

acknowledged

?

"✓ Acknowledged"

:

"⚠ Pending"

}


</div>



</div>

);


})


}


</div>



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
text-3xl
font-black
text-[#003B6F]
mt-3
">

{value}

</p>


</div>

);


}