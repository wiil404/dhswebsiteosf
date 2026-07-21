import Link from "next/link";


export default function DocumentsPage(){

return (

<main className="
min-h-screen
bg-[#F5F8FB]
">






{/* HERO */}


<section className="
bg-[#003B6F]
text-white
px-6
py-20
">


<div className="
max-w-7xl
mx-auto
">


<p className="
text-[#F2C94C]
uppercase
tracking-[0.3em]
font-black
text-sm
">

Department of Homeland Security

</p>




<h1 className="
text-5xl
md:text-6xl
font-black
mt-5
">

Resources & Documents

</h1>




<p className="
mt-5
max-w-3xl
text-blue-100
text-lg
leading-relaxed
">

Access official Department resources, operational
documents, guidance materials, and public information.

</p>



</div>


</section>









{/* RESOURCE CARDS */}


<section className="
max-w-7xl
mx-auto
px-6
py-16
">





<div className="
grid
md:grid-cols-3
gap-8
">





<ResourceCard

title="Department Publications"

description="
Official statements, reports, announcements, and public releases.
"

button="View Publications"

/>






<ResourceCard

title="Operational Documents"

description="
Policies, procedures, and guidance documents for authorised personnel.
"

button="View Documents"

/>








<ResourceCard

title="Security Information"

description="
Clearance information, verification resources, and security guidance.
"

button="View Security Resources"

/>






</div>






</section>









{/* INFORMATION PANEL */}


<section className="
max-w-7xl
mx-auto
px-6
pb-20
">



<div className="
bg-white
border
shadow-xl
p-10
md:p-14
">


<div className="
h-2
bg-[#F2C94C]
mb-10
"/>





<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Public Information Portal

</h2>




<p className="
mt-5
text-gray-700
text-lg
leading-relaxed
max-w-4xl
">

The Department of Homeland Security maintains this
resource centre to provide transparent access to
public information, departmental guidance, and
official documentation.

</p>






<div className="
grid
md:grid-cols-3
gap-6
mt-10
">





<InfoBox

title="Documents"

value="Public Records"

/>






<InfoBox

title="Access"

value="Open Availability"

/>







<InfoBox

title="Status"

value="Active Portal"

/>





</div>





</div>



</section>







</main>

);


}









function ResourceCard({

title,

description,

button

}:{

title:string;

description:string;

button:string;

}){


return (

<div className="
bg-white
border
shadow-sm
hover:shadow-xl
transition
p-8
relative
overflow-hidden
group
">



<div className="
absolute
top-0
left-0
w-full
h-2
bg-[#003B6F]
group-hover:bg-[#F2C94C]
transition
"/>





<h2 className="
text-2xl
font-black
text-[#003B6F]
mt-3
">

{title}

</h2>




<p className="
mt-4
text-gray-600
leading-relaxed
">

{description}

</p>






<button className="
mt-8
bg-[#003B6F]
text-white
px-6
py-3
font-black
hover:bg-[#002B52]
transition
">

{button}

</button>





</div>


);


}









function InfoBox({

title,

value

}:{

title:string;

value:string;

}){


return (

<div className="
bg-[#F5F8FB]
border
p-6
">


<p className="
text-xs
uppercase
font-black
text-gray-500
">

{title}

</p>



<p className="
mt-3
text-xl
font-black
text-[#003B6F]
">

{value}

</p>



</div>


);


}
