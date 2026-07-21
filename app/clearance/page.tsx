import { supabaseAdmin } from "../lib/supabase-admin";





export default async function PublicClearancePage(){


const {

data:subjects,

error

}=

await supabaseAdmin

.from("security_subjects")

.select(`

id,

organisation,

subject_type,

roblox_username,


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







return (

<main className="
min-h-screen
bg-gray-100
px-6
py-16
">



<div className="
max-w-7xl
mx-auto
bg-white
shadow-xl
border
">


{/* HEADER */}


<div className="
bg-[#003B6F]
text-white
p-10
">


<p className="
text-[#F2C94C]
uppercase
tracking-widest
font-bold
text-sm
">

Department of Homeland Security

</p>




<h1 className="
text-5xl
font-black
mt-4
">

Public Security Clearance Registry

</h1>




<p className="
mt-4
text-blue-100
max-w-3xl
">

Public verification directory for approved personnel and organisations
holding DHS recognised facility access clearances.

</p>



</div>









{

error && (

<div className="
p-8
text-red-600
font-bold
">

Database Error:

{error.message}

</div>

)

}










<section className="
p-10
">


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Verified Clearance Holders

</h2>







<div className="
grid
md:grid-cols-2
gap-8
mt-8
">





{

subjects?.map(

(subject:any)=>(



<div

key={subject.id}

className="
border
shadow-sm
p-8
hover:shadow-xl
transition
"

>





<div className="
flex
justify-between
items-start
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
text-gray-500
mt-1
uppercase
font-bold
text-sm
">

{

subject.subject_type

}

</p>


</div>








{

subject.security_clearances?.some(

(c:any)=>c.blacklisted

)

?

(

<span className="
bg-red-600
text-white
px-4
py-2
font-black
">

BLACKLISTED

</span>

)

:

(

<span className="
bg-green-600
text-white
px-4
py-2
font-black
">

ACTIVE

</span>

)

}


</div>









<h4 className="
mt-8
font-bold
text-gray-700
">

Authorised Areas

</h4>








<div className="
mt-4
space-y-3
">




{

subject.security_clearances?.map(

(clearance:any)=>(


<div

key={clearance.id}

className="
flex
justify-between
items-center
border
p-4
bg-gray-50
"

>


<span className="
font-bold
">

{

clearance.security_areas?.name

}

</span>






<span className={`
px-3
py-1
font-black

${

clearance.clearance_level === 1

?

"bg-green-100 text-green-700"

:

clearance.clearance_level === 2

?

"bg-blue-100 text-blue-700"

:

clearance.clearance_level === 3

?

"bg-yellow-100 text-yellow-700"

:

"bg-orange-100 text-orange-700"

}

`}>

CL{clearance.clearance_level}

</span>


</div>


)

)

}





</div>









</div>


)

)

}



</div>





</section>







<footer className="
border-t
p-8
text-center
text-sm
text-gray-500
">

This registry is maintained by the Department of Homeland Security.
Unauthorised modification or misuse of clearance records is prohibited.

</footer>







</div>


</main>


);


}