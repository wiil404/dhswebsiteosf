import Link from "next/link";
import { supabaseAdmin } from "../../../lib/supabase-admin";


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


    }
    catch{

        return null;

    }

}





export default async function EmployeeProfile({

params

}:{

params: Promise<{
    id:string
}>

}){


const {id} = await params;



const {

data:employee,
error

} = await supabaseAdmin


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


    old_position_id,

    new_position_id,

    old_division_id,

    new_division_id,


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
    ),


    changed_by_employee:employees!employment_history_changed_by_fkey(
        roblox_username
    )

)

,

disciplinary_records(
    id,
    description,
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


<pre className="mt-5 bg-gray-100 p-4">

{JSON.stringify(error,null,2)}

</pre>


</main>

);


}





const avatar =
employee.roblox_user_id
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



{/* HEADER */}


<section className="
bg-[#003B6F]
text-white
rounded-lg
shadow-xl
p-8
">


<div className="
flex
items-center
gap-8
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



<p className="mt-2">

{employee.divisions?.name || "No Division Assigned"}

</p>


</div>


</div>




<div className="
mt-8
flex
gap-4
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

<button

className="
bg-red-600
px-5
py-3
rounded
font-bold
"

>

Disable Account

</button>


</div>


</section>








{/* BASIC INFORMATION */}


<div className="
grid
md:grid-cols-3
gap-6
mt-10
">



<InfoCard

title="Identity"

items={[

`Email: ${employee.email || "N/A"}`,

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

`User ID: ${employee.user_id || "Not Linked"}`,

`Joined: ${
employee.created_at
?
new Date(employee.created_at)
.toLocaleDateString()
:
"N/A"
}`

]}

/>



</div>









{/* CAREER HISTORY */}


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

Career History

</h2>





<div className="
mt-6
space-y-6
">


{

employee.employment_history?.length ?


employee.employment_history.map((history:any)=>(

<div

key={history.id}

className="
border-l-4
border-[#003B6F]
pl-6
"

>


<h3 className="
text-xl
font-bold
uppercase
">

{history.action || "Career Update"}

</h3>




<p className="
text-sm
text-gray-500
mt-1
">

Effective:

{" "}

{
history.effective_date
?
new Date(history.effective_date)
.toLocaleDateString()
:
"N/A"
}

</p>





<div className="
mt-5
grid
md:grid-cols-2
gap-4
">


<div className="
bg-red-50
border
rounded
p-4
">


<p className="text-sm text-gray-500">

Previous Assignment

</p>


<h4 className="font-bold text-lg">

{
history.old_position?.title ||
"No Position"
}

</h4>


<p className="text-gray-600">

{
history.old_division?.name ||
"No Division"
}

</p>


</div>






<div className="
bg-green-50
border
rounded
p-4
">


<p className="text-sm text-gray-500">

New Assignment

</p>


<h4 className="font-bold text-lg">

{
history.new_position?.title ||
"No Position"
}

</h4>


<p className="text-gray-600">

{
history.new_division?.name ||
"No Division"
}

</p>


</div>


</div>






<div className="
mt-5
bg-gray-50
rounded
p-4
">


<p className="font-semibold">

Reason

</p>


<p>

{
history.notes ||
"No reason provided"
}

</p>


</div>





<p className="
mt-4
text-sm
text-gray-500
">

Approved / Recorded By:

{" "}

<span className="font-semibold">

{
history.changed_by_employee?.roblox_username ||
"System"
}

</span>


</p>





<p className="
text-xs
text-gray-400
mt-2
">

Recorded:

{" "}

{
new Date(history.created_at)
.toLocaleDateString()
}

</p>




</div>

))


:


<p className="
text-gray-500
">

No career history recorded.

</p>


}



</div>



</section>









{/* AWARDS */}


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

Awards & Decorations

</h2>




<div className="mt-6 space-y-4">


{

employee.employee_awards?.length ?

employee.employee_awards.map((award:any)=>(


<div

key={award.id}

className="
border-l-4
border-yellow-500
bg-gray-50
p-4
"

>


<h3 className="font-bold text-lg">

🏅 {award.award_name}

</h3>


<p className="mt-2 text-gray-700">

{award.description}

</p>


<p className="text-sm text-gray-500 mt-3">

Awarded:

{" "}

{
new Date(
award.awarded_date
)
.toLocaleDateString()
}

</p>


</div>


))


:

<p className="text-gray-500">

No awards recorded.

</p>


}


</div>


</section>









{/* DISCIPLINE */}


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

Disciplinary Record

</h2>



{

employee.disciplinary_records?.length ?


employee.disciplinary_records.map((record:any)=>(


<div

key={record.id}

className="
border-l-4
border-red-600
pl-5
mt-5
"

>

<p className="text-gray-700">

{record.description}

</p>


</div>


))


:

<p className="
text-green-600
font-semibold
mt-5
">

✓ No disciplinary actions recorded.

</p>


}


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

items.map(
(item,index)=>(

<p key={index}>

{item}

</p>

)

)

}

</div>


</div>

);


}