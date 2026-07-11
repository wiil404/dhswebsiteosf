import Image from "next/image";
import Link from "next/link";


export default function Hero(){


return (

<section

className="
relative
h-[700px]
overflow-hidden
"

>


<Image

src="/about/hero.jpg"

fill

priority

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
to-black/40
"

/>





<div

className="
relative
z-10
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
tracking-[0.35em]
text-[#F2C94C]
font-black
"

>

Department of Homeland Security

</p>





<h1

className="
mt-6
text-6xl
md:text-8xl
font-black
leading-none
"

>

Protecting The Nation.
<br />

Serving The People.

</h1>





<p

className="
mt-8
text-xl
md:text-2xl
text-gray-200
max-w-3xl
leading-relaxed
"

>

The Department of Homeland Security brings together specialised
personnel, advanced capabilities, and dedicated divisions to protect
communities, support national security, and respond to emerging threats.

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

href="/mission"

className="
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

Explore Our Mission →

</Link>




<Link

href="/recruitment"

className="
border-2
border-white
px-10
py-4
font-black
text-lg
hover:bg-white
hover:text-[#003B6F]
transition
"

>

Join DHS →

</Link>


</div>



</div>



</div>



</section>


);


}