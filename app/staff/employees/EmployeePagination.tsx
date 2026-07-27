"use client";

import { useMemo, useRef, useState } from "react";
import EmployeeCard from "./EmployeeCard";


export default function EmployeePagination({

employees

}:{

employees:any[];

}){


const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});


const [search,setSearch] = useState("");

const [status,setStatus] = useState("All");





const filteredEmployees = useMemo(()=>{


return employees.filter((employee)=>{


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


},[employees,search,status]);






const groups:any = {};



filteredEmployees.forEach((employee)=>{


if(!groups[employee.division]){

groups[employee.division]=[];

}


groups[employee.division].push(employee);


});







function scrollDivision(

division:string,

amount:number

){


sliderRefs.current[division]?.scrollBy({

left:amount,

behavior:"smooth"

});


}






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
rounded
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
rounded
bg-white
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







{

Object.entries(groups).map(

([division,staff]:any)=>(


<section

key={division}

className="
mb-16
"

>


<div className="
border-l-4
border-[#F2C94C]
pl-5
mb-6
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

{division}

</h2>



<p className="
text-gray-500
font-semibold
mt-2
">

{staff.length} Personnel Assigned

</p>


</div>







<div

ref={(el)=>{

sliderRefs.current[division]=el;

}}

className="
flex
gap-8
overflow-x-auto
scroll-smooth
pb-5
snap-x
snap-mandatory
"

>


{

staff.map((employee:any)=>(


<div

key={employee.id}

className="
w-[380px]
min-w-[380px]
snap-start
"

>


<EmployeeCard

employee={employee}

/>


</div>


))


}



</div>







{

staff.length > 3 && (


<div className="
flex
justify-center
gap-5
mt-6
">


<button

onClick={()=>scrollDivision(division,-450)}

className="
bg-[#003B6F]
text-white
px-6
py-3
rounded
font-black
hover:bg-[#005AA7]
transition
"

>

← Previous

</button>




<button

onClick={()=>scrollDivision(division,450)}

className="
bg-[#003B6F]
text-white
px-6
py-3
rounded
font-black
hover:bg-[#005AA7]
transition
"

>

Next →

</button>



</div>


)


}



</section>


)


)


}



{

Object.keys(groups).length===0 && (

<div className="
border
p-8
text-center
font-bold
text-gray-500
">

No employees found.

</div>

)

}



</div>

);


}
