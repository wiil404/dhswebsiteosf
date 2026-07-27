import Link from "next/link";


export default function DocumentsPage(){

return (

<main className="
min-h-screen
bg-[#F5F8FB]
">


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
">

Access official Department resources, policies,
publications, and guidance materials.

</p>


</div>


</section>





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

title="Civil Policies"

description="
Public policies and guidance released by the Department for civilian access.
"

href="/documents/civil-policies"

/>



<ResourceCard

title="Department Publications"

description="
Official statements, reports, announcements, and public releases.
"

href="/documents/publications"

/>



<ResourceCard

title="Operational Documents"

description="
Internal procedures, policies, and authorised personnel documents.
"

href="/documents/operational"

/>



<ResourceCard

title="Security Information"

description="
Security resources, verification information, and guidance.
"

href="/documents/security"

/>



</div>


</section>





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
max-w-4xl
">

The Department of Homeland Security maintains this
portal to provide transparent access to official
documentation, public guidance, and released information.

</p>



</div>


</section>


</main>


);


}




function ResourceCard({

title,

description,

href

}:{

title:string;

description:string;

href:string;

}){


return (

<Link

href={href}

className="
bg-white
border
shadow-sm
hover:shadow-xl
transition
p-8
relative
overflow-hidden
group
block
"


>


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



<div className="
mt-8
font-black
text-[#003B6F]
">

View Resources →

</div>



</Link>


);


}
