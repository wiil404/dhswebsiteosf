import { notFound } from "next/navigation";

import { supabaseAdmin } from "../../lib/supabase-admin";





export default async function PublicClearanceProfile({

params

}:{

params:Promise<{
    id:string
}>

}){


const {id}=await params;







const {

data:subject,

error

}=

await supabaseAdmin

.from("security_subjects")

.select(`

id,

organisation,

subject_type,

roblox_username,

created_at,


security_clearances(

id,

clearance_level,

blacklisted,

expires_at,


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

.eq(

"public_visible",

true

)

.single();








if(error || !subject){

notFound();

}








const recordNumber =

"DHS-" +

subject.id

.substring(0,8)

.toUpperCase();







return (

<main className="
min-h-screen
bg-[#F5F8FB]
px-6
py-16
">






<div className="
max-w-5xl
mx-auto
bg-white
shadow-2xl
border
">







{/* HEADER */}



<div className="
bg-[#003B6F]
text-white
p-10
relative
overflow-hidden
">





<div className="
absolute
right-10
top-8
text-8xl
opacity-10
font-black
">

DHS

</div>






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
font-black
mt-5
">

Verified Clearance Record

</h1>





<p className="
mt-4
text-blue-100
">

Public Security Authorisation Certificate

</p>



</div>









{/* VERIFIED */}



<div className="
p-10
flex
justify-between
items-center
border-b
">


<div>


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

{

subject.roblox_username ||

subject.organisation ||

"Unknown"

}

</h2>



<p className="
mt-2
uppercase
text-gray-500
font-bold
">

{subject.subject_type}

</p>



</div>







<div className="
bg-green-100
text-green-700
px-6
py-4
font-black
text-xl
border
border-green-300
">

✓ VERIFIED

</div>




</div>









{/* DETAILS */}



<section className="
p-10
grid
md:grid-cols-3
gap-6
">





<Card

title="Roblox Identity"

value={

subject.roblox_username ||

"Organisation"

}

/>





<Card

title="Organisation"

value={

subject.organisation ||

"Independent"

}

/>






<Card

title="Registry ID"

value={recordNumber}

/>






</section>









{/* CLEARANCES */}



<section className="
px-10
pb-10
">



<h2 className="
text-3xl
font-black
text-[#003B6F]
mb-6
">

Authorised Access Areas

</h2>







<div className="
space-y-5
">






{

subject.security_clearances.map(

(clearance:any)=>(



<div

key={clearance.id}

className="
border
p-6
bg-[#F9FAFB]
flex
justify-between
items-center
"


>


<div>


<h3 className="
text-xl
font-black
text-[#003B6F]
">

{

clearance.security_areas?.name

}

</h3>




<p className="
text-gray-500
mt-1
">

{

clearance.security_areas?.description

}

</p>




{

clearance.expires_at && (

<p className="
mt-3
text-sm
font-bold
text-gray-600
">

Expires:

{" "}

{

new Date(

clearance.expires_at

)
.toLocaleDateString()

}

</p>

)

}





</div>









<div className={`
px-5
py-3
font-black
text-lg


${

clearance.clearance_level===4

?

"bg-orange-100 text-orange-700"

:

clearance.clearance_level===3

?

"bg-yellow-100 text-yellow-700"

:

clearance.clearance_level===2

?

"bg-blue-100 text-blue-700"

:

"bg-green-100 text-green-700"

}

`}>





LEVEL {clearance.clearance_level}



</div>





</div>


)

)

}






</div>


</section>









{/* FOOTER */}



<footer className="
bg-[#003B6F]
text-white
p-8
text-center
">


<p className="
font-bold
">

Department of Homeland Security Public Registry

</p>


<p className="
text-sm
text-blue-200
mt-2
">

Issued:

{" "}

{

new Date(
subject.created_at
)
.toLocaleDateString()

}

</p>



</footer>







</div>







</main>


);


}









function Card({

title,

value

}:{

title:string;

value:string;

}){


return (

<div className="
border
p-5
bg-[#F5F8FB]
">


<p className="
text-xs
uppercase
font-bold
text-gray-500
">

{title}

</p>


<p className="
mt-2
font-black
text-[#003B6F]
break-words
">

{value}

</p>


</div>


);


}