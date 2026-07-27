"use client";

import { useMemo, useState } from "react";
import Link from "next/link";



export default function EmployeeSearch({

employees

}:{

employees:any[];

}){



const [search,setSearch] = useState("");

const [status,setStatus] = useState("All");





const groupedEmployees = useMemo(()=>{


const filtered = employees.filter((employee)=>{


const matchesSearch =

employee.roblox_username
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

employee.employee_number
?.toLowerCase()
.includes(
search.toLowerCase()
);




const matchesStatus =

status === "All"

||

employee.status === status;




return matchesSearch && matchesStatus;


});





const groups:any = {};



filtered.forEach((employee)=>{


const division = employee.division;

if(!division){

    return;

}



if(!groups[division]){

groups[division] = [];

}



groups[division].push(employee);



});




return groups;



},[employees,search,status]);








return (

<div>



<div className="
grid
md:grid-cols-2
gap-4
mb-10
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
"

/>





<select

value={status}

onChange={(e)=>setStatus(e.target.value)}

className="
border
p-4
bg-white
"

>


<option>
All
</option>


<option>
Active
</option>


<option>
Inactive
</option>


<option>
Suspended
</option>


</select>



</div>









{

Object.keys(groupedEmployees).length === 0 && (


<div className="
border
bg-[#F5F8FB]
p-8
text-center
font-bold
text-gray-500
">

No employees found.

</div>


)

}









<div className="
space-y-12
">


{


Object.entries(groupedEmployees).map(

([division,divisionEmployees]:any)=>(


<section

key={division}

>


<div className="
flex
items-center
gap-4
mb-6
"

>


<div className="
h-1
flex-1
bg-[#003B6F]
"

/>


<h2 className="
text-3xl
font-black
text-[#003B6F]
"

>

{division}

</h2>



<div className="
h-1
flex-1
bg-[#F2C94C]
"

/>


</div>









<div className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-6
">


{


divisionEmployees.map((employee:any)=>(


<Link

key={employee.id}

href={`/staff/employees/${employee.id}`}

className="
group
bg-white
border
shadow-sm
p-6
hover:shadow-xl
transition
relative
overflow-hidden
"

>


<div className="
absolute
left-0
top-0
h-full
w-1
bg-[#003B6F]
group-hover:bg-[#F2C94C]
transition
"
/>







<h3 className="
text-xl
font-black
text-[#003B6F]
"

>

{employee.roblox_username}

</h3>





<p className="
mt-2
text-gray-600
font-semibold
"

>

{employee.positions?.title || "No Position"}

</p>





<p className="
text-sm
text-gray-500
"

>

{employee.employee_number}

</p>







<div className="
mt-5
flex
gap-3
flex-wrap
">


<span className="
px-3
py-1
text-sm
font-bold
bg-green-100
text-green-700
border
border-green-300
"

>

{employee.status}

</span>



</div>







<div className="
mt-6
text-[#003B6F]
font-black
opacity-0
group-hover:opacity-100
transition
"

>

View Record →

</div>




</Link>


))


}



</div>



</section>



))


}



</div>



</div>


);


}
