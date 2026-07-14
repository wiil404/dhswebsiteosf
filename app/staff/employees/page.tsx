"use client";

import { useEffect, useState } from "react";
import Link from "next/link";



export default function Employees(){


const [employees,setEmployees] = useState<any[]>([]);

const [loading,setLoading] = useState(true);


const [pages,setPages] = useState<any>({});

const employeesPerPage = 9;







useEffect(()=>{


async function load(){


try{


const response = await fetch(

"/api/staff/employees",

{

cache:"no-store"

}

);



const data = await response.json();


setEmployees(data);



}

catch(error){

console.error(
"EMPLOYEE LOAD ERROR:",
error
);

}

finally{

setLoading(false);

}


}



load();


},[]);









function groupEmployees(){


return employees.reduce(

(groups,employee)=>{


const division =
employee.divisions?.name ||
"No Division";



if(!groups[division]){

groups[division]=[];

}



groups[division].push(employee);



return groups;


},

{} as any


);


}









function changePage(
division:string,
page:number
){


setPages({

...pages,

[division]:page

});


}









if(loading){


return (

<main className="
max-w-7xl
mx-auto
px-6
py-16
">

<div className="
bg-white
shadow-xl
border
p-10
">

<h1 className="
text-xl
font-bold
text-[#003B6F]
">

Loading employee directory...

</h1>

</div>

</main>

);

}






const grouped =
groupEmployees();









return (

<main className="
max-w-7xl
mx-auto
px-6
py-16
">


<div className="
bg-white
shadow-xl
border
border-gray-200
p-10
">






<div className="
flex
justify-between
items-center
border-b
pb-8
">


<div>


<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Employee Directory

</h1>


<p className="
mt-3
text-gray-600
">

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

Add Employee

</Link>


</div>









<div className="
mt-10
space-y-16
">


{

Object.entries(grouped).map(

([division,members]:any)=>(


<section key={division}>


<h2 className="
text-3xl
font-bold
text-[#003B6F]
border-b
pb-3
mb-8
">

{division}

</h2>





{


(()=>{


const currentPage =
pages[division] || 1;


const totalPages =
Math.ceil(
members.length / employeesPerPage
);



const start =
(currentPage - 1)
*
employeesPerPage;



const currentEmployees =
members.slice(
start,
start + employeesPerPage
);



return (

<>



<div className="
grid
md:grid-cols-3
gap-6
">


{

currentEmployees.map(
(employee:any)=>(



<Link

key={employee.id}

href={`/staff/employees/${employee.id}`}

className="
relative
bg-white
border
border-gray-200
p-6
shadow-sm
hover:shadow-xl
transition
"


>


<div className="
absolute
left-0
top-0
bottom-0
w-1
bg-[#003B6F]
"/>





<h3 className="
text-xl
font-bold
text-[#003B6F]
">

{employee.roblox_username}

</h3>





<div className="
mt-4
">


<p className="
font-semibold
">

{
employee.positions?.title ||
"No Position"
}

</p>



<p className="
text-gray-600
">

{
employee.divisions?.name ||
"No Division"
}

</p>



</div>





<div className="mt-5">


{

employee.status === "Active"

?

<span className="
bg-green-100
text-green-700
px-3
py-1
text-sm
font-bold
">

Active

</span>

:

<span className="
bg-gray-100
text-gray-700
px-3
py-1
text-sm
font-bold
">

{employee.status}

</span>


}



</div>







<div className="
mt-6
pt-4
border-t
">

<p className="
text-xs
uppercase
text-gray-500
">

Roblox ID

</p>


<p className="
text-sm
font-semibold
">

{employee.roblox_user_id}

</p>


</div>




</Link>


))


}


</div>







{

totalPages > 1 && (


<div className="
flex
justify-center
items-center
gap-3
mt-8
">


<button

disabled={
currentPage === 1
}

onClick={()=>changePage(
division,
currentPage - 1
)}

className="
border
px-4
py-2
disabled:opacity-40
"

>

Previous

</button>





<span className="
font-bold
text-[#003B6F]
">

{currentPage} / {totalPages}

</span>





<button

disabled={
currentPage === totalPages
}

onClick={()=>changePage(
division,
currentPage + 1
)}

className="
border
px-4
py-2
disabled:opacity-40
"

>

Next

</button>


</div>


)

}



</>

);



})()


}



</section>


)


)


}



</div>







{

employees.length === 0 && (

<div className="
mt-10
text-center
text-gray-500
">

No employees found.

</div>

)

}



</div>


</main>


);


}
