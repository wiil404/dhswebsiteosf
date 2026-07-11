import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";


export default function RecruitmentPage(){


const careers = [


    {
        title:"Special Response Team",
        short:"SRT",
        image:"/careers/srt.jpg",
        description:
        "Elite operational personnel trained for high-risk response, tactical deployments, and specialised security missions.",
        href:"/divisions/special-response-team"
    },


    {
        title:"Law Enforcement Helicopter Taskforce",
        short:"LEHT",
        image:"/careers/leht.jpg",
        description:
        "Aviation specialists providing rapid response, aerial support, and operational assistance to DHS missions.",
        href:"/divisions/helicopter-taskforce"
    },


    {
        title:"United States Secret Service",
        short:"USSS",
        image:"/careers/usss.jpg",
        description:
        "Protecting national leadership and supporting critical security operations through elite protective services.",
        href:"/divisions/secret-service"
    },


    {
        title:"United States Customs and Border Protection",
        short:"USCBP",
        image:"/careers/cbp.jpg",
        description:
        "Securing borders, protecting communities, and supporting national security through dedicated enforcement.",
        href:"/divisions/cbp"
    },


    {
        title:"Public Affairs",
        short:"PAO",
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
py-20
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





{/* GOLD HEADER */}

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
max-w-4xl
leading-relaxed
"

>

Join the Department of Homeland Security and become part of a team dedicated to protecting communities, supporting national security, and serving with integrity.

</p>






<Link

href="/careers/apply"

className="
inline-flex
mt-8
items-center
gap-3
bg-[#F2C94C]
text-black
px-8
py-4
font-black
text-lg
shadow-lg
hover:bg-white
transition
"

>

Start Your Application

<span>
→
</span>


</Link>



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
max-w-3xl
"

>


<p

className="
uppercase
tracking-widest
text-sm
font-bold
text-[#003B6F]
"

>

Choose Your Path

</p>





<h2

className="
mt-3
text-4xl
font-black
text-[#003B6F]
"

>

Find Your Place Within DHS

</h2>






<p

className="
mt-5
text-lg
text-gray-600
leading-relaxed
"

>

Every DHS employee contributes to a larger mission. Explore our operational divisions and discover where your skills, dedication, and commitment to service can make a difference.

</p>



</div>









{/* CAREER CARDS */}


<div

className="
grid
md:grid-cols-2
gap-8
mt-12
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
h-[430px]
overflow-hidden
shadow-xl
border
border-gray-200
"

>



<img

src={career.image}

alt={career.title}

className="
absolute
inset-0
w-full
h-full
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








{/* BADGE */}


<div

className="
absolute
top-6
left-6
"

>


<div

className="
bg-[#F2C94C]
text-black
px-5
py-2
font-black
tracking-widest
shadow-lg
"

>

{career.short}

</div>


</div>









{/* CONTENT */}


<div

className="
absolute
bottom-0
p-8
text-white
"

>


<h3

className="
text-3xl
font-black
"

>

{career.title}

</h3>






<p

className="
mt-4
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
items-center
gap-3
bg-white
text-[#003B6F]
px-6
py-3
font-black
group-hover:bg-[#F2C94C]
transition
"

>

Explore Division

<span>
→
</span>


</div>





</div>







</Link>


))


}



</div>







{/* SERVICE MESSAGE */}



<section

className="
mt-16
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
font-black
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
leading-relaxed
"

>

Whether responding to emergencies, protecting national leadership, securing borders, supporting aviation operations, or informing the public, every DHS employee contributes to a mission greater than themselves.

</p>




</section>









{/* FINAL CTA */}


<section

className="
mt-12
bg-[#003B6F]
text-white
p-10
md:p-14
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

Apply To Join DHS

<span>
→
</span>


</Link>





</section>






</section>







</div>





</main>


);


}
