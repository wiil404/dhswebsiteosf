import Link from "next/link";
import { supabaseAdmin } from "@/app/lib/supabase-admin";

import EmployeeSearch from "./EmployeeSearch";

export const dynamic = "force-dynamic";
export const revalidate = 0;



export default async function StaffEmployeesPage(){


const {data:employees,error:employeeError}=await supabaseAdmin

.from("employees")

.select(`

id,

roblox_username,

roblox_user_id,

employee_number,

status,

division_id,

position_id

`)

.order(
"roblox_username"
);



if(employeeError){

console.error(
"EMPLOYEE ERROR:",
employeeError
);

}





//
// Fetch divisions
//

const {data:divisionsData}=await supabaseAdmin

.from("divisions")

.select(`

id,

name

`)

.order(
"name"
);





//
// Fetch positions
//

const {data:positionsData}=await supabaseAdmin

.from("positions")

.select(`

id,

title

`);






const divisionsMap:any={};


for(const division of divisionsData || []){

divisionsMap[division.id]=division.name;

}





const positionsMap:any={};


for(const position of positionsData || []){

positionsMap[position.id]=position.title;

}





//
// Attach readable data
//

const formattedEmployees = (employees || []).map((employee:any)=>({


...employee,


division:

divisionsMap[employee.division_id]
||
"Unassigned",



position:

positionsMap[employee.position_id]
||
"No Position"



}));








//
// Active and former staff
//

const activeEmployees = formattedEmployees.filter(

(employee:any)=>

employee.status?.toLowerCase()==="active"

);



const formerEmployees = formattedEmployees.filter(

(employee:any)=>

employee.status?.toLowerCase()!=="active"

);







//
// Group divisions
//

const divisionGroups:any={};


for(const employee of activeEmployees){


if(!divisionGroups[employee.division]){

divisionGroups[employee.division]=[];

}



divisionGroups[employee.division].push(employee);



}






return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-7xl
mx-auto
px-6
">



<div className="
bg-white
border
shadow-2xl
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
md:p-14
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
gap-6
mt-5
">


<div>

<h1 className="
text-5xl
font-black
">

Employee Management System

</h1>



<p className="
mt-4
text-blue-100
text-lg
">

Manage DHS personnel, assignments and workforce records.

</p>


</div>




<Link

href="/staff/employees/create"

className="
bg-[#F2C94C]
text-[#003B6F]
px-7
py-4
font-black
hover:scale-105
transition
"

>

+ Add Employee

</Link>



</div>


</header>





<section className="
p-10
md:p-14
">


<div className="
grid
md:grid-cols-3
gap-6
">


<Stat

title="Active Personnel"

value={String(activeEmployees.length)}

/>



<Stat

title="Former Staff"

value={String(formerEmployees.length)}

/>



<Stat

title="Divisions"

value={String(Object.keys(divisionGroups).length)}

/>



</div>





<div className="
mt-12
">

<EmployeeSearch

employees={activeEmployees}

/>

</div>

function DivisionSection({

division,

employees

}:{

division:string;

employees:any[];

}){


const pages = Math.ceil(employees.length / 10);



return (

<section>


<div className="
border-l-4
border-[#F2C94C]
pl-5
mb-8
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

{division}

</h2>



<p className="
mt-2
text-gray-500
font-semibold
">

{employees.length} Personnel Assigned

</p>


</div>





<div className="
grid
md:grid-cols-2
gap-6
">


{

employees.slice(0,10).map((employee:any)=>(


<EmployeeCard

key={employee.id}

employee={employee}

/>


))


}



</div>





{

pages > 1 && (


<div className="
mt-8
flex
gap-3
flex-wrap
">

{

Array.from({

length:pages

}).map((_,index)=>(


<button

key={index}

className="
px-4
py-2
bg-[#003B6F]
text-white
font-bold
hover:bg-[#005AA7]
transition
"

>

{index+1}

</button>


))


}

</div>


)

}



</section>


);


}







function Stat({

title,

value

}:{

title:string;

value:string;

}){


return (

<div className="
bg-[#F5F8FB]
border
p-6
shadow-sm
">


<p className="
uppercase
tracking-widest
text-xs
font-bold
text-gray-500
">

{title}

</p>



<p className="
mt-3
text-4xl
font-black
text-[#003B6F]
">

{value}

</p>


</div>

);


}








function EmployeeCard({

employee,

former=false

}:{

employee:any;

former?:boolean;

}){


return (

<div className={`

bg-white

border

shadow-sm

p-6

flex

items-center

gap-5

hover:shadow-xl

transition

${former ? "opacity-70" : ""}

`}>




<div className="
w-20
h-20
rounded-full
bg-[#003B6F]
border-4
border-[#F2C94C]
text-white
flex
items-center
justify-center
font-black
text-3xl
">

{

employee.roblox_username
?.charAt(0)
||
"?"

}

</div>







<div className="
flex-1
">


<h3 className="
text-xl
font-black
text-[#003B6F]
">

{employee.roblox_username}

</h3>




<p className="
text-gray-700
font-semibold
">

{employee.position}

</p>





<p className="
text-sm
text-gray-500
">

{employee.employee_number}

</p>





<div className="
flex
gap-3
mt-3
flex-wrap
">


<span className={`

px-3

py-1

text-xs

font-black

rounded

${

former

?

"bg-red-100 text-red-700"

:

"bg-green-100 text-green-700"

}

`}>

{employee.status}

</span>




<span className="
px-3
py-1
text-xs
font-bold
bg-blue-100
text-blue-700
rounded
">

{employee.division}

</span>



</div>




</div>







<Link

href={`/staff/employees/${employee.id}`}

className="
bg-[#003B6F]
text-white
px-5
py-2
font-black
hover:bg-[#005AA7]
transition
"

>

View

</Link>




</div>


);


}

function DivisionSection({

division,

employees

}:{

division:string;

employees:any[];

}){


return (

<section>


<div className="
border-l-4
border-[#F2C94C]
pl-5
mb-8
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

{division}

</h2>



<p className="
mt-2
text-gray-500
font-semibold
">

{employees.length} Personnel Assigned

</p>


</div>





<EmployeePagination

division={division}

employees={employees}

/>



</section>


);


}









function EmployeePagination({

division,

employees

}:{

division:string;

employees:any[];

}){


const perPage = 10;


const totalPages = Math.ceil(

employees.length / perPage

);




return (

<div>


{

Array.from({

length:totalPages

}).map((_,index)=>{


const page = index + 1;



return (

<div

key={page}

className={

index === 0

?

"block"

:

"hidden"

}

>



<div className="
grid
md:grid-cols-2
gap-6
">


{

employees

.slice(

index * perPage,

(index + 1) * perPage

)

.map((employee:any)=>(


<EmployeeCard

key={employee.id}

employee={employee}

/>


))


}


</div>





{

totalPages > 1 && (


<div className="
mt-8
flex
gap-3
flex-wrap
">


{

Array.from({

length:totalPages

}).map((_,button)=>{


return (

<Link

key={button}

href={`/staff/employees?division=${encodeURIComponent(division)}&page=${button+1}`}

className="
px-5
py-2
bg-[#003B6F]
text-white
font-black
hover:bg-[#005AA7]
transition
"

>

{button+1}

</Link>


)


})


}


</div>


)


}



</div>


)


})


}



</div>


);


}
