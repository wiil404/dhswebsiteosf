"use client";


export default function PrintButton(){


return (

<button

onClick={()=>window.print()}

className="
bg-[#003B6F]
text-white
px-8
py-4
font-black
hover:bg-[#002B52]
transition
print:hidden
"

>

Print Certificate

</button>

);


}