import Link from "next/link";
import { supabaseAdmin } from "@/app/lib/supabase-admin";

import EmployeeSearch from "./EmployeeSearch";
import EmployeePagination from "./EmployeePagination";
import EmployeeCard from "./EmployeeCard";

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





const {data:divisionsData}=await supabaseAdmin

.from("divisions")

.select(`

id,

name

`)

.order(
"name"
);






const {data:positionsData}=await supabaseAdmin

.from("positions")

.select(`

id,

title

`);






const divisionMap:any = {};

for(const division of divisionsData || []){

    divisionMap[division.id] = division.name;

}

const positionMap:any = {};

for(const position of positionsData || []){

    positionMap[position.id] = position.title;

}






const formattedEmployees = (employees || [])

.map((employee:any)=>({

    ...employee,

    division:
    divisionMap[employee.division_id] || null,

    position:
    positionMap[employee.position_id] || "No Position"

}));








const activeEmployees = formattedEmployees.filter(

(employee:any)=>

employee.status?.toLowerCase()==="active"
&&
employee.division

);





const formerEmployees = formattedEmployees.filter(

(employee:any)=>

employee.status?.toLowerCase() !== "active"

);







const divisionGroups:any={};


for(const employee of activeEmployees){

if(!employee.division){

continue;

}


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





<div className="
mt-16
space-y-16
">


{

Object.entries(divisionGroups).map(

([division,staff]:any)=>(

<DivisionSection

key={division}

division={division}

employees={staff}

/>

)

)

}


</div>

id="part2"
{

formerEmployees.length > 0 && (

<section className="
mt-20
">


<div className="
border-l-4
border-red-500
pl-5
mb-8
">


<h2 className="
text-4xl
font-black
text-red-700
">

Former DHS Personnel

</h2>



<p className="
text-gray-500
mt-2
">

Inactive employees and previous Department members.

</p>


</div>





<div className="
grid
md:grid-cols-2
gap-6
">


{

formerEmployees.map((employee:any)=>(

<EmployeeCard

key={employee.id}

employee={employee}

former={true}

/>

))


}


</div>


</section>

)

}



</section>


</div>


</section>


</main>


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

employees={employees}

/>


</section>


);


}
