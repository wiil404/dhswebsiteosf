"use client";

import { useEffect, useState } from "react";
import Link from "next/link";



export default function Employees(){



const [employees,setEmployees] =
useState<any[]>([]);


const [loading,setLoading] =
useState(true);







useEffect(()=>{


async function load(){



const response = await fetch(

"/api/staff/employees",

{

cache:"no-store"

}

);





const data =
await response.json();





setEmployees(data);

setLoading(false);



}





load();



},[]);










if(loading){


return (

<main

className="
max-w-7xl
mx-auto
px-6
py-16
"

>


<div

className="
bg-white
shadow-xl
border
border-gray-200
p-10
"

>

<p

className="
text-xl
font-semibold
text-[#003B6F]
"

>

Loading employee directory...

</p>


</div>


</main>

);


}









return (

<main

className="
max-w-7xl
mx-auto
px-6
py-16
"

>


<div

className="
bg-white
shadow-xl
border
border-gray-200
p-8
md:p-12
"

>






{/* HEADER */}


<div

className="
flex
justify-between
items-start
border-b
border-gray-200
pb-8
"

>


<div>


<h1

className="
text-4xl
font-bold
text-[#003B6F]
"

>

Employee Directory

</h1>





<p

className="
mt-3
text-gray-600
"

>

View and manage DHS personnel records.

</p>


</div>








<Link

href="/staff/employees/create"

className="
bg-[#003B6F]
text-white
px-6
py-3
font-bold
hover:bg-[#00284d]
transition
"

>

+ Add Employee

</Link>




</div>









{/* EMPLOYEE GRID */}


<div

className="
mt-10
grid
md:grid-cols-3
gap-6
"

>





{

employees.map(employee=>(


<Link

key={employee.id}

href={`/staff/employees/${employee.id}`}

className="
relative
border
border-gray-200
p-6
shadow-sm
hover:shadow-lg
transition
bg-white
"

>





<div

className="
absolute
left-0
top-0
h-full
w-1
bg-[#003B6F]
"

/>








<h2

className="
text-xl
font-bold
text-[#003B6F]
"

>

{employee.roblox_username}

</h2>







<p

className="
mt-3
text-gray-700
font-semibold
"

>

{employee.positions?.title || "No Position"}

</p>







<p

className="
text-gray-600
"

>

{employee.divisions?.name || "No Division"}

</p>









<span

className={`

inline-block
mt-5
px-3
py-1
text-sm
font-bold

${

employee.status === "Active"

?

"bg-green-100 text-green-700"

:

"bg-gray-100 text-gray-700"

}

`}

>

{employee.status}

</span>









<div

className="
mt-5
pt-4
border-t
border-gray-100
"

>


<p

className="
text-sm
text-gray-500
"

>

Roblox ID

</p>



<p

className="
text-sm
font-semibold
text-gray-700
"

>

{employee.roblox_user_id}

</p>


</div>






</Link>



))


}





</div>







</div>





</main>


);


}
