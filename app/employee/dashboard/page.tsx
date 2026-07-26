import { redirect } from "next/navigation";
import { getEmployeeSession } from "@/app/lib/employee-auth";
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







{/* HEADER */}


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









{/* PROFILE CARD */}



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









{/* STATS */}


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









{/* ACCESS */}



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



<p className="
mt-3
text-gray-600
">

Access department resources, documents, and personal records.

</p>






<div className="
grid
md:grid-cols-3
gap-8
mt-8
">





<Action

href="/employee/profile"

title="My Profile"

description="View your employee record, history, awards, and appointments."

/>






<Action

href="/employee/contracts"

title="My Contracts"

description="Review agreements, appointments, and signed documents."

/>






<Action

href="/employee/policies"

title="Department Policies"

description="Access policies and documents available to your division."

/>



</div>


</section>









{/* SECURITY NOTICE */}


<section className="
mt-14
border-l-4
border-[#F2C94C]
bg-[#F5F8FB]
p-8
">


<h3 className="
text-2xl
font-black
text-[#003B6F]
">

Employee Portal Security

</h3>



<p className="
mt-3
text-gray-700
">

This portal provides access to official Department of Homeland Security employee resources. Information displayed is based on your verified Roblox identity and current employment record.

</p>



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
group
"


>


<h3 className="
text-2xl
font-black
text-[#003B6F]
group-hover:text-[#005AA7]
">

{title}

</h3>




<p className="
mt-3
text-gray-600
leading-relaxed
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
