import { supabaseAdmin } from "@/app/lib/supabase-admin";
import Link from "next/link";


export const dynamic="force-dynamic";


export default async function CivilPoliciesPage(){


const {data:policies,error}=await supabaseAdmin

.from("policies")

.select(`

id,
title,
description,
tag,
published,
created_at

`)

.eq(
"tag",
"Civil"
)

.eq(
"published",
true
)

.order(
"created_at",
{
ascending:false
}

);




if(error){

console.error(error);

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
bg-[#003B6F]
text-white
p-10
">


<p className="
text-[#F2C94C]
uppercase
tracking-widest
font-black
">

Department of Homeland Security

</p>



<h1 className="
text-5xl
font-black
mt-4
">

Civil Policies

</h1>



<p className="
mt-4
text-blue-100
">

Publicly available Department policies and guidance.

</p>



</header>




<section className="
p-10
">


{

(!policies || policies.length===0)

?

<div className="
bg-[#F5F8FB]
border
p-8
font-bold
text-gray-500
text-center
">

No civil policies have been released.

</div>


:

<div className="
grid
md:grid-cols-2
gap-6
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
p-6
hover:shadow-xl
transition
"

>


<h2 className="
text-2xl
font-black
text-[#003B6F]
">

{policy.title}

</h2>



<p className="
mt-3
text-gray-600
">

{policy.description}

</p>



<div className="
mt-5
text-sm
font-bold
text-gray-500
">

Released {new Date(policy.created_at).toLocaleDateString("en-GB")}

</div>



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