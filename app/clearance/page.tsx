import Link from "next/link";

import { supabaseAdmin } from "../lib/supabase-admin";



export default async function ClearanceRegistry({

searchParams

}:{

searchParams:Promise<{
    search?:string
}>

}){



const {

search

}=await searchParams;





let query = supabaseAdmin

.from("security_subjects")

.select(`

id,

organisation,

subject_type,

roblox_username,

public_visible,

status,

created_at,


security_clearances(

id,

clearance_level,

blacklisted,

expires_at,


security_areas!area_id(

name

)

)

`)

.eq(
"public_visible",
true
)

.order(
"created_at",
{
ascending:false
}
);







if(search){


query=query.or(

`roblox_username.ilike.%${search}%,organisation.ilike.%${search}%`

);


}








const {

data:subjects,

error

}=await query;









return (

<main className="
min-h-screen
bg-[#F5F8FB]
">






{/* HERO */}


<section className="
bg-[#003B6F]
text-white
px-6
py-20
">


<div className="
max-w-7xl
mx-auto
">


<p className="
text-[#F2C94C]
uppercase
tracking-[0.35em]
font-black
text-sm
">

Department of Homeland Security

</p>





<h1 className="
text-5xl
md:text-7xl
font-black
mt-5
">

Security Clearance Registry

</h1>






<p className="
mt-5
max-w-3xl
text-blue-100
text-lg
">

Official public verification portal for DHS authorised personnel,
organisations and restricted facility access.

</p>








<form

action="/clearance"

className="
mt-10
max-w-3xl
bg-white
p-3
flex
shadow-2xl
"

>


<input

name="search"

defaultValue={search}

placeholder="
Search personnel or organisation...
"

className="
flex-1
p-4
text-black
outline-none
"

/>





<button

className="
bg-[#F2C94C]
text-black
px-8
font-black
"

>

SEARCH

</button>



</form>





</div>


</section>









{/* CLEARANCE GUIDE */}


<section className="
max-w-7xl
mx-auto
px-6
py-16
">



<div className="
bg-white
border
shadow-lg
p-8
">




<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Clearance Classification Guide

</h2>





<p className="
mt-3
text-gray-600
">

Understanding DHS security access levels.

</p>







<div className="
grid
md:grid-cols-4
gap-5
mt-8
">






<LevelCard

level="CL1"

title="Full Unrestricted Access"

desc="Authorised access to standard operational areas."

/>





<LevelCard

level="CL2"

title="Full Restricted Access"

desc="Authorised access to controlled DHS restricted locations."

/>





<LevelCard

level="CL3"

title="Limited Access"

desc="Restricted access granted only to approved areas."

/>





<LevelCard

level="CL4"

title="Access Upon Invitation"

desc="Highest classification requiring explicit authorisation."

/>







</div>







</div>









{/* RESULTS HEADER */}



<div className="
mt-16
flex
justify-between
items-end
gap-5
">


<div>


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

{

search

?

`Results for "${search}"`

:

"Verified Clearance Holders"

}

</h2>




<p className="
mt-2
text-gray-500
">

Public DHS verification records.

</p>


</div>






<div className="
font-black
text-gray-500
">

{

subjects?.length || 0

}

Records

</div>




</div>
id="2m4q7s"
{
(!subjects || subjects.length === 0) && (

<div className="
mt-10
bg-white
border
shadow
p-12
text-center
">


<h3 className="
text-3xl
font-black
text-[#003B6F]
">

No Records Found

</h3>



<p className="
mt-3
text-gray-500
">

No public clearance records match your search.

</p>


</div>

)

}









<div className="
grid
md:grid-cols-2
gap-8
mt-10
">





{

subjects?.map(

(subject:any)=>(


<Link

key={subject.id}

href={`/clearance/${subject.id}`}

className="
group
relative
bg-white
border
shadow-sm
hover:shadow-2xl
transition
overflow-hidden
"

>





<div className="
absolute
left-0
top-0
w-2
h-full
bg-[#F2C94C]
group-hover:w-3
transition-all
"/>








<div className="
p-8
">





<div className="
flex
justify-between
items-start
gap-5
">



<div>


<h3 className="
text-3xl
font-black
text-[#003B6F]
">

{

subject.roblox_username ||

subject.organisation ||

"Unknown"

}

</h3>




<p className="
uppercase
tracking-widest
text-xs
font-black
text-gray-500
mt-2
">

{

subject.subject_type

}

</p>


</div>







<StatusBadge

status={
subject.status
}

/>



</div>









<div className="
mt-8
space-y-3
">



{

subject.security_clearances?.map(

(c:any)=>(


<div

key={c.id}

className="
bg-[#F5F8FB]
border
p-4
flex
justify-between
items-center
"

>


<div>


<p className="
font-black
text-[#003B6F]
">

{

c.security_areas?.name

}

</p>



</div>





<ClearanceBadge

level={
c.clearance_level
}

/>



</div>



)

)

}




</div>









<div className="
mt-8
border-t
pt-5
flex
justify-between
items-center
">


<span className="
font-black
text-[#003B6F]
">

View Verification

</span>




<span className="
text-[#F2C94C]
font-black
text-xl
">

→

</span>


</div>






</div>





</Link>



)

)



}



</div>








</section>









<footer className="
bg-[#003B6F]
text-white
p-10
text-center
">


<h3 className="
font-black
text-xl
">

DEPARTMENT OF HOMELAND SECURITY

</h3>



<p className="
mt-3
opacity-80
">

Public Security Clearance Verification Registry

</p>



</footer>







</main>


);


}













function ClearanceBadge({

level

}:{

level:number

}){



const levels:any={



1:{

name:"FULL UNRESTRICTED",

style:"bg-green-100 text-green-700"

},



2:{

name:"FULL RESTRICTED",

style:"bg-blue-100 text-blue-700"

},



3:{

name:"LIMITED",

style:"bg-yellow-100 text-yellow-700"

},



4:{

name:"INVITATION ONLY",

style:"bg-orange-100 text-orange-700"

}



};






const item =

levels[level] || levels[1];







return (

<div

className={`

px-4

py-2

text-center

font-black

${item.style}

`}

>


<p>

CL{level}

</p>


<p className="
text-[10px]
mt-1
">

{item.name}

</p>



</div>


);


}









function StatusBadge({

status

}:{

status:string | null

}){



const states:any={



active:{

text:"✓ ACTIVE",

style:"bg-green-100 text-green-700"

},



verified:{

text:"✓ VERIFIED",

style:"bg-green-100 text-green-700"

},



suspended:{

text:"⚠ SUSPENDED",

style:"bg-yellow-100 text-yellow-700"

},



revoked:{

text:"✕ REVOKED",

style:"bg-red-100 text-red-700"

}



};






const current =

states[
(status || "active").toLowerCase()
]

||

states.active;







return (

<span

className={`

px-4

py-2

font-black

text-sm

${current.style}

`}

>

{current.text}

</span>


);


}









function LevelCard({

level,

title,

desc

}:{

level:string;

title:string;

desc:string;

}){


return (

<div

className="
bg-[#F5F8FB]
border
p-6
hover:shadow-lg
transition
"

>


<div className="
flex
justify-between
items-center
">


<h3 className="
text-3xl
font-black
text-[#003B6F]
">

{level}

</h3>



<div

className={`

w-4

h-4

rounded-full

${

level==="CL4"

?

"bg-orange-500"

:

level==="CL3"

?

"bg-yellow-500"

:

level==="CL2"

?

"bg-blue-500"

:

"bg-green-500"

}

`}

/>



</div>






<h4 className="
font-black
mt-5
">

{title}

</h4>





<p className="
text-gray-500
text-sm
mt-2
leading-relaxed
">

{desc}

</p>




</div>


);


}
