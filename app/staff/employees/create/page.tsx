import Link from "next/link";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { createEmployee } from "./actions";



export const dynamic = "force-dynamic";





export default async function CreateEmployeePage(){



const {data:divisions}=await supabaseAdmin

.from("divisions")

.select(`
id,
name
`)

.order("name");





const {data:positions}=await supabaseAdmin

.from("positions")

.select(`
id,
title
`)

.order("title");






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
border
shadow-xl
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
text-[#F2C94C]
font-black
uppercase
tracking-[0.35em]
text-sm
">

Department of Homeland Security

</p>



<h1 className="
text-4xl
font-black
mt-4
">

Create Employee

</h1>



<p className="
text-blue-100
mt-3
">

Add a new DHS personnel record.

</p>



</header>







<form

action={createEmployee}

className="
p-10
space-y-6
"

>



<div>

<label className="
font-bold
text-[#003B6F]
">

Roblox Username

</label>


<input

name="roblox_username"

required

className="
mt-2
w-full
border
p-4
"

/>

</div>







<div>

<label className="
font-bold
text-[#003B6F]
">

Roblox User ID

</label>


<input

name="roblox_user_id"

type="number"

required

className="
mt-2
w-full
border
p-4
"

/>

</div>














<div>

<label className="
font-bold
text-[#003B6F]
">

Division

</label>



<select

name="division_id"

required

className="
mt-2
w-full
border
p-4
bg-white
"

>


<option value="">
Select Division
</option>


{

(divisions || []).map((division:any)=>(


<option

key={division.id}

value={division.id}

>

{division.name}

</option>


))


}



</select>


</div>







<div>

<label className="
font-bold
text-[#003B6F]
">

Position

</label>



<select

name="position_id"

required

className="
mt-2
w-full
border
p-4
bg-white
"

>


<option value="">
Select Position
</option>



{

(positions || []).map((position:any)=>(


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
font-bold
text-[#003B6F]
">

Status

</label>



<select

name="status"

defaultValue="Active"

className="
mt-2
w-full
border
p-4
bg-white
"

>


<option value="Active">
Active
</option>


<option value="Inactive">
Inactive
</option>


<option value="Suspended">
Suspended
</option>



</select>


</div>







<div className="
flex
gap-4
pt-6
">


<button

type="submit"

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

Create Employee

</button>



<Link

href="/staff/employees"

className="
border
px-8
py-4
font-black
"

>

Cancel

</Link>



</div>






</form>






</div>


</section>


</main>


);


}
