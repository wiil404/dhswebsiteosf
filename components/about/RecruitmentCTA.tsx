import Link from "next/link";



const opportunities = [

{
name:"Special Response Team",
short:"SRT",
description:
"Join DHS's premier tactical division. Recruitment is handled directly through the SRT recruitment process.",
link:"https://discord.gg/YNmyjdqUp",
external:true
},


{
name:"United States Secret Service",
short:"USSS",
description:
"Protect national leadership and serve within one of DHS's most recognised protective organisations.",
link:"/recruitment/apply?division=039748c5-271e-4b15-8192-938daaa28272"
},


{
name:"Customs and Border Protection",
short:"CBP",
description:
"Secure borders, protect communities, and support national security operations.",
link:"/recruitment/apply?division=a5540d05-f9cc-4082-8228-2289b02e241f"
},


{
name:"Law Enforcement Helicopter Taskforce",
short:"LEHT",
description:
"Provide aviation support and become part of DHS aerial operations.",
link:"/recruitment/apply?division=49cf99c6-3dec-4105-b678-2795718cad79"
},


{
name:"Public Affairs",
short:"PAO",
description:
"Represent DHS through communication, media relations, and public information.",
link:"/recruitment/apply?division=3c17bd3b-1992-4571-85bc-5cbb45939eed"
}

];








export default function RecruitmentCTA(){


return (

<section

className="
relative
py-24
bg-white
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
bg-[#003B6F]
text-white
p-10
md:p-16
shadow-2xl
overflow-hidden
relative
"

>


{/* GOLD ACCENT */}

<div

className="
absolute
left-0
top-0
bottom-0
w-3
bg-[#F2C94C]
"

/>








<div

className="
relative
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

JOIN DHS

</p>






<h2

className="
mt-5
text-5xl
font-black
"

>

Your Mission Starts Here

</h2>







<p

className="
mt-6
text-lg
text-gray-200
max-w-3xl
leading-relaxed
"

>

The Department of Homeland Security is built by dedicated
individuals who choose to serve something greater than
themselves. Explore opportunities across our specialised
divisions and become part of the mission.

</p>






<div

className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-6
mt-12
"

>


{

opportunities.map(

(opportunity)=>(


<div

key={opportunity.short}

className="
bg-white
text-gray-900
p-6
shadow-xl
"

>



<h3

className="
text-2xl
font-black
text-[#003B6F]
"

>

{opportunity.short}

</h3>





<p

className="
mt-2
font-bold
"

>

{opportunity.name}

</p>






<p

className="
mt-4
text-gray-600
leading-relaxed
"

>

{opportunity.description}

</p>







<Link

href={opportunity.link}

target={
opportunity.external
?
"_blank"
:
undefined
}

className="
inline-flex
mt-6
bg-[#F2C94C]
text-black
px-6
py-3
font-black
hover:bg-white
transition
"

>

{

opportunity.external

?

"Join Recruitment Discord →"

:

"Apply Now →"

}


</Link>




</div>


)


)


}



</div>








</div>


</div>


</div>


</section>


);


}
