import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function CivilPolicyView({

params

}:{

params: Promise<{
id:string
}>

}){


const {
id

}=await params;



const {

data:policy,

error

}=await supabaseAdmin

.from("policies")

.select(`

*,

divisions(

name

)

`)

.eq(
"id",
id
)

.eq(
"tag",
"Civil"
)

.eq(
"status",
"Approved"
)

.single();




if(error || !policy){

notFound();

}






return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-6xl
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
">


<p className="
uppercase
tracking-[0.35em]
text-[#F2C94C]
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

{policy.title}

</h1>



<p className="
mt-4
text-blue-100
">

Public Civil Policy Release

</p>


</header>








<section className="
p-10
space-y-10
">






<div className="
grid
md:grid-cols-3
gap-5
">



<Card

title="Policy Number"

value={policy.policy_number}

/>



<Card

title="Category"

value={policy.category || "General"}

/>



<Card

title="Classification"

value="Public Release"

/>



</div>








{

policy.featured_image && (

<img

src={policy.featured_image}

className="
w-full
max-h-[500px]
object-cover
border
"

/>

)

}









<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
mb-5
">

Policy Content

</h2>



<div

className="
border
bg-gray-50
p-8
prose
max-w-none
"

dangerouslySetInnerHTML={{

__html:policy.content

}}

/>


</section>









{

policy.attachments?.length > 0 && (

<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Attachments

</h2>




<div className="
mt-5
space-y-3
">


{

policy.attachments.map((file:any)=>(


<a

key={file.url}

href={file.url}

target="_blank"

className="
block
border
p-4
bg-gray-50
hover:bg-blue-50
"

>

📎 {file.name}

</a>


))

}


</div>


</section>


)

}








<div className="
bg-green-50
border
border-green-300
p-6
">


<h2 className="
text-xl
font-black
text-green-800
">

Public Release

</h2>



<p className="
mt-2
text-green-900
">

This document has been released publicly by the Department of Homeland Security.

No employee acknowledgement is required.

</p>


</div>







</section>





</div>


</section>


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
bg-[#F5F8FB]
border
p-5
">


<p className="
text-xs
uppercase
font-black
text-gray-500
">

{title}

</p>



<p className="
mt-2
font-black
text-[#003B6F]
">

{value}

</p>


</div>


);


}