import Link from "next/link";
import { notFound } from "next/navigation";

import { supabaseAdmin } from "../../lib/supabase-admin";

import DHSSeal from "../../components/clearance/DHSSeal";
import PrintButton from "../../components/clearance/PrintButton";



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

verified_at,

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







const registryID =
generateRegistryID(
subject.id,
subject.subject_type
);




const clearances =
subject.security_clearances || [];





const verifiedAt =
subject.verified_at ||

subject.created_at;







return (

<main className="
min-h-screen
bg-[#F5F8FB]
print:bg-white
">







<section className="
bg-[#003B6F]
text-white
px-6
py-16
print:bg-white
print:text-black
">


<div className="
max-w-6xl
mx-auto
">



<div className="
flex
items-center
gap-8
">


<DHSSeal />



<div>


<p className="
uppercase
tracking-[0.35em]
text-[#F2C94C]
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

Security Clearance Certificate

</h1>




<p className="
mt-3
text-blue-100
">

Official public verification record

</p>



</div>



</div>



</div>


</section>










<section className="
max-w-6xl
mx-auto
px-6
py-12
">






<div className="
relative
bg-white
shadow-2xl
border
overflow-hidden
print:shadow-none
">





{/* SCAN ANIMATION */}


<div className="
absolute
top-0
left-0
w-full
h-1
bg-[#F2C94C]
animate-pulse
print:hidden
"/>







<div className="
bg-gradient-to-r
from-[#003B6F]
to-[#005AA7]
text-white
p-10
">





<div className="
flex
justify-between
items-start
gap-8
">



<div>



<h2 className="
text-5xl
font-black
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

{subject.subject_type}

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
md:grid-cols-4
gap-5
">





<Stat

title="Registry ID"

value={
registryID
}

/>





<Stat

title="Access Areas"

value={
String(clearances.length)
}

/>





<Stat

title="Classification"

value="
DHS"
 
/>





<Stat

title="Verification"

value="
ACTIVE"
 
/>





</div>








<div className="
grid
md:grid-cols-2
gap-6
mt-10
">






<InfoCard

title="Roblox Username"

value={
subject.roblox_username ||
"N/A"
}

/>





<InfoCard

title="Roblox User ID"

value={
subject.roblox_user_id ||
"N/A"
}

/>





<InfoCard

title="Organisation"

value={
subject.organisation ||
"Individual Personnel"
}

/>





<InfoCard

title="Issued Date"

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



<section className="
mt-14
print:mt-8
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Authorised Access Profile

</h2>



<p className="
mt-2
text-gray-500
">

Approved facilities and security classification levels.

</p>







<div className="
grid
md:grid-cols-2
gap-8
mt-8
">





{

clearances.map(

(clearance:any)=>(


<div

key={clearance.id}

className="
relative
bg-white
border
shadow-lg
p-8
overflow-hidden
"

>


<div className={`
absolute
left-0
top-0
h-full
w-2
${

clearance.blacklisted

?

"bg-red-600"

:

clearance.clearance_level === 4

?

"bg-orange-500"

:

clearance.clearance_level === 3

?

"bg-yellow-500"

:

clearance.clearance_level === 2

?

"bg-blue-500"

:

"bg-green-500"

}

`}/>





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
clearance.security_areas?.name
}

</h3>



<p className="
mt-3
text-gray-600
">

{
clearance.security_areas?.description
}

</p>



</div>







<ClearanceBadge

level={
clearance.clearance_level
}

/>




</div>







<div className="
mt-8
">


<AccessBar

level={
clearance.clearance_level
}

/>


</div>







{

clearance.expires_at &&

<p className="
mt-6
text-sm
font-bold
text-gray-500
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

}





{

clearance.blacklisted &&

<div className="
mt-6
bg-red-100
border
border-red-400
p-5
">


<p className="
text-red-700
font-black
">

ACCESS REVOKED

</p>



<p className="
text-red-600
mt-2
">

{
clearance.blacklist_reason ||
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









{/* VERIFICATION PANEL */}


<section className="
mt-14
bg-white
border
shadow-xl
p-10
text-center
">


<div className="
text-5xl
">

✓

</div>



<h2 className="
mt-4
text-3xl
font-black
text-green-600
">

VERIFIED SECURITY RECORD

</h2>





<p className="
mt-3
text-gray-600
">

This clearance record has been authenticated through the
Department of Homeland Security Clearance Registry.

</p>






<div className="
grid
md:grid-cols-3
gap-5
mt-8
">


<InfoCard

title="Registry Number"

value={
registryID
}

/>




<InfoCard

title="Verified"

value={
new Date(
verifiedAt
)
.toLocaleDateString()
}

/>




<InfoCard

title="Record"

value="ACTIVE"

/>



</div>




</section>









<div className="
mt-10
flex
gap-4
print:hidden
">


<PrintButton />





<Link

href="/clearance"

className="
bg-gray-200
px-8
py-4
font-black
"

>

Return Registry

</Link>


</div>







<footer className="
mt-14
bg-[#003B6F]
text-white
p-8
text-center
print:bg-white
print:text-black
">


<p className="
font-black
">

DEPARTMENT OF HOMELAND SECURITY

</p>



<p className="
mt-2
text-sm
opacity-80
">

Security Clearance Registry

</p>



<p className="
mt-4
font-bold
">

{registryID}

</p>


</footer>






</section>






</main>


);

}










function generateRegistryID(

id:string,

type:string

){



const numeric =

parseInt(

id.replace(/-/g,"").slice(0,8),

16

)

.toString()

.slice(0,5)

.padStart(
5,
"0"
);





const prefix =

type === "organisation"

?

"1H"

:

"2H";





return `DHS-${prefix}-${numeric}`;


}









function StatusBadge({

status

}:{

status:string | null

}){


const current =
(status || "verified")
.toLowerCase();





const styles:any={


verified:
"bg-green-100 text-green-700",


active:
"bg-green-100 text-green-700",


suspended:
"bg-yellow-100 text-yellow-700",


revoked:
"bg-red-100 text-red-700"


};





return (

<div className={`
px-6
py-3
font-black
${styles[current] || styles.verified}
`}>

✓ {current.toUpperCase()}

</div>


);


}









function ClearanceBadge({

level

}:{

level:number

}){


const levels:any={


1:{
name:"STANDARD",
style:"bg-green-100 text-green-700"
},


2:{
name:"LIMITED",
style:"bg-blue-100 text-blue-700"
},


3:{
name:"RESTRICTED",
style:"bg-yellow-100 text-yellow-700"
},


4:{
name:"EXECUTIVE",
style:"bg-orange-100 text-orange-700"
}



};




const item =
levels[level] || levels[1];





return (

<div className={`
px-5
py-4
font-black
text-center
${item.style}
`}>

<p>
CL{level}
</p>

<p className="
text-xs
mt-1
">

{item.name}

</p>


</div>


);


}









function AccessBar({

level

}:{

level:number

}){


return (

<div>


<div className="
flex
gap-1
">


{

[1,2,3,4].map(

(x)=>(


<div

key={x}

className={`
h-3
flex-1
${

x <= level

?

"bg-[#003B6F]"

:

"bg-gray-200"

}

`}

/>


)

)

}


</div>




<p className="
text-xs
uppercase
font-bold
text-gray-500
mt-2
">

Security Level {level}/4

</p>


</div>


);


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
text-xl
font-black
text-[#003B6F]
">

{value}

</p>


</div>


);


}









function InfoCard({

title,

value

}:{

title:string;

value:string

}){


return (

<div className="
border
bg-[#F5F8FB]
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
