import { redirect } from "next/navigation";

import { getEmployeeSession } from "@/app/lib/employee-auth";

import Link from "next/link";



export default async function EmployeeDashboard(){


const session = await getEmployeeSession();



if(!session){

    redirect("/employee/login");

}



const employee = session.employees;



return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-6xl
mx-auto
px-6
">


<div className="
bg-white
shadow-xl
border
overflow-hidden
">


<div className="
h-3
bg-[#F2C94C]
"/>



<div className="
bg-gradient-to-r
from-[#003B6F]
to-[#005AA7]
text-white
p-10
">


<p className="
uppercase
tracking-[0.3em]
text-sm
text-[#F2C94C]
font-black
">

Department of Homeland Security

</p>



<h1 className="
text-5xl
font-black
mt-4
">

Employee Portal

</h1>



<p className="
mt-3
text-blue-100
">

Welcome back, {employee.roblox_username}

</p>


</div>






<div className="
p-10
">


<div className="
grid
md:grid-cols-4
gap-6
">


<Card

title="Employee Number"

value={
employee.employee_number || "Pending"
}

/>



<Card

title="Position"

value={
employee.positions?.title || "Unknown"
}

/>



<Card

title="Division"

value={
employee.divisions?.name || "Unknown"
}

/>



<Card

title="Status"

value={
employee.status
}

/>


</div>









<h2 className="
text-3xl
font-black
text-[#003B6F]
mt-14
">

Quick Access

</h2>





<div className="
grid
md:grid-cols-3
gap-6
mt-8
">


<Action

href="/employee/profile"

title="My Profile"

description="View your employee record and history."

/>




<Action

href="/employee/contracts"

title="My Contracts"

description="Review agreements and signed documents."

/>





<Action

href="/employee/policies"

title="Department Policies"

description="Access policies available to employees."

/>



</div>





</div>


</div>


</section>


</main>


);

}




function Card({

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
text-xs
uppercase
tracking-widest
font-bold
text-gray-500
">

{title}

</p>


<p className="
mt-3
text-xl
font-black
text-[#003B6F]
">

{value}

</p>


</div>

);


}





function Action({

href,

title,

description

}:{

href:string;

title:string;

description:string;

}){


return (

<Link

href={href}

className="
border
p-7
hover:shadow-lg
transition
bg-white
"


>


<h3 className="
text-xl
font-black
text-[#003B6F]
">

{title}

</h3>


<p className="
mt-3
text-gray-600
">

{description}

</p>


</Link>

);


}