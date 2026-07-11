import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function RecruitmentPage(){


const careers = [

    {
        title:"Special Response Team",
        short:"SRT",
        icon:"🚨",
        description:
        "Elite operational personnel trained for high-risk response, tactical deployments, and specialised security missions.",
        href:"/divisions/special-response-team"
    },


    {
        title:"Law Enforcement Helicopter Taskforce",
        short:"LEHT",
        icon:"🚁",
        description:
        "Aviation specialists providing rapid response, aerial support, and operational assistance to DHS missions.",
        href:"/divisions/helicopter-taskforce"
    },


    {
        title:"United States Secret Service",
        short:"USSS",
        icon:"🛡️",
        description:
        "Protecting national leadership and supporting critical security operations through elite protective services.",
        href:"/divisions/secret-service"
    },


    {
        title:"United States Customs and Border Protection",
        short:"CBP",
        icon:"🌎",
        description:
        "Securing borders, protecting communities, and supporting national security through dedicated enforcement.",
        href:"/divisions/cbp"
    },


    {
        title:"Public Affairs",
        short:"PAO",
        icon:"📢",
        description:
        "Managing communications, public information, and transparency between DHS and the communities we serve.",
        href:"/divisions/public-affairs"
    }


];






return (

<main className="
max-w-7xl
mx-auto
px-6
py-20
">

<Breadcrumb />

<div className="
bg-white
shadow-2xl
border
border-gray-200
overflow-hidden
">



{/* GOLD HEADER STRIPE */}

<div className="
h-3
bg-[#F2C94C]
"/>






<section className="
relative
bg-[#003B6F]
text-white
p-10
md:p-16
overflow-hidden
">


<div className="
absolute
inset-0
opacity-10
bg-[linear-gradient(45deg,transparent_45%,white_46%,transparent_47%),linear-gradient(-45deg,transparent_45%,white_46%,transparent_47%)]
bg-[length:120px_120px]
"/>





<div className="
relative
z-10
">


<p className="
uppercase
tracking-[0.3em]
text-sm
font-bold
text-[#F2C94C]
">

Department of Homeland Security

</p>




<h1 className="
mt-5
text-5xl
md:text-6xl
font-black
">

Careers

</h1>




<p className="
mt-6
text-xl
text-gray-200
max-w-3xl
leading-relaxed
">

Join the Department of Homeland Security and become part of a team dedicated to protecting communities, supporting national security, and serving with integrity.

</p>




<Link

href="/careers/apply"

className="
inline-flex
mt-8
bg-[#F2C94C]
text-black
px-8
py-4
font-bold
text-lg
hover:bg-yellow-300
transition
"

>

Start Your Application →

</Link>



</div>



</section>









<section className="
p-10
md:p-14
">



<div className="
text-center
max-w-3xl
mx-auto
">


<h2 className="
text-4xl
font-bold
text-[#003B6F]
">

Find Your Place Within DHS

</h2>



<p className="
mt-4
text-lg
text-gray-600
">

Our personnel serve across multiple operational areas, each contributing to the Department's mission of security, service, and protection.

</p>


</div>









<div className="
mt-12
grid
md:grid-cols-2
gap-8
">


{
careers.map((career)=>(


<Link

href={career.href}

key={career.title}

className="
group
relative
border
border-gray-200
bg-white
p-8
shadow-md
hover:shadow-2xl
transition-all
duration-300
overflow-hidden
"

>


{/* Hover Accent */}

<div className="
absolute
left-0
top-0
bottom-0
w-1
bg-[#003B6F]
group-hover:bg-[#F2C94C]
transition
"/>






<div className="
flex
items-start
gap-6
">


<div className="
text-6xl
group-hover:scale-110
transition
">

{career.icon}

</div>




<div>


<p className="
text-sm
font-bold
tracking-widest
text-[#003B6F]
">

{career.short}

</p>




<h3 className="
mt-2
text-2xl
font-bold
text-gray-900
">

{career.title}

</h3>




<p className="
mt-4
text-gray-600
leading-relaxed
">

{career.description}

</p>




<div className="
mt-6
font-bold
text-[#003B6F]
">

Explore Career →

</div>



</div>



</div>



</Link>


))

}


</div>








<section className="
mt-16
relative
bg-gray-50
border
border-gray-200
p-10
md:p-12
">


<div className="
absolute
left-0
top-0
bottom-0
w-2
bg-[#F2C94C]
"/>



<h2 className="
text-3xl
font-bold
text-[#003B6F]
">

A Career Built Around Service

</h2>



<p className="
mt-4
text-gray-700
text-lg
max-w-4xl
">

Whether responding to emergencies, protecting national leaders, securing borders, supporting aviation operations, or informing the public, every DHS employee contributes to a larger mission.

</p>


</section>







<section className="
mt-12
bg-[#003B6F]
text-white
p-10
md:p-14
text-center
">


<h2 className="
text-4xl
font-bold
">

Ready To Make A Difference?

</h2>


<p className="
mt-4
text-lg
text-gray-200
">

Your next mission starts here.

</p>




<Link

href="/careers/apply"

className="
inline-flex
mt-8
bg-[#F2C94C]
text-black
px-8
py-4
font-bold
hover:bg-yellow-300
transition
"

>

Apply To Join DHS →

</Link>



</section>






</section>





</div>


</main>


);


}
