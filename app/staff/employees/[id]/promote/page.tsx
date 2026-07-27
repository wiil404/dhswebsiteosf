import Link from "next/link";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { changePosition } from "./actions";


export const dynamic = "force-dynamic";



export default async function PromoteEmployeePage({

params

}:{

params:Promise<{
id:string
}>

}){


const {id}=await params;





const {data:employee}=await supabaseAdmin

.from("employees")

.select(`

*,

positions(
title
)

`)

.eq(
"id",
id
)

.single();





if(!employee){

redirect("/staff/employees");

}





const {data:positions}=await supabaseAdmin

.from("positions")

.select(`

id,

title

`)

.order(
"title"
);







return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-4xl
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



<header className="
bg-gradient-to-r
from-[#003B6F]
to-[#005AA7]
text-white
p-10
">


<p className="
uppercase
tracking-[0.35em]
text-sm
font-black
text-[#F2C94C]
">

Department of Homeland Security

</p>



<h1 className="
text-5xl
font-black
mt-4
">

Change Position

</h1>



<p className="
mt-3
text-blue-100
">

Promote or demote {employee.roblox_username}

</p>


</header>







<form

action={changePosition}

className="
p-10
space-y-8
"

>


<input

type="hidden"

name="employeeId"

value={employee.id}

/>





<div className="
bg-[#F5F8FB]
border
p-6
">


<p className="
font-bold
text-gray-500
uppercase
text-sm
">

Current Position

</p>



<p className="
text-2xl
font-black
text-[#003B6F]
mt-2
">

{employee.positions?.title || "None"}

</p>


</div>








<div>


<label className="
font-black
text-[#003B6F]
">

New Position

</label>



<select

name="positionId"

required

className="
mt-2
border
p-4
w-full
"

>


<option value="">

Select Position

</option>



{

positions?.map((position:any)=>(


<option

key={position.id}

value={position.id}

>

{position.title}

</option>


))


}


</select>



</div>









<div>


<label className="
font-black
text-[#003B6F]
">

Reason

</label>



<textarea

name="reason"

required

placeholder="Reason for promotion/demotion..."

className="
mt-2
border
p-4
w-full
h-32
"

/>


</div>








<button

className="
bg-[#003B6F]
text-white
px-8
py-4
font-black
hover:bg-[#005AA7]
transition
"

>

Confirm Change

</button>







<Link

href={`/staff/employees/${employee.id}`}

className="
ml-4
bg-[#F2C94C]
text-[#003B6F]
px-8
py-4
font-black
"

>

Cancel

</Link>






</form>







</div>


</section>


</main>

);


}
