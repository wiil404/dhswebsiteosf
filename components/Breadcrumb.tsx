"use client";

import Link from "next/link";


export default function Breadcrumb({
items=[]
}:{
items?:{
label:string;
href?:string;
}[]
}){


return (

<nav

className="
max-w-7xl
mx-auto
px-6
mb-6
"

>

<div

className="
flex
items-center
gap-2
text-sm
text-gray-500
"

>


{
items.map((item,index)=>(


<div
key={index}
className="flex items-center gap-2"
>


{
item.href ? (

<Link

href={item.href}

className="
hover:text-[#003B6F]
font-medium
transition
"

>

{item.label}

</Link>


)

:

(

<span

className="
font-bold
text-[#003B6F]
"

>

{item.label}

</span>

)

}




{
index !== items.length-1 && (

<span className="text-gray-400">

/

</span>

)

}



</div>


))

}


</div>

</nav>


);


}
