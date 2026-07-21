import Link from "next/link";
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

}=await supabaseAdmin

.from("security_subjects")

.select(`

id,

organisation,

subject_type,

roblox_username,

roblox_user_id,

status,

created_at,


security_clearances(

id,

clearance_level,

blacklisted,

blacklist_reason,

expires_at,

notes,


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









return (

<main className="
min-h-screen
bg-[#F5F8FB]
">







<section className="
bg-[#003B6F]
text-white
px-6
py-16
">


<div className="
max-w-5xl
mx-auto
">


<p className="
uppercase
tracking-[0.3em]
text-[#F2C94C]
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

Clearance Verification

</h1>






<p className="
mt-4
text-blue-100
">

Official public security authorisation record.

</p>



</div>


</section>









<section className="
max-w-5xl
mx-auto
px-6
py-12
">







{/* ID CARD */}


<div className="
bg-white
shadow-xl
border
p-10
">





<div className="
flex
justify-between
items-start
gap-5
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
font-bold
text-gray-500
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
grid
md:grid-cols-2
gap-6
mt-10
">





<Info

title="Roblox Username"

value={
subject.roblox_username || "Organisation Record"
}

/>




<Info

title="Roblox User ID"

value={
subject.roblox_user_id || "N/A"
}

/>




<Info

title="Organisation"

value={
subject.organisation || "Individual"
}

/>




<Info

title="Record Created"

value={
new Date(
subject.created_at
)
.toLocaleDateString()
}

/>




</div>







</div>









{/* CLEARANCES */}


<div className="
mt-12
">


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Authorised Areas

</h2>





<div className="
grid
md:grid-cols-2
gap-6
mt-6
">







{

subject.security_clearances?.map(

(c:any)=>(



<div

key={c.id}

className="
bg-white
border
shadow-sm
p-7
"


>



<div className="
flex
justify-between
items-center
">


<h3 className="
text-xl
font-black
text-[#003B6F]
">

{c.security_areas?.name}

</h3>




<ClearanceLevel

level={
c.clearance_level
}

/>



</div>








<p className="
mt-4
text-gray-600
">

{c.security_areas?.description}

</p>







{

c.expires_at &&

<p className="
mt-4
text-sm
font-bold
text-gray-500
">

Expires:

{" "}

{
new Date(
c.expires_at
)
.toLocaleDateString()
}

</p>

}





{

c.blacklisted &&

<div className="
mt-6
bg-red-100
border
border-red-400
p-4
">


<p className="
font-black
text-red-700
">

BLACKLISTED

</p>


<p className="
mt-2
text-red-700
">

{
c.blacklist_reason ||
"No reason provided"

}

</p>


</div>

}




</div>


)

)

}





</div>





</div>









<Link

href="/clearance"

className="
inline-block
mt-12
bg-[#003B6F]
text-white
px-8
py-4
font-black
"

>

← Return Registry

</Link>








</section>






</main>


);

}








function Info({

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
font-bold
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









function ClearanceLevel({

level

}:{

level:number

}){


const styles:any={


1:"bg-green-100 text-green-700",

2:"bg-blue-100 text-blue-700",

3:"bg-yellow-100 text-yellow-700",

4:"bg-orange-100 text-orange-700"


};




return (

<span className={`
px-4
py-2
font-black
${styles[level]}
`}>

CL{level}

</span>

);


}








function StatusBadge({

status

}:{

status:string

}){


const states:any={


verified:[

"✓ VERIFIED",

"bg-green-100 text-green-700"

],


suspended:[

"⚠ SUSPENDED",

"bg-yellow-100 text-yellow-700"

],


revoked:[

"✕ REVOKED",

"bg-red-100 text-red-700"

],


expired:[

"EXPIRED",

"bg-gray-200 text-gray-700"

]


};





const current =
states[status] || states.verified;




return (

<span className={`
px-5
py-3
font-black
${current[1]}
`}>

{current[0]}

</span>

);


}
