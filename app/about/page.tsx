import Image from "next/image";
import Link from "next/link";

import Timeline from "@/components/about/Timeline";
import CoreValues from "@/components/about/CoreValues";
import DivisionShowcase from "@/components/about/DivisionShowcase";
import RecruitmentCTA from "@/components/about/RecruitmentCTA";




export default function AboutPage(){


return (

<main className="bg-white">






{/* HERO */}


<section

className="
relative
h-[650px]
overflow-hidden
"

>


<Image

src="/about/hero.jpg"

fill

alt="Department of Homeland Security"

className="
object-cover
"

/>






<div

className="
absolute
inset-0
bg-gradient-to-r
from-[#003B6F]
via-[#003B6F]/80
to-transparent
"

/>







<div

className="
relative
max-w-7xl
mx-auto
px-6
h-full
flex
items-center
"

>


<div

className="
max-w-4xl
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

Department Of Homeland Security

</p>







<h1

className="
mt-6
text-6xl
md:text-7xl
font-black
"

>

Protecting The Nation.
Serving The People.

</h1>






<p

className="
mt-6
text-xl
text-gray-200
leading-relaxed
"

>

The Department of Homeland Security coordinates
national security, emergency response, border protection,
aviation operations, protective services, and public
communication to safeguard communities across the nation.

</p>







<div

className="
flex
gap-5
mt-10
flex-wrap
"

>


<Link

href="/recruitment/apply"

className="
bg-[#F2C94C]
text-black
px-8
py-4
font-black
"

>

Join DHS →

</Link>




<Link

href="/recruitment"

className="
border-2
border-white
px-8
py-4
font-black
hover:bg-white
hover:text-[#003B6F]
transition
"

>

Explore Operations

</Link>



</div>



</div>


</div>


</section>









{/* WHO WE ARE */}


<section

className="
py-24
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
grid
md:grid-cols-2
gap-16
items-center
"

>


<div>


<p

className="
uppercase
tracking-[0.3em]
font-black
text-[#003B6F]
"

>

Who We Are

</p>





<h2

className="
mt-4
text-5xl
font-black
text-[#003B6F]
"

>

A Department Built Around Service

</h2>







<p

className="
mt-6
text-lg
text-gray-700
leading-relaxed
"

>

The Department of Homeland Security exists to protect
the nation from evolving threats while supporting the
communities it serves.

Through specialised divisions and dedicated personnel,
DHS combines operational capability, leadership, and
public service into one unified mission.

</p>





<p

className="
mt-5
text-lg
text-gray-700
leading-relaxed
"

>

From tactical response teams to aviation specialists,
protective services, border operations, and public affairs,
every DHS employee contributes to a larger national mission.

</p>



</div>








<div

className="
bg-[#003B6F]
text-white
p-10
shadow-xl
"

>


<h3

className="
text-3xl
font-black
"

>

Our Mission

</h3>





<p

className="
mt-5
text-gray-200
leading-relaxed
"

>

To protect the nation, secure communities,
and support operational excellence through
preparedness, professionalism, and teamwork.

</p>




<div

className="
mt-8
border-t
border-white/20
pt-6
"

>


<p

className="
text-[#F2C94C]
font-black
"

>

CORE OBJECTIVES

</p>



<ul

className="
mt-4
space-y-3
"

>

<li>

✓ National Security

</li>

<li>

✓ Emergency Preparedness

</li>

<li>

✓ Operational Excellence

</li>

<li>

✓ Public Trust

</li>


</ul>


</div>



</div>







</div>


</div>


</section>









{/* VALUES */}


<CoreValues />








{/* OPERATIONS */}


<Timeline />








{/* DIVISIONS */}


<DivisionShowcase />








{/* RECRUITMENT */}


<RecruitmentCTA />






</main>


);


}
