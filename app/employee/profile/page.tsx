import { redirect } from "next/navigation";

import { getEmployeeSession } from "@/app/lib/employee-auth";

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







export default async function EmployeeProfile(){


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
border
shadow-2xl
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

Employee Profile

</h1>




<p className="
mt-3
text-blue-100
">

Official personnel record

</p>



</div>









<div className="
p-10
md:p-14
">







{/* ID CARD */}



<div className="
bg-[#003B6F]
text-white
p-10
shadow-xl
flex
flex-col
md:flex-row
gap-10
items-center
">





<div className="
relative
w-44
h-44
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

Employee Identification

</p>





<h2 className="
text-4xl
font-black
mt-3
">

{employee.roblox_username}

</h2>




<p className="
text-xl
text-blue-100
mt-2
">

{employee.positions?.title || "Employee"}

</p>





<div className="
mt-6
flex
flex-wrap
gap-4
">


<span className="
bg-green-500/20
border
border-green-300
px-5
py-2
font-bold
">

ACTIVE

</span>




<span className="
bg-white/10
px-5
py-2
font-bold
">

{employee.employee_number || "No Number"}

</span>



</div>



</div>




</div>









{/* INFORMATION */}



<section className="
mt-14
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Personal Information

</h2>





<div className="
grid
md:grid-cols-3
gap-6
mt-8
">



<Info

title="Roblox Username"

value={employee.roblox_username}

/>



<Info

title="Roblox ID"

value={String(employee.roblox_user_id)}

/>



<Info

title="Employee Number"

value={employee.employee_number || "Pending"}

/>



<Info

title="Division"

value={employee.divisions?.name || "Unknown"}

/>



<Info

title="Position"

value={employee.positions?.title || "Unknown"}

/>



<Info

title="Employment Status"

value={employee.status}

/>



</div>


</section>









{/* SERVICE HISTORY */}



<section className="
mt-14
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Service History

</h2>





<div className="
mt-8
border
bg-[#F5F8FB]
p-8
">


<div className="
grid
md:grid-cols-2
gap-6
">



<Info

title="Date Joined"

value={

employee.hire_date

?

new Date(employee.hire_date)
.toLocaleDateString()

:

new Date(employee.created_at)
.toLocaleDateString()

}

/>






<Info

title="Appointment Date"

value={

employee.appointment_date

?

new Date(employee.appointment_date)
.toLocaleDateString()

:

"Not recorded"

}

/>





</div>


</div>



</section>









{/* CAREER */}



<section className="
mt-14
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Career Development

</h2>





<div className="
grid
md:grid-cols-3
gap-6
mt-8
">





<Card

title="Promotions"

value="View History"

/>





<Card

title="Awards"

value="View Recognition"

/>





<Card

title="Appointments"

value="View Record"

/>





</div>



</section>









{/* SECURITY */}



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

Personnel Record Notice

</h3>



<p className="
mt-3
text-gray-700
leading-relaxed
">

This profile is generated from official Department of Homeland Security employment records. Information displayed is limited to the authenticated employee and approved personnel information.

</p>



</section>







</div>


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
bg-white
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
font-black
text-[#003B6F]
">

{value}

</p>


</div>

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
border
bg-[#F5F8FB]
p-7
">


<h3 className="
text-xl
font-black
text-[#003B6F]
">

{title}

</h3>


<p className="
mt-3
text-gray-700
font-bold
">

{value}

</p>


</div>


);


}
