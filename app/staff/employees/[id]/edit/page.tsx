import { redirect } from "next/navigation";
import Link from "next/link";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { updateEmployee } from "./actions";


export const dynamic = "force-dynamic";





export default async function EditEmployeePage({

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
    id,
    title
),

divisions(
    id,
    name
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







const {data:divisions}=await supabaseAdmin

.from("divisions")

.select("*")

.order(
"name"
);








const {data:positions}=await supabaseAdmin

.from("positions")

.select("*")

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





<h1 className="
text-5xl
font-black
mt-4
">

Edit Employee

</h1>




<p className="
mt-3
text-blue-100
">

Update personnel information and assignments.

</p>



</header>









<form

action={updateEmployee}

className="
p-10
space-y-8
"

>


<input

type="hidden"

name="id"

value={employee.id}

/>







<div className="
grid
md:grid-cols-2
gap-6
">





<Field

label="Roblox Username"

name="roblox_username"

value={employee.roblox_username}

/>







<Field

label="Roblox User ID"

name="roblox_user_id"

value={employee.roblox_user_id}

/>







<Field

label="Email"

name="email"

value={employee.email}

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

defaultValue={employee.division_id}

className="
mt-2
border
p-4
w-full
"

>


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

defaultValue={employee.position_id}

className="
mt-2
border
p-4
w-full
"

>


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

Status

</label>



<select

name="status"

defaultValue={employee.status}

className="
mt-2
border
p-4
w-full
"

>


<option>
Active
</option>


<option>
Inactive
</option>


<option>
Suspended
</option>


<option>
Terminated
</option>



</select>


</div>








<div>

<label className="
font-black
text-[#003B6F]
">

Personnel Notes

</label>



<textarea

name="notes"

defaultValue={employee.notes || ""}

className="
mt-2
border
p-4
w-full
h-40
"

/>


</div>









<div className="
flex
gap-4
flex-wrap
">


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

Save Changes

</button>






<Link

href={`/staff/employees/${employee.id}`}

className="
bg-[#F2C94C]
text-[#003B6F]
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









function Field({

label,

name,

value

}:{

label:string;

name:string;

value:any;

}){


return (

<div>


<label className="
font-black
text-[#003B6F]
">

{label}

</label>



<input

name={name}

defaultValue={value || ""}

className="
mt-2
border
p-4
w-full
"

/>



</div>


);


}
