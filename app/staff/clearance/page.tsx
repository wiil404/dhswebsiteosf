import Link from "next/link";
import { redirect } from "next/navigation";

import { getProfile } from "../../lib/permissions";
import { canManageClearance } from "../../lib/clearance";
import { supabaseAdmin } from "../../lib/supabase-admin";



export default async function ClearanceManagement(){


const profile =
await getProfile();



if(!profile){

redirect("/staff/login");

}



const allowed =
await canManageClearance();



if(!allowed){

redirect("/staff/dashboard");

}






const {

data:clearances,

error

} = await supabaseAdmin

.from("security_clearances")

.select(`

*,

security_subjects(
    *
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

Security Clearance Management

</h1>


<p className="
mt-3
text-gray-600
">

Manage DHS, White House, Capitol and Airport restricted access.

</p>


</div>





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

+ Create Clearance

</Link>


</div>









{

error && (

<div className="
mt-8
bg-red-100
text-red-700
p-5
">

{error.message}

</div>

)

}









<div className="
mt-10
space-y-8
">


{

clearances?.map((clearance:any)=>(


<section

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
items-start
"


>


<div>


<h2 className="
text-2xl
font-bold
text-[#003B6F]
">


{

clearance.security_subjects?.roblox_username ||

clearance.security_subjects?.organisation ||

"Unknown Subject"

}


</h2>





<p className="
text-gray-600
mt-2
">


{

clearance.security_subjects?.subject_type === "organisation"

?

"Organisation"

:

"Individual"

}


</p>





{

clearance.security_subjects?.roblox_user_id && (

<p className="
text-sm
text-gray-500
">

Roblox ID:

{" "}

{clearance.security_subjects.roblox_user_id}

</p>

)

}



</div>







<div>


{

clearance.blacklisted && (

<span className="
bg-red-600
text-white
px-4
py-2
font-bold
">

BLACKLISTED

</span>

)

}


</div>



</div>









<div className="
grid
md:grid-cols-4
gap-5
mt-8
">


<AreaCard

title="White House"

level={
clearance.white_house
}

/>


<AreaCard

title="Capitol"

level={
clearance.capitol
}

/>


<AreaCard

title="DHS"

level={
clearance.dhs
}

/>


<AreaCard

title="Airport"

level={
clearance.airport
}

/>


</div>









{

clearance.blacklisted && (

<div className="
mt-8
bg-red-50
border
border-red-200
p-5
">


<h3 className="
font-bold
text-red-700
">

Blacklist Information

</h3>



<p className="mt-2">

Reason:

{" "}

{
clearance.blacklist_reason ||
"No reason provided"
}

</p>




<p className="mt-2">

Areas:

{" "}

{

clearance.blacklist_areas?.length

?

clearance.blacklist_areas.join(", ")

:

"All Areas"

}


</p>


</div>

)

}









<div className="
mt-8
border-t
pt-5
flex
gap-5
">


<Link

href={`/staff/clearance/${clearance.id}`}

className="
text-[#003B6F]
font-bold
hover:underline
"

>

View / Edit

</Link>


</div>






</section>


))

}



</div>







{

(!clearances || clearances.length===0) && (

<p className="
mt-10
text-gray-500
">

No security clearances have been created.

</p>

)

}



</div>


</main>

);


}









function AreaCard({

title,
level

}:{

title:string;

level:number;

}){


const descriptions:any={

1:"Level 1 - Full Clearance",

2:"Level 2 - Restricted Access",

3:"Level 3 - Controlled Access",

4:"Level 4 - Invitation Only"

};



return (

<div className="
border
p-4
bg-gray-50
">


<h3 className="
font-bold
text-[#003B6F]
">

{title}

</h3>


<p className="
mt-2
font-semibold
">

Level {level}

</p>



<p className="
text-sm
text-gray-600
mt-1
">

{descriptions[level]}

</p>



</div>

);


}
