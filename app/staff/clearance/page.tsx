import Link from "next/link";

import { supabaseAdmin } from "../../lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function ClearancePage(){


const {

data:subjects,

error

} = await supabaseAdmin

.from("security_subjects")

.select(`

id,

organisation,

subject_type,

roblox_username,

roblox_user_id,

active,

public_visible,

created_at,


security_clearances(

id,

clearance_level,

blacklisted,

blacklist_reason,

expires_at,

security_areas!area_id(
    name
)

)


`)

.order(
"created_at",
{
ascending:false
}

);





if(error){


return (

<main className="max-w-7xl mx-auto px-6 py-16">

<div className="
bg-white
border
shadow-xl
p-8
">

<h1 className="
text-3xl
font-bold
text-red-600
">

Database Error

</h1>


<p className="mt-4">

{error.message}

</p>

</div>

</main>

);


}








const totalSubjects =
subjects?.length || 0;


const organisations =
subjects?.filter(
x=>x.subject_type==="organisation"
)
.length || 0;


const blacklisted =
subjects?.filter(
x=>
x.security_clearances?.some(
(c:any)=>c.blacklisted
)
)
.length || 0;








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
p-8
md:p-12
">






{/* HEADER */}


<div className="
border-b
pb-8
">


<h1 className="
text-4xl
font-black
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
hover:bg-[#002B52]
transition
"

>

+ Create Clearance

</Link>





{/* STATS */}


<div className="
grid
md:grid-cols-4
gap-6
mt-10
">



<StatCard

title="Subjects"

value={totalSubjects}

/>



<StatCard

title="Organisations"

value={organisations}

/>




<StatCard

title="Blacklisted"

value={blacklisted}

/>



<StatCard

title="Active Records"

value={
subjects?.reduce(
(total:any,subject:any)=>
total+
(subject.security_clearances?.length||0),
0
)
}

/>



</div>









{/* TABLE */}


<section className="
mt-12
">


<div className="
overflow-x-auto
">


<table className="
w-full
border-collapse
">


<thead>


<tr className="
bg-[#003B6F]
text-white
text-left
">


<th className="p-4">
Subject
</th>


<th className="p-4">
Type
</th>


<th className="p-4">
White House
</th>


<th className="p-4">
Capitol
</th>


<th className="p-4">
DHS
</th>


<th className="p-4">
Airport
</th>


<th className="p-4">
Status
</th>


<th className="p-4">
Actions
</th>


</tr>


</thead>







<tbody>


{

subjects?.map(
(subject:any)=>(


<tr

key={subject.id}

className="
border-b
hover:bg-gray-50
"

>


<td className="p-4">


<p className="
font-bold
text-[#003B6F]
">

{

subject.roblox_username ||

subject.organisation ||

"Unknown"

}

</p>


{

subject.roblox_user_id &&

<p className="
text-sm
text-gray-500
">

Roblox ID: {subject.roblox_user_id}

</p>

}


</td>







<td className="p-4">


<span className="
uppercase
text-sm
font-bold
">

{subject.subject_type}

</span>


</td>









<td className="p-4">

<ClearanceBadge

clearances={
subject.security_clearances
}

area="White House Grounds"

/>

</td>






<td className="p-4">

<ClearanceBadge

clearances={
subject.security_clearances
}

area="United States Capitol"

/>

</td>






<td className="p-4">

<ClearanceBadge

clearances={
subject.security_clearances
}

area="DHS Restricted Areas"

/>

</td>







<td className="p-4">

<ClearanceBadge

clearances={
subject.security_clearances
}

area="Airport Restricted Areas"

/>

</td>







<td className="p-4">


{

subject.security_clearances?.some(
(c:any)=>c.blacklisted
)

?


<span className="
bg-red-100
text-red-700
px-3
py-1
font-bold
text-sm
">

BLACKLISTED

</span>


:

<span className="
bg-green-100
text-green-700
px-3
py-1
font-bold
text-sm
">

ACTIVE

</span>


}


</td>







<td className="p-4">


<div className="
flex
gap-3
">


<Link

href={`/staff/clearance/${subject.id}`}

className="
bg-[#003B6F]
text-white
px-4
py-2
font-bold
"

>

View

</Link>





<Link

href={`/staff/clearance/${subject.id}/edit`}

className="
bg-yellow-500
text-black
px-4
py-2
font-bold
"

>

Edit

</Link>



</div>


</td>






</tr>


)

)

}



</tbody>


</table>


</div>


</section>








</div>


</main>


);

}









function ClearanceBadge({

clearances,

area

}:{

clearances:any[];

area:string;

}){


const clearance =
clearances?.find(
(c:any)=>
c.security_areas?.name===area
);




if(!clearance){


return (

<span className="
text-gray-400
font-bold
">

—

</span>

);


}




const colours:any={

1:
"bg-green-100 text-green-700",

2:
"bg-blue-100 text-blue-700",

3:
"bg-yellow-100 text-yellow-700",

4:
"bg-orange-100 text-orange-700"

};





return (

<span className={`
px-3
py-1
font-black
${colours[clearance.clearance_level] || ""}
`}>

CL{clearance.clearance_level}

</span>

);


}









function StatCard({

title,

value

}:{

title:string;

value:number;

}){


return (

<div className="
border
p-6
bg-[#F5F8FB]
">


<p className="
text-sm
uppercase
text-gray-500
font-bold
">

{title}

</p>


<p className="
text-4xl
font-black
text-[#003B6F]
mt-2
">

{value}

</p>


</div>

);


}
