import Link from "next/link";
import Image from "next/image";



const divisions = {


top:[

{
name:"Special Response Team",
short:"SRT",
route:"special-response-team",
image:"/divisions/srt/hero.jpg",
description:
"The Department's premier tactical response capability."
},


{
name:"United States Secret Service",
short:"USSS",
route:"secret-service",
image:"/divisions/usss/hero.jpg",
description:
"Elite protective operations and national security."
}

],



middle:[

{
name:"United States Customs and Border Protection",
short:"CBP",
route:"cbp",
image:"/divisions/cbp/hero.jpg",
description:
"Securing borders and protecting communities."
},


{
name:"Law Enforcement Helicopter Taskforce",
short:"LEHT",
route:"helicopter-taskforce",
image:"/divisions/leht/hero.jpg",
description:
"Providing aviation support and rapid response."
}

],



bottom:[

{
name:"Public Affairs",
short:"PAO",
route:"public-affairs",
image:"/divisions/pao/hero.jpg",
description:
"Communicating the DHS mission with the public."
}

]


};








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
overflow-hidden
h-[260px]
shadow-xl
border
border-gray-200
"

>


<Image

src={division.image}

fill

alt={division.name}

className="
object-cover
group-hover:scale-110
transition
duration-700
"

/>





<div

className="
absolute
inset-0
bg-gradient-to-t
from-[#003B6F]
via-[#003B6F]/70
to-transparent
"

/>





<div

className="
absolute
bottom-0
p-6
text-white
"

>



<p

className="
text-[#F2C94C]
font-black
tracking-widest
"

>

{division.short}

</p>





<h3

className="
text-2xl
font-black
mt-2
"

>

{division.name}

</h3>





<p

className="
mt-3
text-gray-200
"

>

{division.description}

</p>



</div>




</Link>


);


}









export default function DepartmentStructure(){



return (


<section

className="
py-24
bg-gray-50
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
"

>


<p

className="
uppercase
tracking-[0.3em]
font-black
text-[#003B6F]
"

>

Department Organisation

</p>





<h2

className="
mt-4
text-5xl
font-black
text-[#003B6F]
"

>

How DHS Operates

</h2>




<p

className="
mt-5
max-w-3xl
mx-auto
text-lg
text-gray-600
"

>

The Department of Homeland Security operates through
specialised divisions, each contributing unique capabilities
to protect the nation and support our communities.

</p>


</div>









{/* SECRETARY */}


<div

className="
mt-14
flex
justify-center
"

>


<div

className="
bg-[#003B6F]
text-white
px-12
py-8
text-center
shadow-xl
border-t-4
border-[#F2C94C]
"

>


<p

className="
text-[#F2C94C]
font-black
tracking-widest
"

>

EXECUTIVE LEADERSHIP

</p>



<h3

className="
text-3xl
font-black
mt-2
"

>

Secretary of Homeland Security

</h3>



</div>



</div>







<div

className="
h-16
w-px
bg-[#003B6F]
mx-auto
"

/>










{/* TOP DIVISIONS */}


<div

className="
grid
md:grid-cols-2
gap-8
"

>

{

divisions.top.map(

division=>(

<DivisionCard

key={division.short}

division={division}

/>

)

)

}

</div>







<div

className="
h-16
w-px
bg-[#003B6F]
mx-auto
"

/>







{/* MIDDLE DIVISIONS */}


<div

className="
grid
md:grid-cols-2
gap-8
"

>

{

divisions.middle.map(

division=>(

<DivisionCard

key={division.short}

division={division}

/>

)

)

}

</div>







<div

className="
h-16
w-px
bg-[#003B6F]
mx-auto
"

/>







{/* FINAL DIVISION */}


<div

className="
flex
justify-center
"

>


<div className="w-full md:w-1/2">


{

divisions.bottom.map(

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







</div>


</section>


);


}