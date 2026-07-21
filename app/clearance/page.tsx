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


security_clearances(

id,

clearance_level,

blacklisted,


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









if(error){

console.error(error);

}







return (

<main className="
min-h-screen
bg-[#F5F8FB]
">







<section className="
bg-[#003B6F]
text-white
px-6
py-20
">


<div className="
max-w-6xl
mx-auto
">


<p className="
text-[#F2C94C]
uppercase
tracking-[0.3em]
font-bold
text-sm
">

Department of Homeland Security

</p>





<h1 className="
text-5xl
md:text-6xl
font-black
mt-5
">

Security Clearance Registry

</h1>





<p className="
mt-5
max-w-3xl
text-blue-100
">

Official public verification portal for DHS authorised personnel and organisations.

</p>









<form

action="/clearance"

className="
mt-10
bg-white
p-3
max-w-2xl
flex
shadow-2xl
"

>


<input

name="search"

defaultValue={search}

placeholder="
Search Roblox username or organisation...
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









<section className="
max-w-6xl
mx-auto
px-6
py-16
">







{/* CLEARANCE GUIDE */}



<div className="
bg-white
border
shadow-sm
p-8
mb-12
">


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Clearance Level Guide

</h2>





<div className="
grid
md:grid-cols-4
gap-5
mt-6
">


<LevelCard

level="CL1"

title="Operational"

desc="Standard authorised access"

/>



<LevelCard

level="CL2"

title="Restricted"

desc="Controlled access areas"

/>



<LevelCard

level="CL3"

title="Sensitive"

desc="High-security locations"

/>



<LevelCard

level="CL4"

title="Executive"

desc="Special authorisation"

/>



</div>



</div>









<div className="
flex
justify-between
items-end
mb-10
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

`Search Results For "${search}"`

:

"Verified Clearance Holders"

}

</h2>



<p className="
mt-2
text-gray-500
">

Publicly available security authorisations.

</p>



</div>






<p className="
font-bold
text-gray-500
">

{subjects?.length || 0} Records

</p>



</div>









{

(!subjects || subjects.length===0)

&&

(

<div className="
bg-white
border
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
">







{

subjects?.map(

(subject:any)=>(



<Link

key={subject.id}

href={`/clearance/${subject.id}`}

className="
bg-white
border
p-8
shadow-sm
hover:shadow-xl
transition
relative
overflow-hidden
"


>



<div className="
absolute
left-0
top-0
h-full
w-1
bg-[#F2C94C]
"/>








<div className="
flex
justify-between
items-start
gap-4
">


<div>


<h3 className="
text-2xl
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
text-xs
font-bold
text-gray-500
mt-2
">

{subject.subject_type}

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
p-4
flex
justify-between
items-center
"


>


<span className="
font-bold
">

{c.security_areas?.name}

</span>






<span

className={`
px-3
py-1
font-black

${

c.clearance_level===4

?

"bg-orange-100 text-orange-700"

:

c.clearance_level===3

?

"bg-yellow-100 text-yellow-700"

:

c.clearance_level===2

?

"bg-blue-100 text-blue-700"

:

"bg-green-100 text-green-700"

}

`}

>

CL{c.clearance_level}

</span>





</div>


)

)

}





</div>








<p className="
mt-8
font-black
text-[#003B6F]
">

View Verification →

</p>




</Link>


)

)

}



</div>






</section>









<footer className="
bg-[#003B6F]
text-white
p-8
text-center
">


Department of Homeland Security Public Verification Registry


</footer>







</main>


);

}









function StatusBadge({

status

}:{

status:string

}){


const states:any={


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

},


expired:{

text:"EXPIRED",

style:"bg-gray-200 text-gray-700"

}


};





const current =
states[status] || states.verified;





return (

<span className={`
px-4
py-2
font-black
text-sm
${current.style}
`}>

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

<div className="
bg-[#F5F8FB]
border
p-5
">


<p className="
text-3xl
font-black
text-[#003B6F]
">

{level}

</p>


<p className="
font-bold
mt-2
">

{title}

</p>


<p className="
text-sm
text-gray-500
mt-1
">

{desc}

</p>


</div>

);


}
