import { redirect } from "next/navigation";

import Image from "next/image";

import { getEmployeeSession } from "@/app/lib/employee-auth";

import { supabaseAdmin } from "@/app/lib/supabase-admin";




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







const {

    data: awards

} = await supabaseAdmin

.from("employee_awards")

.select("*")

.eq(

"employee_id",

employee.id

)

.order(

"created_at",

{

ascending:false

}

);








const {

    data: promotions

} = await supabaseAdmin

.from("promotions")

.select("*")

.eq(

"employee_id",

employee.id

)

.order(

"created_at",

{

ascending:false

}

);








const {

    data: history

} = await supabaseAdmin

.from("employee_history")

.select("*")

.eq(

"employee_id",

employee.id

)

.order(

"created_at",

{

ascending:false

}

);








const {

    data: employmentHistory

} = await supabaseAdmin

.from("employment_history")

.select("*")

.eq(

"employee_id",

employee.id

)

.order(

"created_at",

{

ascending:false

}

);









return (

<main

className="
min-h-screen
bg-[#F5F8FB]
py-16
"


>


<section

className="
max-w-7xl
mx-auto
px-6
"


>


<div

className="
bg-white
shadow-2xl
border
overflow-hidden
"


>


<div

className="
h-3
bg-[#F2C94C]
"

/>








<div

className="
bg-gradient-to-r
from-[#003B6F]
to-[#005AA7]
text-white
p-10
md:p-14
"


>


<p

className="
uppercase
tracking-[0.35em]
text-[#F2C94C]
font-black
text-sm
"


>

Department of Homeland Security

</p>







<h1

className="
text-5xl
font-black
mt-4
"


>

Employee Profile

</h1>







<p

className="
mt-3
text-blue-100
"


>

Official personnel record

</p>



</div>









<div

className="
p-10
md:p-14
"


>









<div

className="
bg-[#003B6F]
text-white
p-10
shadow-xl
flex
flex-col
md:flex-row
items-center
gap-10
"


>







<div

className="
relative
w-44
h-44
rounded-full
overflow-hidden
border-4
border-[#F2C94C]
bg-white/20
"


>


{

avatar && (


<Image

src={avatar}

alt="Employee Avatar"

fill

className="
object-cover
"

/>


)

}



</div>









<div>


<p

className="
uppercase
tracking-widest
text-sm
text-blue-200
font-bold
"


>

Employee Identification

</p>







<h2

className="
text-4xl
font-black
mt-3
"


>

{employee.roblox_username}

</h2>







<p

className="
text-xl
text-blue-100
mt-2
"


>

{employee.positions?.title || "Employee"}

</p>







<div

className="
mt-6
flex
gap-4
flex-wrap
"


>


<span

className="
bg-green-500/20
border
border-green-300
px-5
py-2
font-bold
"


>

ACTIVE

</span>




<span

className="
bg-white/10
px-5
py-2
font-bold
"


>

{employee.employee_number || "Pending"}

</span>



</div>



</div>



</div>

id="part2"
<div

className="
mt-14
"

>


<h2

className="
text-4xl
font-black
text-[#003B6F]
"

>

Personal Information

</h2>





<div

className="
grid
md:grid-cols-3
gap-6
mt-8
"

>


<Info

title="Roblox Username"

value={employee.roblox_username}

/>



<Info

title="Roblox User ID"

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

title="Status"

value={employee.status || "Unknown"}

/>



</div>


</div>









<section

className="
mt-14
"

>


<h2

className="
text-4xl
font-black
text-[#003B6F]
"

>

Service History

</h2>






<div

className="
grid
md:grid-cols-2
gap-6
mt-8
"

>



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

"Not Recorded"

}

/>




</div>


</section>









<section

className="
mt-14
"

>


<h2

className="
text-4xl
font-black
text-[#003B6F]
"

>

Career History

</h2>







<div

className="
mt-8
space-y-6
"

>





{

promotions?.map((item:any)=>(


<div

key={item.id}

className="
border-l-4
border-[#003B6F]
pl-6
bg-[#F5F8FB]
p-6
"

>


<h3

className="
text-xl
font-black
text-[#003B6F]
"

>

{item.action || "Career Update"}

</h3>



<p

className="
mt-2
text-gray-700
"

>

{item.notes || "No additional information recorded."}

</p>



<p

className="
mt-3
text-sm
font-bold
text-gray-500
"

>

Effective:

{" "}

{

item.effective_date

?

new Date(item.effective_date)
.toLocaleDateString()

:

"Unknown"

}

</p>



</div>


))

}




{

(!promotions || promotions.length === 0) && (


<p className="
text-gray-500
"

>

No promotion records available.

</p>


)

}



</div>


</section>









<section

className="
mt-14
"

>


<h2

className="
text-4xl
font-black
text-[#003B6F]
"

>

Awards & Recognition

</h2>






<div

className="
grid
md:grid-cols-2
gap-6
mt-8
"

>



{

awards?.map((award:any)=>(


<div

key={award.id}

className="
border
bg-white
shadow-sm
p-7
"

>


<h3

className="
text-xl
font-black
text-[#003B6F]
"

>

{award.award_name}

</h3>



<p

className="
mt-3
text-gray-700
"

>

{award.description || "Recognition awarded for outstanding service."}

</p>



<p

className="
mt-4
text-sm
font-bold
text-gray-500
"

>

Awarded by:

{" "}

{award.awarded_by || "Department"}

<br />

{

award.awarded_date

?

new Date(award.awarded_date)
.toLocaleDateString()

:

""

}

</p>



</div>


))


}





{

(!awards || awards.length === 0) && (

<p className="
text-gray-500
"

>

No awards recorded.

</p>

)

}



</div>


</section>









<section

className="
mt-14
"

>


<h2

className="
text-4xl
font-black
text-[#003B6F]
"

>

Employment Record

</h2>






<div

className="
mt-8
space-y-6
"

>


{


employmentHistory?.map((item:any)=>(


<div

key={item.id}

className="
border
p-6
bg-[#F5F8FB]
"

>


<h3

className="
text-xl
font-black
text-[#003B6F]
"

>

{item.action || "Employment Action"}

</h3>



<p

className="
mt-3
text-gray-700
"

>

{item.notes || "No notes recorded."}

</p>



<p

className="
mt-3
text-sm
font-bold
text-gray-500
"

>

Effective Date:

{" "}

{

item.effective_date

?

new Date(item.effective_date)
.toLocaleDateString()

:

"Unknown"

}

</p>


</div>


))


}





{

(!employmentHistory || employmentHistory.length === 0) && (

<p className="
text-gray-500
"

>

No employment history available.

</p>

)

}



</div>


</section>









<section

className="
mt-14
"

>


<h2

className="
text-4xl
font-black
text-[#003B6F]
"

>

Department History

</h2>





<div

className="
mt-8
space-y-6
"

>



{


history?.map((item:any)=>(


<div

key={item.id}

className="
border-l-4
border-[#F2C94C]
bg-[#F5F8FB]
p-6
"

>


<h3

className="
font-black
text-[#003B6F]
"

>

Personnel Change

</h3>



<p

className="
mt-2
text-gray-700
"

>

{item.reason || "No reason provided."}

</p>



</div>


))


}



</div>


</section>









<section

className="
mt-14
border-l-4
border-[#F2C94C]
bg-[#F5F8FB]
p-8
"

>


<h3

className="
text-2xl
font-black
text-[#003B6F]
"

>

Personnel Record Notice

</h3>



<p

className="
mt-3
text-gray-700
leading-relaxed
"

>

This profile is generated from official Department of Homeland Security employment records. Information displayed is restricted to the authenticated employee and approved personnel data.

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

<div

className="
bg-white
border
p-6
"

>


<p

className="
uppercase
tracking-widest
text-xs
font-bold
text-gray-500
"

>

{title}

</p>



<p

className="
mt-3
font-black
text-[#003B6F]
"

>

{value}

</p>


</div>

);


}
