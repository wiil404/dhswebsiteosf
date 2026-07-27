import Link from "next/link";


export default function EmployeeCard({

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

employee.roblox_username?.charAt(0)
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
">

<span className="
px-3
py-1
text-xs
font-black
rounded
bg-green-100
text-green-700
">

{employee.status}

</span>


<span className="
px-3
py-1
text-xs
font-bold
rounded
bg-blue-100
text-blue-700
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
