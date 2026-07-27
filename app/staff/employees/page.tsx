import Link from "next/link";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import EmployeeSearch from "./EmployeeSearch";


export const dynamic = "force-dynamic";
export const revalidate = 0;




export default async function StaffEmployeesPage(){



//
// Get employees
//

const {data:employees,error}=await supabaseAdmin

.from("employees")

.select(`

id,

roblox_username,

roblox_user_id,

employee_number,

status,

division_id,

position_id,

positions(
    title
)

`)

.order(
"roblox_username"
);





if(error){

console.error(
"EMPLOYEE ERROR:",
error
);

}







//
// Get divisions separately
//

const {data:divisionData}=await supabaseAdmin

.from("divisions")

.select(`

id,

name

`);






const divisionMap:any = {};



for(const division of divisionData || []){


divisionMap[division.id] = division.name;


}









//
// Separate active/former staff
//

const activeStaff =

(employees || []).filter(

(employee:any)=>

employee.status === "Active"

);





const formerStaff =

(employees || []).filter(

(employee:any)=>

employee.status !== "Active"

);









//
// Group active employees by division
//

const divisions:any = {};




for(const employee of activeStaff){


const divisionName =

divisionMap[employee.division_id] ||

"Unassigned";




if(!divisions[divisionName]){


divisions[divisionName]=[];

}



divisions[divisionName].push(employee);



}










const totalEmployees =

employees?.length || 0;



const activeEmployees =

activeStaff.length;



const formerEmployees =

formerStaff.length;



const divisionCount =

Object.keys(divisions).length;










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

Manage DHS personnel records, assignments and workforce information.

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
md:grid-cols-4
gap-6
">



<Stat

title="Total Personnel"

value={String(totalEmployees)}

/>





<Stat

title="Active Staff"

value={String(activeEmployees)}

/>





<Stat

title="Former Staff"

value={String(formerEmployees)}

/>





<Stat

title="Divisions"

value={String(divisionCount)}

/>



</div>







<div className="
mt-12
">

<EmployeeSearch

employees={employees || []}

/>

</div>







<div className="
mt-16
space-y-14
">







{

Object.entries(divisions).map(

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












{

formerStaff.length > 0 && (


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
text-3xl
font-black
text-[#003B6F]
">

Former DHS Personnel

</h2>




<p className="
text-gray-500
mt-2
">

Inactive and separated employees.

</p>



</div>





<div className="
grid
md:grid-cols-2
gap-6
">


{

formerStaff.map(

(employee:any)=>(


<EmployeeCard

key={employee.id}

employee={employee}

former

divisionName={
divisionMap[employee.division_id] ||
"Unknown Division"
}

/>


)


)


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









function DivisionSection({

division,

employees

}:{

division:string;

employees:any[];

}){



const pageSize = 12;



const pages = Math.ceil(

employees.length / pageSize

);






return (

<section>


<div className="
border-l-4
border-[#F2C94C]
pl-5
mb-8
">


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

{division}

</h2>



<p className="
text-gray-500
mt-2
">

{employees.length} Personnel

</p>



</div>





<div className="
grid
md:grid-cols-2
gap-6
">



{

employees

.slice(
0,
pageSize
)

.map(

(employee:any)=>(


<EmployeeCard

key={employee.id}

employee={employee}

divisionName={division}

/>


)


)



}



</div>







{

employees.length > pageSize && (


<div className="
mt-8
bg-[#F5F8FB]
border
p-5
text-center
">




<p className="
font-bold
text-[#003B6F]
">

This division contains {employees.length} members across {pages} pages.

</p>



<p className="
text-sm
text-gray-500
mt-2
">

Use the division search filter above to quickly locate personnel.

</p>




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
text-4xl
font-black
text-[#003B6F]
mt-3
">

{value}

</p>



</div>


);


}


function EmployeeCard({

employee,

former,

divisionName

}:{

employee:any;

former?:boolean;

divisionName:string;

}){



return (

<div className={`
bg-white
border
shadow-sm
p-6
hover:shadow-xl
transition
flex
gap-5
items-center
${former ? "opacity-75" : ""}
`}>



<div className="
w-20
h-20
rounded-full
bg-gradient-to-br
from-[#003B6F]
to-[#005AA7]
text-white
flex
items-center
justify-center
font-black
text-3xl
border-4
border-[#F2C94C]
shrink-0
">

{

employee.roblox_username
?.charAt(0)

}

</div>








<div className="
flex-1
min-w-0
">





<h3 className="
text-xl
font-black
text-[#003B6F]
truncate
">

{employee.roblox_username}

</h3>






<p className="
text-gray-600
font-semibold
">

{

employee.positions?.[0]?.title ||

"No Position"

}

</p>







<p className="
text-sm
text-gray-500
mt-1
">

{divisionName}

</p>







<p className="
text-sm
text-gray-500
">

{employee.employee_number}

</p>







<span className={`
inline-block
mt-3
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

{

former

?

"FORMER STAFF"

:

employee.status

}


</span>





</div>








<Link

href={`/staff/employees/${employee.id}`}

className="
bg-[#003B6F]
text-white
px-5
py-3
font-black
hover:bg-[#005AA7]
transition
shrink-0
"

>

View

</Link>





</div>

);


}
