"use client";

import { useState } from "react";
import Link from "next/link";



export default function EmployeeSearch({

employees

}:{

employees:any[];

}){



const [search,setSearch] = useState("");



const filtered = employees.filter((employee)=>{


const value = search.toLowerCase();



return (

employee.roblox_username
?.toLowerCase()
.includes(value)

||

employee.employee_number
?.toLowerCase()
.includes(value)

||

employee.positions?.title
?.toLowerCase()
.includes(value)

||

employee.divisions?.name
?.toLowerCase()
.includes(value)

);


});





return (

<div>


<div className="
flex
justify-between
items-center
flex-wrap
gap-4
mb-8
">


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Search Personnel

</h2>



<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search name, position, division..."

className="
border
p-4
w-full
md:w-96
outline-none
focus:ring-2
focus:ring-[#005AA7]
"

/>


</div>







<div className="
grid
md:grid-cols-2
gap-6
">


{


filtered.map((employee)=>(


<div

key={employee.id}

className="
bg-white
border
shadow-sm
p-6
hover:shadow-xl
transition
flex
items-center
gap-5
"

>


<div className="
w-16
h-16
rounded-full
bg-[#003B6F]
text-white
flex
items-center
justify-center
font-black
text-2xl
border-2
border-[#F2C94C]
">

{

employee.roblox_username
?.charAt(0)

}


</div>







<div className="
flex-1
">


<h3 className="
font-black
text-[#003B6F]
text-xl
">

{employee.roblox_username}

</h3>



<p className="
text-gray-600
">

{

employee.positions?.title ||

"No Position"

}

</p>



<p className="
text-sm
text-gray-500
">

{

employee.divisions?.name ||

"Unassigned"

}

</p>




</div>






<Link

href={`/staff/employees/${employee.id}`}

className="
bg-[#003B6F]
text-white
px-5
py-2
font-bold
hover:bg-[#005AA7]
transition
"

>

View

</Link>




</div>


))


}





{

filtered.length === 0 && (

<div className="
col-span-full
bg-gray-50
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




</div>


);


}
