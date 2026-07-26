"use client";

import Link from "next/link";
import { useState } from "react";


export default function EmployeeSearch({

employees

}:{

employees:any[]

}){


const [search,setSearch] = useState("");



const filteredEmployees = employees.filter((employee)=>{


const text = `

${employee.roblox_username}

${employee.employee_number}

${employee.positions?.title}

${employee.divisions?.name}

`

.toLowerCase();



return text.includes(
search.toLowerCase()
);


});





return (

<div>


<input

type="text"

placeholder="Search employees..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full
border
p-4
mb-8
text-lg
"

/>





<div className="
space-y-5
">


{

filteredEmployees.map((employee:any)=>(


<div

key={employee.id}

className="
border
bg-[#F5F8FB]
p-6
flex
justify-between
items-center
flex-wrap
gap-4
"

>


<div>


<h2 className="
text-xl
font-black
text-[#003B6F]
">

{employee.roblox_username}

</h2>



<p className="
mt-2
text-gray-600
">

Employee Number:

{" "}

{employee.employee_number || "Pending"}

</p>



<p className="
text-sm
text-gray-500
mt-1
">

{employee.positions?.title || "No Position"}

{" • "}

{employee.divisions?.name || "No Division"}

</p>




<span className="
inline-block
mt-3
bg-white
border
px-3
py-1
font-bold
text-sm
">

{employee.status || "Unknown"}

</span>


</div>







<Link

href={`/staff/employees/${employee.id}`}

className="
bg-[#003B6F]
text-white
px-5
py-3
font-bold
"

>

View Profile

</Link>



</div>


))


}



{

filteredEmployees.length === 0 && (

<p className="
text-gray-500
">

No employees found.

</p>

)

}



</div>


</div>

);

}
