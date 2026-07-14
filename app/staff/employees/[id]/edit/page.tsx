import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "../../../../lib/supabase-admin";



async function getEmployee(id:string){


const {

data:employee

}=await supabaseAdmin

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



return employee;


}







async function getPositions(){


const {

data

}=await supabaseAdmin

.from("positions")

.select("*")

.order(
"title"
);


return data || [];

}







async function getDivisions(){


const {

data

}=await supabaseAdmin

.from("divisions")

.select("*")

.order(
"name"
);


return data || [];

}







export default async function EditEmployee({

params

}:{

params:Promise<{
id:string
}>

}){


const {
id

}=await params;




const employee =
await getEmployee(id);




if(!employee){

redirect(
"/staff/employees"
);

}





const positions =
await getPositions();


const divisions =
await getDivisions();






return (

<main className="
max-w-5xl
mx-auto
px-6
py-12
">



<div className="
bg-white
shadow-xl
border
border-gray-200
p-8
md:p-12
">





<h1 className="
text-4xl
font-black
text-[#003B6F]
">

Edit Employee

</h1>



<p className="
mt-3
text-gray-500
">

Update DHS personnel information.

</p>







<form

action={`/api/staff/employees/${id}/edit`}

method="POST"

className="
mt-10
space-y-6
"

>







<div>

<label className="
font-bold
">

Roblox Username

</label>


<input

name="roblox_username"

defaultValue={
employee.roblox_username
}

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
">

Roblox User ID

</label>


<input

name="roblox_user_id"

defaultValue={
employee.roblox_user_id
}

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
">

Email

</label>


<input

name="email"

defaultValue={
employee.email
}

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
">

Employee Number

</label>


<input

name="employee_number"

defaultValue={
employee.employee_number
}

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
">

Position

</label>



<select

name="position_id"

defaultValue={
employee.position_id
}

className="
mt-2
w-full
border
p-4
"

>


{

positions.map((position:any)=>(

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
">

Division

</label>



<select

name="division_id"

defaultValue={
employee.division_id
}

className="
mt-2
w-full
border
p-4
"

>


{

divisions.map((division:any)=>(

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
">

Status

</label>



<select

name="status"

defaultValue={
employee.status
}

className="
mt-2
w-full
border
p-4
"

>

<option value="Active">

Active

</option>


<option value="Inactive">

Inactive

</option>


</select>


</div>









<div className="
flex
gap-4
">


<button

className="
bg-[#003B6F]
text-white
px-8
py-3
font-bold
"

>

Save Changes

</button>




<Link

href={`/staff/employees/${id}`}

className="
bg-gray-200
px-8
py-3
font-bold
"

>

Cancel

</Link>


</div>





</form>





</div>


</main>


);


}