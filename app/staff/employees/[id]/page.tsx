import Link from "next/link";

import { redirect } from "next/navigation";

import { supabaseAdmin } from "../../../lib/supabase-admin";


export const dynamic = "force-dynamic";
export const revalidate = 0;



async function getRobloxAvatar(userId:string){

    try{

        const response = await fetch(
            `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=true`,
            {
                cache:"no-store"
            }
        );


        const data = await response.json();

        return data?.data?.[0]?.imageUrl || null;


    }catch{

        return null;

    }

}







export default async function EmployeeProfile({

params

}:{

params:Promise<{
id:string
}>

}){


const {id}=await params;




const {

data:employee,

error

}=await supabaseAdmin

.from("employees")

.select(`

*

,

positions(
title
)

,

divisions(
name
)

,

employee_awards(
id,
award_name,
description,
awarded_date
)

,

employment_history!employment_history_employee_id_fkey(

id,

action,

notes,

effective_date,

created_at,

old_position:positions!employment_history_old_position_fkey(
title
),

new_position:positions!employment_history_new_position_fkey(
title
),

old_division:divisions!employment_history_old_division_fkey(
name
),

new_division:divisions!employment_history_new_division_fkey(
name
)

)

,

disciplinary_records(
id,
description,
created_at
)

,

contracts(
id,
title,
contract_number,
status,
employee_signed,
executive_signed,
created_at
)

`)

.eq(
"id",
id
)

.single();






if(error || !employee){


return (

<main className="p-12">

<h1 className="text-3xl font-bold">

Employee Not Found

</h1>


</main>

);

}





const avatar = employee.roblox_user_id

?

await getRobloxAvatar(
employee.roblox_user_id
)

:

null;







return (

<main className="
max-w-7xl
mx-auto
px-6
py-12
">





<section className="
bg-[#003B6F]
text-white
rounded-lg
shadow-xl
p-8
">





<Link

href="/staff/employees"

className="
inline-block
bg-[#F2C94C]
text-[#003B6F]
px-6
py-3
rounded
font-black
hover:scale-105
transition
"

>

← Return to Employee Registry

</Link>






<div className="
flex
items-center
gap-8
mt-8
">





{

avatar ?

<img

src={avatar}

alt="Avatar"

className="
w-36
h-36
rounded-full
border-4
border-white
"

/>

:

<div

className="
w-36
h-36
rounded-full
bg-white
text-[#003B6F]
flex
items-center
justify-center
text-5xl
font-bold
"

>

{employee.roblox_username?.charAt(0)}

</div>

}








<div>


<p className="
uppercase
tracking-widest
text-sm
opacity-80
">

Department of Homeland Security

</p>



<h1 className="
text-5xl
font-bold
mt-2
">

{employee.roblox_username}

</h1>



<h2 className="
text-2xl
mt-2
">

{employee.positions?.title || "No Position Assigned"}

</h2>




<p>

{employee.divisions?.name || "No Division Assigned"}

</p>



<p className="
mt-2
text-blue-100
font-bold
">

Employee Number:

{" "}

{employee.employee_number || "Pending"}

</p>



</div>


</div>







<div className="
mt-8
flex
gap-4
flex-wrap
">



<Link

href={`/staff/employees/${id}/edit`}

className="
bg-white
text-[#003B6F]
px-5
py-3
rounded
font-bold
"

>

Edit Profile

</Link>




<Link

href={`/staff/employees/${id}/promote`}

className="
bg-yellow-500
text-black
px-5
py-3
rounded
font-bold
"

>

Promote

</Link>




<Link

href={`/staff/employees/${id}/demote`}

className="
bg-orange-500
text-white
px-5
py-3
rounded
font-bold
"

>

Demote

</Link>





</div>


</section>









<div className="
grid
md:grid-cols-3
gap-6
mt-10
">



<InfoCard

title="Identity"

items={[

`Roblox ID: ${employee.roblox_user_id || "N/A"}`,

`Employee Number: ${employee.employee_number || "N/A"}`

]}

/>




<InfoCard

title="Assignment"

items={[

`Position: ${employee.positions?.title || "N/A"}`,

`Division: ${employee.divisions?.name || "N/A"}`,

`Status: ${employee.status || "Unknown"}`

]}

/>




<InfoCard

title="Account"

items={[

`Joined: ${
employee.created_at
?
new Date(employee.created_at).toLocaleDateString()
:
"N/A"
}`

]}

/>



</div>










<section className="
mt-10
border
rounded-lg
bg-white
shadow-sm
p-6
">


<h2 className="
text-2xl
font-bold
text-[#003B6F]
">

Employment Contracts

</h2>





<div className="
mt-6
space-y-4
">


{

employee.contracts?.length ?

employee.contracts.map((contract:any)=>(


<div

key={contract.id}

className="
border
bg-[#F5F8FB]
p-5
flex
justify-between
items-center
"

>


<div>


<h3 className="
font-bold
text-lg
text-[#003B6F]
">

{contract.title}

</h3>



<p className="
text-sm
text-gray-500
">

{contract.contract_number}

</p>



<span className="
inline-block
mt-3
bg-white
border
px-3
py-1
font-bold
text-sm
">

{

contract.employee_signed && contract.executive_signed

?

"Completed"

:

contract.employee_signed

?

"Awaiting Executive Signature"

:

"Pending Employee Signature"

}

</span>


</div>






<Link

href={`/staff/contracts/${contract.id}`}

className="
bg-[#003B6F]
text-white
px-5
py-3
font-bold
"

>

View Contract

</Link>



</div>


))


:

<p className="
text-gray-500
">

No contracts assigned.

</p>


}


</div>


</section>








</main>

);

}







function InfoCard({

title,

items

}:{

title:string;

items:string[];

}){


return (

<div className="
border
rounded-lg
p-6
bg-white
shadow-sm
">


<h2 className="
font-bold
text-xl
text-[#003B6F]
">

{title}

</h2>



<div className="
mt-4
space-y-2
text-gray-600
">

{

items.map((item,index)=>(

<p key={index}>

{item}

</p>

))

}

</div>


</div>

);

}
