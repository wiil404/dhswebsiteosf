import Link from "next/link";
import Image from "next/image";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import EmployeeSearch from "./EmployeeSearch";

export const dynamic = "force-dynamic";
export const revalidate = 0;



async function getRobloxAvatar(id:number){

    try{

        const response = await fetch(

            `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=420x420&format=Png&isCircular=true`,

            {
                cache:"no-store"
            }

        );


        const data = await response.json();


        return data.data?.[0]?.imageUrl || null;


    }catch{

        return null;

    }

}




export default async function StaffEmployeesPage(){


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
),

divisions(
id,
name
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






const divisions:any = {};



for(const employee of employees || []){


const divisionName =

employee.divisions?.name ||

"Unassigned";



if(!divisions[divisionName]){

divisions[divisionName]=[];

}



divisions[divisionName].push(employee);


}






const totalEmployees =
employees?.length || 0;



const activeEmployees =

employees?.filter(

(e:any)=>
e.status==="Active"

).length || 0;






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
md:grid-cols-3
gap-6
">


<Stat

title="Total Personnel"

value={String(totalEmployees)}

/>



<Stat

title="Active Employees"

value={String(activeEmployees)}

/>



<Stat

title="Divisions"

value={String(Object.keys(divisions).length)}

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
mt-14
space-y-12
">





{

Object.entries(divisions).map(

([division,staff]:any)=>(


<section

key={division}

>



<div className="
border-l-4
border-[#F2C94C]
pl-5
mb-6
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
mt-1
">

{staff.length} Personnel

</p>


</div>







<div className="
grid
md:grid-cols-2
gap-6
">



{

staff.map(

(employee:any)=>(


<EmployeeCard

key={employee.id}

employee={employee}

/>


)

)



}


</div>



</section>



)


)


}



</div>









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

employee

}:{

employee:any;

}){


return (

<div className="
bg-white
border
shadow-sm
p-6
hover:shadow-xl
transition
flex
gap-5
items-center
">



<div className="
w-20
h-20
rounded-full
bg-[#003B6F]
text-white
flex
items-center
justify-center
font-black
text-3xl
border-4
border-[#F2C94C]
">

{employee.roblox_username?.charAt(0)}

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
text-gray-600
">

{employee.positions?.title || "No Position"}

</p>



<p className="
text-sm
text-gray-500
">

{employee.employee_number}

</p>





<span className="
inline-block
mt-3
px-3
py-1
text-xs
font-bold
bg-green-100
text-green-700
">

{employee.status}

</span>



</div>







<Link

href={`/staff/employees/${employee.id}`}

className="
bg-[#003B6F]
text-white
px-4
py-2
font-bold
"

>

View

</Link>



</div>


);


}
