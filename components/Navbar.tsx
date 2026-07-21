"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function Navbar(){

    const [menuOpen,setMenuOpen] = useState(false);


    return (

<header className="
w-full
bg-[#003B6F]
text-white
shadow-xl
relative
z-50
">


{/* TOP NAVIGATION */}

<div className="
px-8
md:px-10
">


<div className="
relative
h-40
flex
items-center
justify-between
">



{/* SECRETARY */}

<Link

href="/secretary"

className="
group
font-black
tracking-wide
text-lg
uppercase
transition
"

>


<span className="
group-hover:text-[#F2C94C]
transition
">

SECRETARY CHEDVN

</span>


</Link>







{/* LOGO */}

<Link

href="/"

className="
absolute
left-1/2
-translate-x-1/2
top-5
"

>


<Image

src="/hero/DHSLogo.png"

alt="Department of Homeland Security"

width={220}

height={120}

priority

className="
object-contain
w-[220px]
h-auto
hover:scale-105
transition
duration-300
"

/>


</Link>








{/* MENU BUTTON */}

<button

onClick={()=>setMenuOpen(true)}

className="
group
flex
flex-col
gap-3
"

aria-label="Open menu"

>


<span className="
block
w-12
h-[3px]
bg-white
group-hover:bg-[#F2C94C]
transition
"/>


<span className="
block
w-12
h-[3px]
bg-white
group-hover:bg-[#F2C94C]
transition
"/>


</button>




</div>


</div>






{/* OVERLAY */}


{

menuOpen && (


<div

className="
fixed
inset-0
bg-black/50
backdrop-blur-sm
z-40
"

onClick={()=>setMenuOpen(false)}

/>


)

}









{/* SIDE MENU */}


<aside

className={`

fixed

top-0

right-0

h-full

w-full

sm:w-[420px]

bg-white

text-[#003B6F]

z-50

shadow-2xl

transform

transition-transform

duration-500

ease-in-out

${

menuOpen

?

"translate-x-0"

:

"translate-x-full"

}

`}

>





<div className="
h-full
flex
flex-col
">






{/* MENU HEADER */}


<div className="
bg-[#003B6F]
text-white
p-8
relative
">


<button

onClick={()=>setMenuOpen(false)}

className="
absolute
right-8
top-6
text-4xl
font-light
hover:text-[#F2C94C]
transition
"

>

×

</button>





<p className="
text-[#F2C94C]
uppercase
tracking-[0.3em]
text-xs
font-black
">

Department of Homeland Security

</p>




<h2 className="
text-3xl
font-black
mt-3
">

Navigation

</h2>



</div>









{/* LINKS */}


<nav className="
p-8
space-y-10
overflow-y-auto
">







<MenuSection title="Main">


<MenuLink href="/" text="Home"/>

<MenuLink href="/about" text="About DHS"/>

<MenuLink href="/divisions" text="Our Mission"/>

<MenuLink href="/secretary" text="Leadership"/>


</MenuSection>









<MenuSection title="Information">


<MenuLink href="/news" text="News"/>

<MenuLink href="/documents" text="Resources"/>

<MenuLink href="/clearance" text="Security Clearance Registry"/>


</MenuSection>









<MenuSection title="Careers">


<MenuLink href="/recruitment" text="Recruitment"/>


</MenuSection>









<MenuSection title="Internal">


<MenuLink href="/staff/dashboard" text="Staff Portal"/>


</MenuSection>





</nav>






{/* FOOTER */}


<div className="
mt-auto
border-t
p-6
text-center
bg-[#F5F8FB]
">


<p className="
text-xs
font-bold
text-gray-500
uppercase
tracking-widest
">

Department of Homeland Security

</p>


<p className="
mt-2
text-xs
text-gray-400
">

Official Website

</p>


</div>






</div>


</aside>





</header>

    );

}









function MenuSection({

title,

children

}:{

title:string;

children:React.ReactNode;

}){


return (

<div>


<p className="
text-xs
font-black
uppercase
tracking-[0.25em]
text-[#F2C94C]
mb-4
">

{title}

</p>


<div className="
space-y-3
">

{children}

</div>


</div>

);


}









function MenuLink({

href,

text

}:{

href:string;

text:string;

}){


return (

<Link

href={href}

className="
group
flex
items-center
justify-between
border-b
border-gray-100
pb-3
text-lg
font-bold
hover:text-[#005AA7]
transition
"

>


<span>

{text}

</span>



<span className="
opacity-0
group-hover:opacity-100
text-[#F2C94C]
transition
">

→

</span>



</Link>

);


}
