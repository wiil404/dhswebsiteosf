import Image from "next/image";
import Link from "next/link";



const divisions = [

{
name:"Special Response Team",
short:"SRT",
route:"special-response-team",
image:"/divisions/srt/hero.jpg",
category:"TACTICAL OPERATIONS",
description:
"The Department's premier tactical response capability. SRT operators specialise in high-risk response, advanced operations, and missions requiring exceptional skill and readiness."
},



{
name:"United States Secret Service",
short:"USSS",
route:"secret-service",
image:"/divisions/usss/hero.jpg",
category:"PROTECTIVE OPERATIONS",
description:
"Protecting national leadership through elite security operations, threat prevention, and specialised protective services."
},



{
name:"United States Customs and Border Protection",
short:"CBP",
route:"cbp",
image:"/divisions/cbp/hero.jpg",
category:"BORDER SECURITY",
description:
"Securing the nation's borders while protecting communities through professional enforcement and operational excellence."
},



{
name:"Law Enforcement Helicopter Taskforce",
short:"LEHT",
route:"helicopter-taskforce",
image:"/divisions/leht/hero.jpg",
category:"AVIATION OPERATIONS",
description:
"Providing DHS with aviation capability through skilled pilots, flight officers, and aerial response specialists."
},



{
name:"Public Affairs",
short:"PAO",
route:"public-affairs",
image:"/divisions/pao/hero.jpg",
category:"COMMUNICATIONS",
description:
"Connecting DHS operations with the public through communication, transparency, and trusted information."
}

];










export default function DivisionShowcase(){


return (


<section

className="
py-24
bg-[#003B6F]
"

>


<div

className="
max-w-7xl
mx-auto
px-6
"

>





<div

className="
text-center
text-white
"

>


<p

className="
uppercase
tracking-[0.3em]
font-black
text-[#F2C94C]
"

>

DHS DIVISIONS

</p>




<h2

className="
mt-4
text-5xl
font-black
"

>

The People Behind The Mission

</h2>




<p

className="
mt-5
max-w-3xl
mx-auto
text-gray-200
text-lg
"

>

Across specialised divisions, DHS personnel work together
to protect the nation, support communities, and respond
to evolving challenges.

</p>



</div>









{/* FEATURED TOP ROW */}


<div

className="
grid
md:grid-cols-2
gap-8
mt-16
"

>


{

divisions.slice(0,2).map(

division=>(


<DivisionCard

key={division.short}

division={division}

/>


)

)

}


</div>










{/* SECOND ROW */}


<div

className="
grid
md:grid-cols-3
gap-8
mt-8
"

>


{

divisions.slice(2).map(

division=>(


<DivisionCard

key={division.short}

division={division}

/>


)

)

}


</div>







</div>


</section>


);


}









function DivisionCard({

division

}:{

division:any

}){


return (

<Link

href={`/divisions/${division.route}`}

className="
group
relative
h-[420px]
overflow-hidden
shadow-2xl
border
border-white/20
block
"

>


<Image

src={division.image}

fill

alt={division.name}

className="
object-cover
transition
duration-700
group-hover:scale-110
"

/>







<div

className="
absolute
inset-0
bg-gradient-to-t
from-[#001F3F]
via-[#003B6F]/60
to-transparent
"

/>







<div

className="
absolute
bottom-0
p-8
text-white
"

>





<p

className="
text-[#F2C94C]
font-black
tracking-widest
text-sm
"

>

{division.category}

</p>






<h3

className="
mt-3
text-3xl
font-black
"

>

{division.short}

</h3>






<h4

className="
text-xl
font-bold
"

>

{division.name}

</h4>







<p

className="
mt-4
text-gray-200
leading-relaxed
"

>

{division.description}

</p>






<div

className="
inline-flex
mt-6
bg-[#F2C94C]
text-black
px-6
py-3
font-black
"

>

Explore Division →

</div>





</div>






</Link>


);


}