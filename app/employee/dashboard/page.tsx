import { redirect } from "next/navigation";
import { getEmployeeSession } from "@/app/lib/employee-auth";
import { supabaseAdmin } from "@/app/lib/supabase-admin";

import Link from "next/link";
import Image from "next/image";



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


    }

    catch{

        return null;

    }

}




export default async function EmployeeDashboard(){


const session = await getEmployeeSession();



if(!session){

    redirect("/employee/login");

}



const employee = session.employees;



const avatar = await getRobloxAvatar(
    employee.roblox_user_id
);






//
// REQUIRED POLICIES
//

const {data:policies}=await supabaseAdmin

.from("policies")

.select(`

id,

title,

category,

scope,

division_id,

created_at

`)

.eq(

"status",

"Approved"

)

.order(

"created_at",

{

ascending:false

}

);







const employeePolicies =

policies?.filter((policy:any)=>{


return (

policy.scope==="UNIVERSAL"

||

policy.division_id===employee.division_id

);


}) || [];






const {data:acknowledgements}=await supabaseAdmin

.from("policy_acknowledgements")

.select(`

policy_id

`)

.eq(

"employee_id",

employee.id

);





const acknowledged = new Set(

acknowledgements?.map(

(item:any)=>

item.policy_id

)

);






const requiredPolicies = employeePolicies.filter(

(policy:any)=>

!acknowledged.has(policy.id)

);







const recentPolicies = employeePolicies.slice(0,5);








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
shadow-2xl
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
text-lg
">

Official DHS workforce access portal

</p>


</div>









<div className="
p-10
md:p-14
">







<div className="
bg-[#003B6F]
text-white
p-8
shadow-xl
flex
flex-col
md:flex-row
items-center
gap-8
">





<div className="
relative
w-40
h-40
rounded-full
overflow-hidden
border-4
border-[#F2C94C]
bg-white/20
">


{

avatar && (

<Image

src={avatar}

alt="Employee Avatar"

fill

className="object-cover"

/>

)

}


</div>







<div>


<p className="
uppercase
tracking-widest
text-sm
text-blue-200
font-bold
">

Employee Record

</p>



<h2 className="
text-4xl
font-black
mt-2
">

{employee.roblox_username}

</h2>




<p className="
mt-2
text-xl
text-blue-100
">

{employee.positions?.title || "Employee"}

</p>





<div className="
mt-5
flex
gap-4
flex-wrap
">


<span className="
bg-green-500/20
border
border-green-300
px-5
py-2
font-bold
">

✓ ACTIVE

</span>



<span className="
bg-white/10
px-5
py-2
font-bold
">

{employee.employee_number || "Pending"}

</span>



</div>


</div>


</div>









<div className="
grid
md:grid-cols-4
gap-6
mt-10
">



<Card

title="Division"

value={
employee.divisions?.name || "Unknown"
}

/>



<Card

title="Position"

value={
employee.positions?.title || "Unknown"
}

/>



<Card

title="Roblox ID"

value={
String(employee.roblox_user_id)
}

/>



<Card

title="Status"

value={
employee.status
}

/>



</div>









{/* REQUIRED ACTIONS */}


<section className="
mt-14
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Required Actions

</h2>




{

requiredPolicies.length > 0

?

<div className="
mt-6
bg-yellow-50
border
border-yellow-300
p-6
">


<p className="
font-black
text-yellow-800
">

⚠ {requiredPolicies.length} policy acknowledgement(s) required

</p>



<Link

href="/employee/policies"

className="
inline-block
mt-4
bg-[#003B6F]
text-white
px-6
py-3
font-bold
"

>

Review Policies

</Link>


</div>


:

<div className="
mt-6
bg-green-50
border
border-green-300
p-6
font-bold
text-green-800
">

✓ No outstanding actions

</div>


}



</section>









{/* RECENT POLICIES */}


<section className="
mt-14
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Recent Policies

</h2>



<div className="
grid
md:grid-cols-2
gap-6
mt-8
">


{

recentPolicies.map((policy:any)=>(


<Link

key={policy.id}

href={`/employee/policies/${policy.id}`}

className="
border
bg-white
p-6
hover:shadow-xl
transition
"

>


<h3 className="
text-xl
font-black
text-[#003B6F]
">

{policy.title}

</h3>



<p className="
mt-2
text-gray-600
">

{policy.category || "Department Policy"}

</p>


</Link>


))


}



</div>


</section>









{/* RESOURCES */}


<section className="
mt-14
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Employee Resources

</h2>




<div className="
grid
md:grid-cols-3
gap-8
mt-8
">



<Action

href="/employee/profile"

title="My Profile"

description="View your employee record and information."

/>



<Action

href="/employee/contracts"

title="My Contracts"

description="Review agreements and appointments."

/>



<Action

href="/employee/policies"

title="Department Policies"

description="Access policies available to you."

/>



</div>


</section>







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
bg-white
border
shadow-sm
p-8
hover:shadow-xl
transition
"

>


<h3 className="
text-2xl
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


<div className="
mt-5
font-bold
text-[#003B6F]
">

Open →

</div>


</Link>

);


}
