import Link from "next/link";


export default function CareersPage(){


const divisions = [

    {
        title:"Special Response Team",
        description:
        "A highly trained tactical response division responsible for handling high-risk incidents, emergency deployments, and specialized security operations.",
        link:"/divisions/special-response-team",
        image:"🚨"
    },


    {
        title:"Law Enforcement Helicopter Taskforce",
        description:
        "Providing aerial support, rapid response capabilities, and operational assistance through advanced aviation assets.",
        link:"/divisions/helicopter-taskforce",
        image:"🚁"
    },


    {
        title:"United States Secret Service",
        description:
        "Protecting national leadership and supporting critical security operations through elite protective and investigative services.",
        link:"/divisions/secret-service",
        image:"🛡️"
    },


    {
        title:"United States Customs and Border Protection",
        description:
        "Safeguarding national borders, supporting immigration enforcement, and protecting communities through dedicated personnel.",
        link:"/divisions/cbp",
        image:"🌎"
    },


    {
        title:"Public Affairs",
        description:
        "Communicating DHS operations, managing public information, and ensuring transparency between the Department and the public.",
        link:"/divisions/public-affairs",
        image:"📢"
    }

];





return (

<main className="
max-w-7xl
mx-auto
px-6
py-20
">


<div className="
bg-white
shadow-xl
border
border-gray-200
overflow-hidden
">


{/* GOLD BAR */}

<div className="
h-2
bg-[#F2C94C]
"/>






<div className="
p-10
md:p-14
">





<p className="
uppercase
tracking-[0.25em]
font-bold
text-sm
text-[#003B6F]
">

Department of Homeland Security

</p>






<h1 className="
mt-5
text-5xl
font-bold
text-[#003B6F]
">

Join Our Mission

</h1>






<p className="
mt-6
text-xl
text-gray-700
max-w-4xl
leading-relaxed
">

The Department of Homeland Security is built by dedicated individuals committed to protecting communities, supporting national security, and serving with excellence.

</p>







<div className="
mt-10
border-l-4
border-[#003B6F]
bg-gray-50
p-6
">


<h2 className="
text-2xl
font-bold
text-[#003B6F]
">

Serve With Purpose

</h2>


<p className="
mt-3
text-gray-700
">

Whether operating on the front lines, supporting critical missions, or communicating with the public, every DHS member plays an essential role in protecting those we serve.

</p>


</div>









{/* DIVISIONS */}


<h2 className="
mt-14
text-4xl
font-bold
text-[#003B6F]
">

Explore Career Opportunities

</h2>




<div className="
mt-8
grid
md:grid-cols-2
gap-8
">


{
divisions.map((division)=>(


<Link

key={division.title}

href={division.link}

className="
group
border
border-gray-200
p-8
bg-white
shadow-sm
hover:shadow-xl
transition
relative
overflow-hidden
"


>


<div className="
absolute
top-0
left-0
h-1
w-full
bg-[#003B6F]
group-hover:bg-[#F2C94C]
transition
"/>





<div className="
flex
items-start
gap-5
">


<div className="
text-5xl
">

{division.image}

</div>




<div>


<h3 className="
text-2xl
font-bold
text-[#003B6F]
group-hover:text-[#00284d]
">

{division.title}

</h3>




<p className="
mt-3
text-gray-600
leading-relaxed
">

{division.description}

</p>




<p className="
mt-5
font-bold
text-[#003B6F]
">

Learn More →

</p>


</div>


</div>



</Link>


))

}


</div>









{/* APPLY SECTION */}


<div className="
mt-16
bg-[#003B6F]
text-white
p-10
md:p-12
">


<h2 className="
text-3xl
font-bold
">

Ready to Serve?

</h2>


<p className="
mt-4
text-lg
text-gray-200
max-w-3xl
">

Join the Department of Homeland Security and become part of a team dedicated to security, service, and protecting communities.

</p>




<Link

href="/careers/apply"

className="
inline-flex
mt-7
bg-[#F2C94C]
text-black
px-7
py-3
font-bold
hover:bg-yellow-300
transition
"

>

Begin Your Application →

</Link>


</div>








</div>


</div>


</main>


);


}
