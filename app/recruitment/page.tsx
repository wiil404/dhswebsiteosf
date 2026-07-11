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
py-16
">


{/* BREADCRUMB AREA */}

<div className="
mb-8
bg-white
border
border-gray-200
shadow-sm
px-6
py-4
">

<Breadcrumb />

</div>







<div className="
bg-white
shadow-2xl
border
border-gray-200
overflow-hidden
">





<div className="
h-3
bg-[#F2C94C]
"/>







{/* HERO */}

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
tracking-[0.35em]
text-sm
font-bold
text-[#F2C94C]
">

Department of Homeland Security

</p>




<h1 className="
mt-5
text-5xl
md:text-7xl
font-black
">

Careers

</h1>




<p className="
mt-6
text-xl
leading-relaxed
text-gray-200
max-w-4xl
">

Join the Department of Homeland Security and become part of a team dedicated to protecting communities, supporting national security, and serving with integrity.

</p>





<Link

href="/careers/apply"

className="
inline-flex
items-center
mt-10
border-2
border-[#F2C94C]
text-[#F2C94C]
px-8
py-4
font-bold
uppercase
tracking-wide
hover:bg-[#F2C94C]
hover:text-[#003B6F]
transition
duration-300
"

>

Begin Application →

</Link>



</div>


</section>









{/* CAREERS */}

<section className="
p-10
md:p-14
">


<div className="
text-center
max-w-4xl
mx-auto
">


<p className="
uppercase
tracking-[0.25em]
text-sm
font-bold
text-[#003B6F]
">

Operational Divisions

</p>



<h2 className="
mt-4
text-4xl
md:text-5xl
font-black
text-[#003B6F]
">

Find Your Place Within DHS

</h2>



<p className="
mt-5
text-lg
text-gray-600
">

Every division plays a vital role in protecting the nation. Explore available career paths and discover where your service can make the greatest impact.

</p>


</div>








<div className="
mt-14
grid
md:grid-cols-2
gap-8
">


{
careers.map((career)=>(


<Link

key={career.title}

href={career.href}

className="
group
relative
bg-white
border
border-gray-200
shadow-md
hover:shadow-2xl
transition-all
duration-300
overflow-hidden
"

>




<div className="
h-2
bg-[#003B6F]
group-hover:bg-[#F2C94C]
transition
"/>







<div className="
p-8
">


<div className="
flex
gap-6
items-start
">


<div className="
text-5xl
group-hover:scale-110
transition
duration-300
">

{career.icon}

</div>






<div className="flex-1">


<p className="
text-xs
font-black
tracking-[0.25em]
text-[#003B6F]
">

{career.short}

</p>





<h3 className="
mt-3
text-2xl
font-black
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
mt-8
inline-flex
items-center
border
border-[#003B6F]
px-5
py-3
text-sm
font-bold
uppercase
tracking-wide
text-[#003B6F]
group-hover:bg-[#003B6F]
group-hover:text-white
transition
">

View Division →

</div>



</div>



</div>



</div>





</Link>


))

}



</div>




</section>









{/* MISSION SECTION */}

<section className="
mx-10
mb-10
relative
bg-gray-50
border
border-gray-200
p-10
md:p-12
overflow-hidden
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
font-black
text-[#003B6F]
">

A Career Built Around Service

</h2>




<p className="
mt-5
text-lg
text-gray-700
max-w-5xl
leading-relaxed
">

Whether responding to emergencies, protecting national leaders, securing borders, supporting aviation operations, or informing the public, every DHS employee contributes to a mission larger than themselves.

</p>


</section>








{/* FINAL CTA */}

<section className="
bg-[#003B6F]
text-white
p-12
md:p-16
text-center
">


<h2 className="
text-4xl
font-black
">

Ready To Make A Difference?

</h2>



<p className="
mt-4
text-xl
text-gray-200
">

Your next mission starts here.

</p>





<Link

href="/careers/apply"

className="
inline-flex
mt-8
border-2
border-[#F2C94C]
text-[#F2C94C]
px-10
py-4
font-bold
uppercase
tracking-wide
hover:bg-[#F2C94C]
hover:text-[#003B6F]
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
