import Link from "next/link";
import { redirect } from "next/navigation";

import { canManageClearance } from "../../lib/clearance";
import { supabaseAdmin } from "../../lib/supabase-admin";



export default async function ClearancePage(){


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

    id,

    clearance_level,

    white_house,

    capitol,

    dhs,

    airport,

    blacklisted,

    blacklist_areas,


    security_subjects(

        id,

        subject_name,

        organisation,

        subject_type,

        roblox_username,

        roblox_user_id

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
bg-red-50
border
border-red-300
p-5
text-red-700
">

Database Error:

{" "}

{error.message}

</div>

)

}









<div className="
mt-10
space-y-6
">


{

clearances?.length ?


clearances.map((clearance:any)=>(


<div

key={clearance.id}

className="
border
p-6
shadow-sm
bg-white
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

clearance.security_subjects?.subject_name

}


</h2>





<p className="
text-gray-600
mt-2
">

Type:

{" "}

{
clearance.security_subjects?.subject_type
}


</p>





{

clearance.security_subjects?.roblox_username && (

<p className="
text-gray-600
">

Roblox:

{" "}

{
clearance.security_subjects.roblox_username
}

</p>

)

}




{

clearance.security_subjects?.organisation && (

<p className="
text-gray-600
">

Organisation:

{" "}

{
clearance.security_subjects.organisation
}

</p>

)

}



</div>









<div>


<span className="
bg-[#003B6F]
text-white
px-4
py-2
font-bold
">

Level {clearance.clearance_level}

</span>


</div>


</div>









<div className="
grid
md:grid-cols-4
gap-4
mt-8
">


<Area

name="White House"

level={clearance.white_house}

/>


<Area

name="Capitol"

level={clearance.capitol}

/>


<Area

name="DHS"

level={clearance.dhs}

/>


<Area

name="Airport"

level={clearance.airport}

/>


</div>









{

clearance.blacklisted && (

<div className="
mt-6
bg-red-100
border
border-red-400
p-4
text-red-700
font-bold
">

⚠ BLACKLISTED

<br/>

Areas:

{" "}

{
clearance.blacklist_areas?.join(", ")
||
"All Areas"
}

</div>

)

}







<div className="
mt-6
flex
gap-4
">


<Link

href={`/staff/clearance/${clearance.id}`}

className="
bg-gray-100
px-5
py-3
font-bold
"

>

View

</Link>



<Link

href={`/staff/clearance/${clearance.id}/edit`}

className="
bg-[#003B6F]
text-white
px-5
py-3
font-bold
"

>

Modify

</Link>


</div>





</div>


))


:


<div className="
text-gray-500
text-center
py-10
">

No active clearances found.

</div>


}



</div>






</div>


</main>


);


}








function Area({

name,
level

}:{

name:string;
level:number;

}){


return (

<div className="
border
p-4
bg-gray-50
">


<p className="
font-bold
text-[#003B6F]
">

{name}

</p>



<p className="
mt-2
font-semibold
">

Level {level}

</p>


</div>

);


}
