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







const registryId =
generateRegistryID(
subject.id,
subject.subject_type
);






const activeClearances =
subject.security_clearances?.length || 0;









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
tracking-[0.35em]
font-bold
text-sm
">

Department of Homeland Security

</p>





<h1 className="
text-6xl
font-black
mt-5
">

Security Clearance

</h1>





<p className="
mt-4
text-blue-100
text-xl
">

Official public verification record

</p>



</div>


</section>









<section className="
max-w-6xl
mx-auto
px-6
py-12
">







{/* CREDENTIAL */}



<div className="
bg-white
shadow-2xl
border
overflow-hidden
">



<div className="
bg-gradient-to-r
from-[#003B6F]
to-[#005AA7]
p-10
text-white
">





<div className="
flex
justify-between
items-start
gap-5
">


<div>


<div className="
w-24
h-24
rounded-full
border-4
border-white
flex
items-center
justify-center
text-4xl
font-black
">

DHS

</div>






<h2 className="
text-5xl
font-black
mt-8
">

{

subject.roblox_username ||

subject.organisation ||

"Unknown"

}

</h2>




<p className="
uppercase
tracking-widest
mt-3
text-blue-100
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



</div>







<div className="
p-10
">





<div className="
grid
md:grid-cols-3
gap-5
">





<Stat

title="Registry ID"

value={
registryId
}

/>





<Stat

title="Clearance Areas"

value={
String(activeClearances)
}

/>





<Stat

title="Record Status"

value={
subject.status?.toUpperCase() || "VERIFIED"
}

/>





</div>






<div className="
grid
md:grid-cols-2
gap-6
mt-8
">





<Info

title="Roblox Username"

value={
subject.roblox_username || "Organisation Account"
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
subject.organisation || "Independent Personnel"
}

/>





<Info

title="Issued"

value={
new Date(
subject.created_at
)
.toLocaleDateString()
}

/>



</div>




</div>



</div>









{/* ACCESS GRID */}



<section className="
mt-14
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Authorised Access

</h2>






<div className="
grid
md:grid-cols-2
gap-8
mt-8
">






{

subject.security_clearances?.map(

(c:any)=>(



<div

key={c.id}

className="
bg-white
border
shadow-lg
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
w-2
bg-[#F2C94C]
"/>






<div className="
flex
justify-between
items-center
">


<div>


<h3 className="
text-2xl
font-black
text-[#003B6F]
">

{
c.security_areas?.name
}

</h3>


<p className="
text-gray-500
mt-2
">

{
c.security_areas?.description
}

</p>


</div>






<ClearanceBadge

level={
c.clearance_level
}

/>



</div>








{

c.expires_at &&

<p className="
mt-6
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
p-5
">


<h4 className="
font-black
text-red-700
">

ACCESS REVOKED

</h4>



<p className="
text-red-700
mt-2
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


</section>









{/* FOOTER */}


<div className="
mt-14
bg-white
border
p-8
text-center
">


<p className="
text-green-600
font-black
text-xl
">

✓ AUTHENTICATED SECURITY RECORD

</p>



<p className="
mt-3
text-gray-500
">

This record is maintained by the Department of Homeland Security Clearance Registry.

</p>



<p className="
mt-5
font-black
text-[#003B6F]
">

{registryId}

</p>


</div>







<Link

href="/clearance"

className="
inline-block
mt-10
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









function generateRegistryID(

id:string,

type:string

){


const number =
parseInt(
id.replace(/-/g,"").slice(0,5),
16
)
.toString()
.slice(0,5)
.padStart(5,"0");



const prefix =
type==="organisation"
?
"1H"
:
"2H";



return `DHS${prefix}${number}`;

}








function Stat({

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
p-6
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
mt-3
text-2xl
font-black
text-[#003B6F]
">

{value}

</p>


</div>

);


}









function Info({

title,

value

}:{

title:string;

value:string

}){


return (

<div className="
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









function ClearanceBadge({

level

}:{

level:number

}){


const data:any={

1:["CL1","bg-green-100 text-green-700"],

2:["CL2","bg-blue-100 text-blue-700"],

3:["CL3","bg-yellow-100 text-yellow-700"],

4:["CL4","bg-orange-100 text-orange-700"]

};



return (

<div className={`
px-5
py-4
font-black
text-xl
${data[level]?.[1]}
`}>

{data[level]?.[0]}

</div>

);


}








function StatusBadge({

status

}:{

status:string

}){


return (

<div className="
bg-green-100
text-green-700
px-6
py-3
font-black
">

✓ {status?.toUpperCase() || "VERIFIED"}

</div>

);


}
