import Link from "next/link";


export default function Footer(){

    return (

<footer className="
bg-[#003B6F]
text-white
mt-20
">


{/* GOLD ACCENT */}

<div className="
h-2
bg-[#F2C94C]
"/>





<div className="
max-w-7xl
mx-auto
px-6
py-14
">





<div className="
grid
md:grid-cols-4
gap-10
">







{/* BRAND */}


<div className="
md:col-span-2
">


<p className="
text-[#F2C94C]
uppercase
tracking-[0.3em]
font-black
text-xs
">

Department of Homeland Security

</p>




<h2 className="
text-3xl
font-black
mt-4
">

Protecting The Nation

</h2>




<p className="
mt-5
text-blue-100
leading-relaxed
max-w-xl
">

The Department of Homeland Security provides security,
preparedness, and protection through dedicated divisions,
personnel, and specialised agencies.

</p>



</div>










{/* EXPLORE */}


<div>


<h3 className="
text-lg
font-black
uppercase
tracking-wide
">

Explore

</h3>



<div className="
mt-5
space-y-3
text-blue-100
">



<FooterLink
href="/about"
text="About DHS"
/>



<FooterLink
href="/divisions"
text="Our Mission"
/>



<FooterLink
href="/news"
text="Latest News"
/>



<FooterLink
href="/documents"
text="Resources"
/>



</div>


</div>









{/* SERVICES */}


<div>


<h3 className="
text-lg
font-black
uppercase
tracking-wide
">

Services

</h3>




<div className="
mt-5
space-y-3
text-blue-100
">



<FooterLink

href="/recruitment"

text="Careers"

/>



<FooterLink

href="/clearance"

text="Security Clearance Registry"

/>



<FooterLink

href="/staff/dashboard"

text="Staff Portal"

/>



<FooterLink

href="/contact"

text="Contact"

/>



</div>


</div>







</div>









{/* LOWER BAR */}


<div className="
border-t
border-white/20
mt-14
pt-8
flex
flex-col
md:flex-row
justify-between
gap-4
text-sm
text-blue-100
">



<p>

© {new Date().getFullYear()} Department of Homeland Security

</p>





<p className="
font-bold
">

Official Department Website

</p>




</div>







</div>


</footer>


    );

}







function FooterLink({

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
gap-2
hover:text-[#F2C94C]
transition
"

>


<span>

{text}

</span>


<span className="
opacity-0
group-hover:opacity-100
transition
">

→

</span>


</Link>


);


}
