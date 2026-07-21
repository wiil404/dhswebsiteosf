import Link from "next/link";

import { supabaseAdmin } from "../lib/supabase-admin";



export default async function ClearanceRegistry(){


const {

data:subjects

}

=
await supabaseAdmin

.from("security_subjects")

.select(`

id,

organisation,

subject_type,

roblox_username,

public_visible,


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
md:text-7xl
font-black
mt-5
leading-tight
">

Security Clearance Registry

</h1>





<p className="
mt-6
max-w-3xl
text-lg
text-blue-100
">

Official public verification portal for DHS recognised personnel
and organisational security clearances.

</p>







<div className="
mt-10
bg-white
p-3
max-w-2xl
shadow-2xl
flex
">


<input

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



</div>





</div>


</section>









{/* RECORDS */}


<section className="
max-w-6xl
mx-auto
px-6
py-16
">


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

Verified Records

</h2>


<p className="
text-gray-500
mt-2
">

Publicly available clearance authorisations.

</p>


</div>





<div className="
text-sm
font-bold
text-gray-500
">

{subjects?.length || 0} Records

</div>



</div>









<div className="
grid
md:grid-cols-2
gap-8
">







{

subjects?.map(

(subject:any)=>(



<Link

href={`/clearance/${subject.id}`}

key={subject.id}

className="
group
bg-white
border
shadow-sm
hover:shadow-2xl
transition
p-8
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
group-hover:w-2
transition
"/>







<div className="
flex
justify-between
">


<div>


<h3 className="
text-2xl
font-black
text-[#003B6F]
">

{

subject.roblox_username ||

subject.organisation

}

</h3>



<p className="
text-gray-500
uppercase
text-xs
font-bold
mt-2
">

{subject.subject_type}

</p>



</div>







<span className="
bg-green-100
text-green-700
px-3
py-1
h-fit
font-black
text-sm
">

VERIFIED

</span>



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
flex
justify-between
items-center
bg-[#F5F8FB]
p-4
"


>


<span className="
font-bold
text-gray-700
">

{c.security_areas?.name}

</span>




<span className={`
font-black
px-3
py-1

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

`}>

CL{c.clearance_level}

</span>



</div>


)

)


}



</div>









<p className="
mt-8
text-[#003B6F]
font-black
group-hover:underline
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
text-center
p-8
text-sm
">


Department of Homeland Security Public Verification Registry

</footer>





</main>


);


}
