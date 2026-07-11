const values = [

{
icon:"🛡️",
title:"Integrity",
description:
"Every DHS employee is expected to act with honesty, accountability, and professionalism while upholding the public trust."
},


{
icon:"🇺🇸",
title:"Service",
description:
"The Department exists to serve communities, protect the nation, and support those who depend on our mission."
},


{
icon:"⚡",
title:"Preparedness",
description:
"Through training, planning, and coordination, DHS personnel remain ready to respond to any challenge."
},


{
icon:"⭐",
title:"Excellence",
description:
"We pursue the highest standards in leadership, operations, and professional development."
},


{
icon:"🤝",
title:"Teamwork",
description:
"Success depends on cooperation between divisions, personnel, and partner organisations."
},


{
icon:"📋",
title:"Accountability",
description:
"Every action taken by DHS personnel reflects our commitment to responsibility and public confidence."
}

];







export default function CoreValues(){


return (

<section

className="
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
text-center
"

>


<p

className="
uppercase
tracking-[0.3em]
font-black
text-[#003B6F]
"

>

OUR PRINCIPLES

</p>





<h2

className="
mt-4
text-5xl
font-black
text-[#003B6F]
"

>

The DHS Standard

</h2>






<p

className="
mt-5
max-w-3xl
mx-auto
text-lg
text-gray-600
"

>

The Department of Homeland Security is built upon a foundation
of integrity, service, and commitment. These values guide every
mission, every decision, and every employee.

</p>



</div>









<div

className="
grid
md:grid-cols-3
gap-8
mt-16
"

>


{

values.map(

(value)=>(


<div

key={value.title}

className="
group
relative
bg-gray-50
border
border-gray-200
p-8
shadow-lg
hover:-translate-y-2
transition
"

>


<div

className="
absolute
top-0
left-0
right-0
h-2
bg-[#F2C94C]
"

 />






<div

className="
text-5xl
"

>

{value.icon}

</div>






<h3

className="
mt-6
text-2xl
font-black
text-[#003B6F]
"

>

{value.title}

</h3>






<p

className="
mt-4
text-gray-600
leading-relaxed
"

>

{value.description}

</p>





</div>


)


)


}



</div>





</div>


</section>


);


}