"use client";

import { useState } from "react";


export default function EmployeeSearch({

employees

}:{

employees:any[];

}){


const [search,setSearch] = useState("");

const [status,setStatus] = useState("All");



const filtered = employees.filter((employee)=>{


const matchesSearch =

employee.roblox_username
?.toLowerCase()
.includes(search.toLowerCase())

||

employee.employee_number
?.toLowerCase()
.includes(search.toLowerCase());





const matchesStatus =

status === "All"

||

employee.status === status;




return matchesSearch && matchesStatus;


});





return (

<div>


<div className="
grid
md:grid-cols-2
gap-4
mb-6
">


<input

placeholder="Search employees..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
border
p-4
w-full
outline-none
focus:ring-2
focus:ring-[#003B6F]
rounded
"

/>





<select

value={status}

onChange={(e)=>setStatus(e.target.value)}

className="
border
p-4
bg-white
rounded
"

>


<option value="All">

All Statuses

</option>


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





<p className="
text-gray-500
font-semibold
">

Showing {filtered.length} employees

</p>



</div>

);


}
