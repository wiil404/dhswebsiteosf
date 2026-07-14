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





{

employee.status === "Active"

?

<form

action={`/api/staff/employees/${id}/disable`}

method="POST"

>


<button

className="
bg-red-600
text-white
px-5
py-3
rounded
font-bold
hover:bg-red-700
transition
"

>

Deactivate Employee

</button>


</form>


:

<div

className="
bg-gray-600
px-5
py-3
rounded
font-bold
"

>

Employee Deactivated

</div>


}



</div>



</section>








{

employee.status !== "Active" && (

<section className="
mt-6
bg-red-50
border
border-red-300
rounded-lg
p-6
text-red-800
"

>


<h2 className="
text-xl
font-bold
"

>

⚠ Employee Inactive

</h2>



<p className="
mt-2
"

>

This employee has been deactivated and is no longer listed as active DHS personnel.

</p>



</section>

)

}
