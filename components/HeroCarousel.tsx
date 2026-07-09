"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Oswald } from "next/font/google";


const titleFont = Oswald({

    subsets:["latin"],

    weight:[
        "500",
        "600",
        "700"
    ]

});


const slides = [

{
    image:"/hero/safety.jpg",
    title:"PROTECTING THE\nNATION",
    subtitle:"Safeguarding America through dedicated security operations, advanced preparedness, and a commitment to protecting the people, infrastructure, and values that make our nation stronger"
},

{
    image:"/hero/community.jpg",
    title:"STRENGTHENING OUR\nCOMMUNITIES",
    subtitle:"Working alongside communities to enhance public safety, support emergency response efforts, and build a more prepared, connected, and resilient nation for everyone"
},

{
    image:"/hero/careers.jpg",
    title:"ANSWER THE CALL\nTO SERVE",
    subtitle:"Join a team of dedicated professionals across the Special Response Team, United States Secret Service, Customs and Border Protection, Law Enforcement Helicopter Taskforce, and Public Affairs as we protect, respond, and serve with purpose"
}

];





export default function HeroCarousel(){


const [current,setCurrent] =
useState(0);


const [paused,setPaused] =
useState(false);


const [fade,setFade] =
useState(true);






useEffect(()=>{


if(paused)
return;



const timer =
setInterval(()=>{


changeSlide(

current === slides.length - 1
?
0
:
current + 1

);


},6000);



return ()=>clearInterval(timer);


},[current,paused]);






function changeSlide(index:number){


setFade(false);


setTimeout(()=>{


setCurrent(index);


setFade(true);


},300);


}







const slide =
slides[current];







return (


<section

className="
relative
h-[720px]
overflow-hidden
"

onMouseEnter={()=>
setPaused(true)
}

onMouseLeave={()=>
setPaused(false)
}

>






<div

className={`
absolute
inset-0
transition-opacity
duration-700
${fade ? "opacity-100":"opacity-0"}
`}

>


<Image

src={slide.image}

alt="Department of Homeland Security"

fill

priority

sizes="100vw"

className="
object-cover
"

/>


</div>






{/* DHS STYLE IMAGE BLENDING */}

<div

className="
absolute
inset-0
bg-gradient-to-b
from-black/40
via-[#001F3F]/60
to-[#003B6F]
"

/>



<div

className="
absolute
bottom-0
left-0
right-0
h-56
bg-gradient-to-t
from-[#003B6F]
via-[#003B6F]/80
to-transparent
"

/>







{/* CONTENT */}

<div

className="
absolute
bottom-28
left-0
right-0
flex
justify-center
text-center
px-6
"

>


<div

className={`
max-w-4xl
text-white
transition-all
duration-700
${

fade
?
"opacity-100 translate-y-0"
:
"opacity-0 translate-y-6"

}
`}

>



<div
className="
text-white
max-w-5xl
mx-auto
"
>


<h1

className={`
${titleFont.className}

text-6xl
md:text-8xl

uppercase

font-bold

tracking-wide

leading-[0.85]

drop-shadow-2xl

whitespace-pre-line

`}

>

{slide.title}

</h1>




<div

className="
mt-14
mb-8
w-24
h-[2px]
bg-white
mx-auto
opacity-80
"

/>





<p

className="
text-lg
md:text-xl
font-light
max-w-3xl
mx-auto
text-white/90
leading-relaxed
"

>

{slide.subtitle}

</p>



</div>






<div

className="
mt-8
flex
justify-center
gap-3
"

>


{

slides.map((_,index)=>(


<button

key={index}

onClick={()=>
changeSlide(index)
}

className={`
rounded-full
transition-all
duration-300

${
current === index

?
"w-10 h-2 bg-white"

:
"w-2 h-2 bg-white/50"

}

`}

/>


))

}



</div>




</div>


</div>






{/* ARROWS */}


<button

onClick={()=>
changeSlide(
current === 0
?
slides.length -1
:
current-1
)
}

className="
absolute
left-8
top-1/2
-translate-y-1/2
text-white
text-5xl
opacity-70
hover:opacity-100
z-20
"

>

‹

</button>





<button

onClick={()=>
changeSlide(
current === slides.length -1
?
0
:
current+1
)
}

className="
absolute
right-8
top-1/2
-translate-y-1/2
text-white
text-5xl
opacity-70
hover:opacity-100
z-20
"

>

›

</button>




</section>


);


}