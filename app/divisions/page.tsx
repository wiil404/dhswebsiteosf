import Image from "next/image";
import Link from "next/link";


const pillars = [

{
title:"Prevent",
icon:"🛡️",
text:
"Identifying threats before they impact communities through intelligence, preparation, and coordinated action."
},


{
title:"Protect",
icon:"🇺🇸",
text:
"Safeguarding national leadership, critical infrastructure, borders, and the people we serve."
},


{
title:"Respond",
icon:"🚨",
text:
"Deploying specialised personnel and resources when emergencies and threats require immediate action."
},


{
title:"Recover",
icon:"🤝",
text:
"Supporting communities through resilience, restoration, and continued partnership."
}

];




const divisions = [

{
name:"Special Response Team",
short:"SRT",
description:
"Elite tactical personnel trained for high-risk response and specialised operations.",
image:"/careers/srt.jpg"
},


{
name:"United States Secret Service",
short:"USSS",
description:
"Protective professionals dedicated to safeguarding national leadership and critical assets.",
image:"/careers/usss.jpg"
},


{
name:"Law Enforcement Helicopter Taskforce",
short:"LEHT",
description:
"Dedicated aviation specialists providing aerial support and rapid response capability.",
image:"/careers/leht.jpg"
},


{
name:"Customs and Border Protection",
short:"CBP",
description:
"Frontline security personnel protecting borders and supporting homeland security.",
image:"/careers/cbp.jpg"
},


{
name:"Public Affairs",
short:"PAO",
description:
"The communications division connecting DHS operations with the public.",
image:"/careers/pao.jpg"
}


];





export default function MissionPage(){


return (


<main className="bg-[#003B6F] py-12">



<section className="max-w-7xl mx-auto px-6">


<div className="bg-white shadow-2xl overflow-hidden">



{/* HERO */}


<div className="
relative
h-[600px]
">


<Image

src="/mission/hero.jpg"

fill

alt="DHS Mission"

className="object-cover"

/>


<div className="
absolute
inset-0
bg-gradient-to-t
from-[#003B6F]
via-black/50
to-transparent
"/>




<div className="
absolute
bottom-12
left-12
text-white
max-w-4xl
">


<p className="
text-[#F2C94C]
tracking-[0.3em]
font-bold
">

DEPARTMENT OF HOMELAND SECURITY

</p>



<h1 className="
text-6xl
font-black
mt-4
">

OUR MISSION

</h1>




<p className="
text-3xl
font-bold
mt-4
">

Protecting The Nation.
Serving The People.

</p>


</div>


</div>









<div className="p-10 md:p-16">







{/* MISSION STATEMENT */}


<section>


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

The DHS Mission

</h2>



<p className="
mt-6
text-xl
leading-relaxed
text-gray-700
">

The Department of Homeland Security exists to protect the United States from threats while strengthening national resilience, supporting communities, and ensuring a safer future.

Through specialised divisions, highly trained personnel, and coordinated operations, DHS delivers security capabilities across land, air, emergency response, and public communication.

</p>


</section>









{/* INFOGRAPHIC */}


<section className="mt-16">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Homeland Security At A Glance

</h2>




<div className="
grid
md:grid-cols-3
gap-6
mt-8
">


{

[

["🇺🇸","National Security","Protecting the nation against emerging threats."],

["🚨","Emergency Response","Rapid deployment during critical incidents."],

["🌎","Border Protection","Securing borders and supporting communities."],

["🚁","Aviation Operations","Providing aerial support capabilities."],

["🛡️","Protective Services","Safeguarding national leadership."],

["📢","Public Information","Maintaining transparency and trust."]

].map((item)=>(


<div

key={item[1]}

className="
bg-gray-50
border
p-8
"

>


<div className="text-5xl">

{item[0]}

</div>


<h3 className="
mt-5
text-xl
font-black
text-[#003B6F]
">

{item[1]}

</h3>



<p className="
mt-3
text-gray-600
">

{item[2]}

</p>


</div>


))


}


</div>


</section>









{/* PILLARS */}


<section className="mt-16">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Our Operational Pillars

</h2>



<div className="
grid
md:grid-cols-4
gap-6
mt-8
">


{

pillars.map((pillar)=>(


<div

key={pillar.title}

className="
bg-[#003B6F]
text-white
p-8
"

>


<div className="text-5xl">

{pillar.icon}

</div>


<h3 className="
mt-5
text-xl
font-black
text-[#F2C94C]
">

{pillar.title}

</h3>


<p className="
mt-4
text-gray-200
">

{pillar.text}

</p>


</div>


))


}


</div>


</section>









{/* DIVISIONS */}


<section className="mt-16">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Our Divisions

</h2>




<div className="
grid
md:grid-cols-2
gap-8
mt-8
">


{

divisions.map((division)=>(


<div

key={division.short}

className="
relative
h-72
overflow-hidden
"

>


<Image

src={division.image}

fill

alt={division.name}

className="object-cover"

/>



<div className="
absolute
inset-0
bg-gradient-to-t
from-[#003B6F]
to-transparent
"/>



<div className="
absolute
bottom-6
left-6
text-white
">


<p className="
text-[#F2C94C]
font-black
tracking-widest
">

{division.short}

</p>



<h3 className="
text-2xl
font-black
">

{division.name}

</h3>


<p className="
mt-2
text-gray-200
">

{division.description}

</p>


</div>


</div>


))


}


</div>


</section>









{/* CTA */}


<section className="
mt-16
bg-[#003B6F]
text-white
p-12
text-center
">


<h2 className="
text-4xl
font-black
">

Become Part Of The Mission

</h2>


<p className="
mt-4
text-lg
text-gray-200
">

Join the Department of Homeland Security and contribute to protecting communities, supporting operations, and serving a greater purpose.

</p>



<Link

href="/recruitment"

className="
inline-block
mt-8
bg-[#F2C94C]
text-black
px-10
py-4
font-black
"

>

Explore Careers →

</Link>


</section>




</div>


</div>


</section>


</main>


);


}
