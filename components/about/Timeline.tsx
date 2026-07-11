const timeline = [

{
number:"01",
title:"Identify",
subtitle:"Detecting Emerging Threats",
description:
"DHS personnel continuously monitor situations, intelligence, and community information to identify potential risks before they develop into larger incidents."
},


{
number:"02",
title:"Assess",
subtitle:"Understanding The Situation",
description:
"Specialised teams analyse available information, determine operational requirements, and establish the appropriate response strategy."
},


{
number:"03",
title:"Coordinate",
subtitle:"Bringing Resources Together",
description:
"Leadership coordinates divisions, personnel, and specialised capabilities to ensure an organised and effective response."
},


{
number:"04",
title:"Respond",
subtitle:"Taking Action",
description:
"Operational divisions deploy trained personnel and resources to protect communities, support missions, and resolve incidents."
},


{
number:"05",
title:"Recover",
subtitle:"Supporting Communities",
description:
"Following operations, DHS personnel assist with recovery efforts, review performance, and strengthen future readiness."
}

];









export default function Timeline(){


return (


<section

className="
py-24
bg-[#003B6F]
text-white
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
text-center
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

DHS OPERATIONS

</p>





<h2

className="
mt-4
text-5xl
font-black
"

>

How We Protect The Nation

</h2>





<p

className="
mt-5
max-w-3xl
mx-auto
text-gray-200
text-lg
"

>

Every DHS mission follows a structured process designed
to ensure preparation, coordination, and operational excellence.

</p>


</div>









<div

className="
relative
mt-16
"

>


{/* LINE */}


<div

className="
hidden
md:block
absolute
left-1/2
top-0
bottom-0
w-1
bg-[#F2C94C]
-translate-x-1/2
"

/>








<div

className="
space-y-12
"

>


{
timeline.map((item, index) => (

<div

key={item.number}

className={
    `relative flex ${
        index % 2 === 0
        ? "md:justify-start"
        : "md:justify-end"
    }`
}

>







<div

className="
md:w-[45%]
bg-white
text-gray-900
p-8
shadow-xl
border-t-4
border-[#F2C94C]
"

>



<div

className="
flex
items-center
gap-4
"

>


<div

className="
text-5xl
font-black
text-[#003B6F]
"

>

{item.number}

</div>



<div>


<h3

className="
text-3xl
font-black
text-[#003B6F]
"

>

{item.title}

</h3>



<p

className="
font-bold
text-gray-600
"

>

{item.subtitle}

</p>



</div>



</div>






<p

className="
mt-5
leading-relaxed
text-gray-700
"

>

{item.description}

</p>



</div>




</div>

))

}

</div>



</div>



</div>


</section>


);


}