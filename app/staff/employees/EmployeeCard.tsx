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

rounded-xl

p-6

flex

items-center

gap-5

hover:shadow-xl

transition-all

duration-300

${former ? "opacity-70" : ""}

`}>



<div className="
w-20
h-20
min-w-20
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
shadow-md
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
text-gray-700
font-semibold
mt-1
truncate
">

{employee.position || "No Position"}

</p>





<p className="
text-sm
text-gray-500
mt-1
">

{employee.employee_number}

</p>







<div className="
flex
gap-3
mt-4
flex-wrap
">


<span className={`
px-3
py-1
text-xs
font-black
rounded-full

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
rounded-full
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
py-3
rounded-lg
font-black
hover:bg-[#005AA7]
transition
flex-shrink-0
"

>

View

</Link>



</div>


);


}
