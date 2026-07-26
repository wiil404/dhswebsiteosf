import Link from "next/link";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import EmployeeSearch from "./EmployeeSearch";


export const dynamic = "force-dynamic";
export const revalidate = 0;



export default async function StaffEmployeesPage(){



const {data:employees}=await supabaseAdmin

.from("employees")

.select(`

id,

roblox_username,

roblox_user_id,

employee_number,

status,

positions(

title

),

divisions(

name

)

`)

.order(
"roblox_username"
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
flex-wrap
gap-4
">


<h1 className="
text-5xl
font-black
">

Employee Registry

</h1>




<Link

href="/staff"

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

← Staff Dashboard

</Link>



</div>





<p className="
mt-4
text-blue-100
">

Manage Department personnel records.

</p>



</div>









<div className="
p-10
">



<div className="
mb-8
flex
justify-between
items-center
flex-wrap
gap-4
">


<div>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Employee Registry

</h2>


<p className="
text-gray-500
mt-2
">

Total Personnel:

{" "}

<span className="font-bold">

{employees?.length || 0}

</span>

</p>


</div>



</div>








<EmployeeSearch employees={employees || []}/>







</div>






</div>


</section>


</main>


);

}
