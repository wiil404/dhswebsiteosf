import { redirect } from "next/navigation";
import Link from "next/link";

import { supabaseAdmin } from "@/app/lib/supabase-admin";



export const dynamic = "force-dynamic";

export const revalidate = 0;



export default async function EmployeeProfilePage({

params

}:{

params: Promise<{
id:string
}>

}){


const {id}=await params;



const {data:employee,error}=await supabaseAdmin

.from("employees")

.select(`

*,

positions(
    title
),

divisions(
    name
)

`)

.eq(
"id",
id
)

.single();






if(error || !employee){


return (

<main className="
min-h-screen
bg-[#F5F8FB]
p-16
">


<h1 className="
text-4xl
font-black
text-[#003B6F]
">

Employee Not Found

</h1>


</main>

);


}







return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-5xl
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
">


<p className="
uppercase
tracking-[0.35em]
text-[#F2C94C]
font-black
text-sm
">

Department of Homeland Security

</p>



<h1 className="
text-5xl
font-black
mt-4
">

{employee.roblox_username}

</h1>



<p className="
mt-3
text-blue-100
text-xl
">

Employee Record

</p>


</header>









<section className="
p-10
">


<div className="
grid
md:grid-cols-2
gap-6
">



<Info

title="Employee Number"

value={
employee.employee_number
}

/>



<Info

title="Status"

value={
employee.status
}

/>



<Info

title="Division"

value={
employee.divisions?.name ||
"Unknown"
}

/>



<Info

title="Position"

value={
employee.positions?.title ||
"Unknown"
}

/>



<Info

title="Roblox Username"

value={
employee.roblox_username
}

/>



<Info

title="Roblox ID"

value={
String(employee.roblox_user_id)
}

/>



</div>









<section className="
mt-12
flex
gap-4
flex-wrap
">


<Link

href={`/staff/employees/${employee.id}/edit`}

className="
bg-[#003B6F]
text-white
px-6
py-3
font-black
hover:bg-[#005AA7]
transition
"

>

Edit Employee

</Link>





<Link

href="/staff/employees"

className="
bg-[#F2C94C]
text-[#003B6F]
px-6
py-3
font-black
"

>

Back To Registry

</Link>



</section>







<section className="
mt-12
border-l-4
border-[#F2C94C]
bg-[#F5F8FB]
p-6
">


<h2 className="
text-2xl
font-black
text-[#003B6F]
">

Personnel Notes

</h2>



<p className="
mt-3
text-gray-700
">

{
employee.notes ||
"No personnel notes recorded."
}

</p>


</section>





</section>





</div>


</section>


</main>

);


}







function Info({

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
mt-3
text-xl
font-black
text-[#003B6F]
">

{value || "Unknown"}

</p>



</div>


);


}
