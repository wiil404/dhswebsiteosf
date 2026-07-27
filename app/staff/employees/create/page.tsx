import { redirect } from "next/navigation";
import Link from "next/link";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getUser } from "@/app/lib/auth";

import { createEmployee } from "./actions";


export const dynamic = "force-dynamic";





export default async function CreateEmployeePage(){



const user = await getUser();



if(!user){

redirect("/staff/login");

}






const {data:divisions}=await supabaseAdmin

.from("divisions")

.select(`

id,

name

`)

.order(
"name"
);







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
max-w-5xl
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



<div className="
flex
justify-between
items-center
flex-wrap
gap-4
mt-4
">


<h1 className="
text-5xl
font-black
">

Create Employee

</h1>




<Link

href="/staff/employees"

className="
bg-[#F2C94C]
text-[#003B6F]
px-6
py-3
font-black
"

>

← Back

</Link>



</div>




<p className="
mt-4
text-blue-100
">

Create a new DHS personnel record.

</p>



</header>









<form

action={createEmployee}

className="
p-10
space-y-8
"

>







<div>


<label className="
font-black
text-[#003B6F]
">

Roblox Username

</label>



<input

name="roblox_username"

required

placeholder="Example: Wiil404"

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
font-black
text-[#003B6F]
">

Roblox User ID

</label>



<input

name="roblox_user_id"

required

type="number"

placeholder="Example: 333195903"

className="
mt-2
w-full
border
p-4
"

/>



</div>









<div className="
grid
md:grid-cols-2
gap-6
">





<div>


<label className="
font-black
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
"

>


<option value="">

Select Division

</option>



{

divisions?.map((division:any)=>(


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
font-black
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





</div>









<div>


<label className="
font-black
text-[#003B6F]
">

Email

</label>



<input

name="email"

type="email"

placeholder="employee@gov.us"

className="
mt-2
w-full
border
p-4
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
text-lg
hover:bg-[#005AA7]
transition
"

>

Create Employee

</button>







</form>







</div>





</section>


</main>


);


}
