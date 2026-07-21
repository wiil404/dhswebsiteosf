import Link from "next/link";

import { notFound } from "next/navigation";

import { supabaseAdmin } from "../../../lib/supabase-admin";

import DeleteClearanceButton from "./DeleteClearanceButton";

export default async function ClearanceProfile({

params

}:{

params:Promise<{
    id:string
}>

}){


const {id} =
await params;






const {

data:subject,

error

} = await supabaseAdmin

.from("security_subjects")

.select(`

id,

organisation,

subject_type,

roblox_username,

roblox_user_id,

discord_username,

email,

notes,

created_at,


security_clearances(

id,

clearance_level,

peoc_access,

white_house_lanyard,

lanyard_required,

blacklisted,

blacklist_reason,

blacklist_areas,

expires_at,

notes,


security_areas!area_id(

name,

description

)

)

`)

.eq(
"id",
id
)

.single();






if(error || !subject){

notFound();

}








return (

<main className="
max-w-7xl
mx-auto
px-6
py-16
">


<div className="
bg-white
shadow-xl
border
p-10
">







{/* HEADER */}


<div className="
bg-[#003B6F]
text-white
p-10
">


<p className="
uppercase
tracking-widest
text-sm
text-[#F2C94C]
font-bold
">

Department of Homeland Security

</p>




<h1 className="
text-5xl
font-black
mt-4
">

{

subject.roblox_username ||

subject.organisation ||

"Unknown Subject"

}

</h1>



<p className="
mt-3
text-xl
">

{

subject.subject_type

}

</p>



</div>








{/* DETAILS */}


<section className="
mt-10
grid
md:grid-cols-3
gap-6
">



<InfoCard

title="Identity"

items={[

`Roblox Username: ${
subject.roblox_username || "N/A"
}`,

`Roblox ID: ${
subject.roblox_user_id || "N/A"
}`,

`Organisation: ${
subject.organisation || "N/A"
}`

]}

/>






<InfoCard

title="Contact"

items={[

`Discord: ${
subject.discord_username || "N/A"
}`,

`Email: ${
subject.email || "N/A"
}`

]}

/>







<InfoCard

title="Record"

items={[

`Created: ${
new Date(
subject.created_at
)
.toLocaleDateString()
}`,

`Clearances: ${
subject.security_clearances.length
}`

]}

/>



</section>









{/* CLEARANCES */}



<section className="
mt-12
">


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Facility Clearances

</h2>






<div className="
grid
md:grid-cols-2
gap-6
mt-8
">





{

subject.security_clearances.map(

(clearance:any)=>(


<div

key={clearance.id}

className="
border
p-6
shadow-sm
"

>


<div className="
flex
justify-between
items-center
">


<h3 className="
text-xl
font-bold
text-[#003B6F]
">

{
clearance.security_areas?.name
}

</h3>




<span className="
bg-[#003B6F]
text-white
px-4
py-2
font-black
">

CL{clearance.clearance_level}

</span>


</div>







<p className="
mt-4
text-gray-600
">

{
clearance.security_areas?.description
}

</p>








<div className="
mt-6
space-y-2
">


<Status

label="PEOC Access"

value={
clearance.peoc_access
}

/>



<Status

label="Lanyard Required"

value={
clearance.lanyard_required
}

/>



<Status

label="White House Lanyard"

value={
clearance.white_house_lanyard
}

/>




</div>








{

clearance.blacklisted && (

<div className="
mt-6
bg-red-100
border
border-red-300
p-4
">


<h4 className="
font-black
text-red-700
">

BLACKLISTED

</h4>


<p className="
mt-2
text-red-700
">

{
clearance.blacklist_reason ||
"No reason provided"
}

</p>


</div>

)

}




</div>


)

)

}


</div>


</section>








<div className="
mt-12
flex
gap-4
">


<Link

href={`/staff/clearance/${subject.id}/edit`}

className="
bg-yellow-500
px-6
py-3
font-bold
"

>

Edit Clearance

</Link>





<DeleteClearanceButton

id={subject.id}

/>





<Link

href="/staff/clearance"

className="
bg-gray-200
px-6
py-3
font-bold
"

>

Back

</Link>


</div>


<Link

href={`/staff/clearance/${subject.id}/edit`}

className="
bg-yellow-500
px-6
py-3
font-bold
"

>

Edit Clearance

</Link>




<Link

href="/staff/clearance"

className="
bg-gray-200
px-6
py-3
font-bold
"

>

Back

</Link>


</div>






</div>


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
p-6
bg-[#F5F8FB]
">


<h3 className="
text-xl
font-black
text-[#003B6F]
">

{title}

</h3>


<div className="
mt-4
space-y-2
text-gray-700
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







function Status({

label,

value

}:{

label:string;

value:boolean

}){


return (

<div className="
flex
justify-between
border-b
pb-2
">


<span>

{label}

</span>


<span className={

value

?

"text-green-600 font-bold"

:

"text-gray-400"

}>

{

value
?
"YES"
:
"NO"

}

</span>


</div>

);


}
