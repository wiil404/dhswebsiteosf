"use client";

import {useEffect,useState} from "react";


const slides=[

{
title:"Protecting Our Nation",
text:"The Department of Homeland Security works to secure the nation through preparation, response, and innovation.",
image:"/hero/security.jpg"
},

{
title:"Serving Communities",
text:"Working alongside local agencies, emergency services, and partners.",
image:"/hero/community.jpg"
},

{
title:"A Career With Purpose",
text:"Join the mission and serve something greater than yourself.",
image:"/hero/careers.jpg"
}

];



export default function Hero(){


const [index,setIndex]=useState(0);



useEffect(()=>{


const timer=setInterval(()=>{


setIndex(
prev=>
(prev+1)%slides.length
);


},7000);



return ()=>clearInterval(timer);


},[]);





const slide=slides[index];



return (

<section
className="
relative
h-[550px]
bg-cover
bg-center
flex
items-center
"
style={{
backgroundImage:`url(${slide.image})`
}}
>


<div className="
absolute
inset-0
bg-black/50
"/>



<div className="
relative
max-w-7xl
mx-auto
px-6
text-white
">


<h1 className="
text-5xl
font-bold
max-w-3xl
">

{slide.title}

</h1>



<p className="
mt-6
text-xl
max-w-2xl
">

{slide.text}

</p>




<button
className="
mt-8
bg-white
text-[#003B6F]
px-8
py-3
rounded
font-bold
"
>

Learn More

</button>


</div>



</section>

);


}