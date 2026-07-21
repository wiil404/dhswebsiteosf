import Link from "next/link";
import { supabaseAdmin } from "../lib/supabase-admin";



export default async function ClearanceRegistry({

searchParams

}:{

searchParams: Promise<{
    search?: string
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


query = query.or(

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

Search publicly available DHS clearance records
for verified personnel and organisations.

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

(!subjects || subjects.length===0) && (

<div className="
bg-white
border
p-12
text-center
shadow
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
group
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
uppercase
text-xs
font-bold
text-gray-500
mt-2
">

{subject.subject_type}

</p>









<div className="
mt-6
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
"

>


<span className="
font-bold
">

{c.security_areas?.name}

</span>




<span className="
font-black
text-[#003B6F]
">

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
