import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";


export default function RecruitmentPage(){


const careers = [

{
    title:"Special Response Team",
    short:"SRT",
    icon:"🚨",
    image:"/careers/srt.jpg",
    description:
    "Elite operational personnel trained for high-risk response, tactical deployments, and specialised security missions.",
    href:"/divisions/special-response-team"
},


{
    title:"Law Enforcement Helicopter Taskforce",
    short:"LEHT",
    icon:"🚁",
    image:"/careers/leht.jpg",
    description:
    "Aviation specialists providing rapid response, aerial support, and operational assistance to DHS missions.",
    href:"/divisions/helicopter-taskforce"
},


{
    title:"United States Secret Service",
    short:"USSS",
    icon:"🛡️",
    image:"/careers/usss.jpg",
    description:
    "Protecting national leadership and supporting critical security operations through elite protective services.",
    href:"/divisions/secret-service"
},


{
    title:"United States Customs and Border Protection",
    short:"USCBP",
    icon:"🌎",
    image:"/careers/cbp.jpg",
    description:
    "Securing borders, protecting communities, and supporting national security through dedicated enforcement.",
    href:"/divisions/cbp"
},


{
    title:"Public Affairs",
    short:"PAO",
    icon:"📢",
    image:"/careers/pao.jpg",
    description:
    "Managing communications, public information, and transparency between DHS and the communities we serve.",
    href:"/divisions/public-affairs"
}


];






return (

<main

className="
max-w-7xl
mx-auto
px-6
py-16
"

>


<Breadcrumb />





<div

className="
bg-white
shadow-2xl
border
border-gray-200
overflow-hidden
"

>





{/* GOLD STRIPE */}

<div

className="
h-3
bg-[#F2C94C]
"

/>









{/* HERO */}


<section

className="
relative
bg-[#003B6F]
text-white
p-10
md:p-16
overflow-hidden
"

>


<div

className="
absolute
inset-0
opacity-10
bg-[linear-gradient(45deg,transparent_45%,white_46%,transparent_47%),linear-gradient(-45deg,transparent_45%,white_46%,transparent_47%)]
bg-[length:120px_120px]
"

/>




<div

className="
relative
z-10
"

>


<p

className="
uppercase
tracking-[0.3em]
text-sm
font-bold
text-[#F2C94C]
"

>

Department of Homeland Security

</p>





<h1

className="
mt-5
text-5xl
md:text-6xl
font-black
"

>

Careers

</h1>





<p

className="
mt-6
text-xl
text-gray-200
max-w-3xl
leading-relaxed
"

>

Join the Department of Homeland Security and become part of a team dedicated to protecting communities, supporting national security, and serving with integrity.

</p>







<div

className="
flex
flex-wrap
gap-4
mt-10
"

>



<Link

href="/careers/apply"

className="
inline-flex
items-center
gap-3
bg-[#F2C94C]
text-black
px-8
py-4
font-black
shadow-lg
hover:bg-white
transition
"

>

Start Application →

</Link>





<Link

href="/careers/applications"

className="
inline-flex
items-center
gap-3
border-2
border-white
text-white
px-8
py-4
font-black
hover:bg-white
hover:text-[#003B6F]
transition
"

>

View Application Status →

</Link>



</div>





</div>



</section>









{/* INTRO */}


<section

className="
p-10
md:p-14
"

>


<div

className="
text-center
max-w-4xl
mx-auto
"

>


<h2

className="
text-4xl
font-bold
text-[#003B6F]
"

>

Serve Something Greater

</h2>





<p

className="
mt-5
text-lg
text-gray-600
leading-relaxed
"

>

Every DHS employee contributes to a larger mission. Whether protecting national leadership, responding to threats, securing borders, supporting aviation operations, or communicating with the public, your role matters.

</p>



</div>



</section>









{/* DIVISION CARDS */}


<section

className="
px-10
md:px-14
pb-14
"

>


<div

className="
grid
md:grid-cols-2
gap-8
"

>



{
careers.map((career)=>(


<Link

key={career.title}

href={career.href}

className="
group
relative
h-[420px]
overflow-hidden
shadow-xl
border
border-gray-200
"

>


<Image

src={career.image}

alt={career.title}

fill

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
from-[#003B6F]
via-[#003B6F]/70
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


<div

className="
flex
items-center
gap-4
"

>


<div

className="
text-5xl
"

>

{career.icon}

</div>



<div>

<p

className="
text-[#F2C94C]
font-black
tracking-widest
text-sm
"

>

{career.short}

</p>


<h3

className="
text-3xl
font-black
"

>

{career.title}

</h3>


</div>



</div>







<p

className="
mt-5
text-gray-200
leading-relaxed
"

>

{career.description}

</p>






<div

className="
mt-6
inline-flex
bg-[#F2C94C]
text-black
px-5
py-2
font-bold
group-hover:bg-white
transition
"

>

Explore Division →

</div>



</div>





</Link>



))

}



</div>



</section>









{/* SERVICE MESSAGE */}



<section

className="
mx-10
md:mx-14
mb-14
relative
bg-gray-50
border
border-gray-200
p-10
md:p-12
"

>


<div

className="
absolute
left-0
top-0
bottom-0
w-2
bg-[#F2C94C]
"

/>



<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

A Career Built Around Service

</h2>





<p

className="
mt-4
text-lg
text-gray-700
max-w-4xl
"

>

From emergency response to public communication, every position within DHS plays a vital role in protecting the nation and supporting our communities.

</p>



</section>









{/* FINAL CTA */}



<section

className="
bg-[#003B6F]
text-white
p-12
md:p-16
text-center
"

>


<h2

className="
text-4xl
font-black
"

>

Ready To Make A Difference?

</h2>




<p

className="
mt-4
text-lg
text-gray-200
"

>

Your next mission starts here.

</p>





<Link

href="/careers/apply"

className="
inline-flex
mt-8
bg-[#F2C94C]
text-black
px-10
py-4
font-black
text-lg
hover:bg-white
transition
"

>

Apply To Join DHS →

</Link>



</section>








</div>





</main>


);


}
