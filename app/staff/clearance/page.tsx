import { redirect } from "next/navigation";
import Link from "next/link";

import { supabaseAdmin } from "../../lib/supabase-admin";
import { canManageClearance } from "../../lib/clearance";



export default async function ClearancePage(){


const allowed =
await canManageClearance();



if(!allowed){

    redirect("/staff/dashboard");

}





const {

data:subjects,

error

} = await supabaseAdmin


.from("security_subjects")

.select(`

id,

full_name,

organisation,

subject_type,

roblox_username,

security_clearances(
    clearance_level,
    white_house,
    capitol,
    dhs,
    airport,
    blacklisted
)

`)


.order(
"created_at",
{
ascending:false
}
);







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
border-gray-200
p-10
">





<div className="
flex
justify-between
items-center
border-b
pb-8
">


<div>


<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

DHS Security Clearance Management

</h1>


<p className="
mt-3
text-gray-600
">

Manage access permissions for DHS, White House, Capitol and Airport restricted areas.

</p>


</div>






<div className="
flex
gap-4
">


<Link

href="/staff/clearance/create"

className="
bg-[#003B6F]
text-white
px-6
py-3
font-bold
"

>

+ Add Subject

</Link>




<Link

href="/staff/clearance/departments"

className="
bg-[#F2C94C]
text-black
px-6
py-3
font-bold
"

>

Departments

</Link>


</div>



</div>








{

error && (

<div className="
mt-8
bg-red-50
border
border-red-200
p-5
text-red-700
">

Database error:

{" "}

{error.message}

</div>

)

}








{

(!subjects || subjects.length === 0) && (

<div className="
mt-10
bg-gray-50
border
p-10
text-center
">


<h2 className="
text-2xl
font-bold
text-[#003B6F]
">

No Clearance Subjects

</h2>



<p className="
mt-3
text-gray-600
">

No individuals or organisations have been assigned clearance yet.

</p>



<Link

href="/staff/clearance/create"

className="
inline-block
mt-6
bg-[#003B6F]
text-white
px-6
py-3
font-bold
"

>

Create First Clearance Record

</Link>



</div>

)

}








<div className="
mt-10
grid
md:grid-cols-2
gap-6
">


{

subjects?.map((person:any)=>(


<div

key={person.id}

className="
border
p-6
shadow-sm
"

>


<div className="
flex
justify-between
"


>


<div>


<h2 className="
text-xl
font-bold
text-[#003B6F]
">

{person.full_name}

</h2>


<p className="
text-gray-600
">

{person.organisation || "No Organisation"}

</p>



</div>





{

person.security_clearances?.[0]?.blacklisted && (

<span className="
bg-red-600
text-white
px-3
py-1
text-sm
font-bold
">

BLACKLISTED

</span>

)

}



</div>








<div className="
mt-5
space-y-2
">


<p>

Type:

{" "}

{person.subject_type}

</p>



<p>

Clearance:

{" "}


{

person.security_clearances?.[0]

?

`Level ${person.security_clearances[0].clearance_level}`

:

"No Clearance"

}


</p>



</div>








<div className="
mt-6
flex
gap-3
">


<Link

href={`/staff/clearance/${person.id}`}

className="
bg-[#003B6F]
text-white
px-4
py-2
font-bold
"

>

Manage

</Link>


</div>






</div>


))


}


</div>







</div>


</main>

);


}
