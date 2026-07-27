import { supabaseAdmin } from "@/app/lib/supabase-admin";
import Link from "next/link";

export const dynamic = "force-dynamic";


export default async function CivilPoliciesPage(){


const {data:policies,error}=await supabaseAdmin

.from("policies")

.select(`

id,
title,
category,
tag,
status,
created_at

`)

.eq(
"tag",
"Civil"
)

.eq(
"status",
"Approved"
)

.order(
"created_at",
{
ascending:false
}

);




if(error){

console.error(
"CIVIL POLICY ERROR:",
error
);

}





return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-7xl
mx-auto
px-6
">


<div className="
bg-white
border
shadow-xl
overflow-hidden
">


<div className="
h-3
bg-[#F2C94C]
"/>



<header className="
bg-gradient-to-r
from-[#003B6F]
to-[#005AA7]
text-white
p-10
md:p-14
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
font-black
mt-5
">

Civil Policies

</h1>



<p className="
mt-4
text-blue-100
text-lg
max-w-3xl
">

Publicly released Department policies available
for all personnel and civilians.

</p>


</header>







<section className="
p-10
md:p-14
">



{

(!policies || policies.length===0)

?

<div className="
bg-[#F5F8FB]
border
p-10
text-center
font-black
text-gray-500
">

No civil policies have been released.

</div>


:

<div className="
grid
md:grid-cols-2
gap-8
">


{

policies.map((policy:any)=>(


<Link

key={policy.id}

href={`/documents/civil-policies/${policy.id}`}

className="
bg-white
border
shadow-sm
p-8
hover:shadow-xl
transition
group
relative
overflow-hidden
"

>


<div className="
absolute
top-0
left-0
w-full
h-2
bg-[#003B6F]
group-hover:bg-[#F2C94C]
transition
"/>





<h2 className="
text-2xl
font-black
text-[#003B6F]
mt-3
">

{policy.title}

</h2>





<p className="
mt-3
text-gray-600
font-semibold
">

{policy.category}

</p>





<div className="
mt-6
text-sm
text-gray-500
font-bold
">

Released:

{" "}

{new Date(
policy.created_at
).toLocaleDateString(
"en-GB"
)}

</div>





<span className="
inline-block
mt-5
px-4
py-2
bg-green-100
text-green-700
font-black
text-sm
border
border-green-300
">

Civil Release

</span>




</Link>


))


}



</div>


}



</section>





</div>


</section>


</main>


);


}
