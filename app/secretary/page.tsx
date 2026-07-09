import Image from "next/image";


export default function SecretaryPage(){


return (

<main

className="
relative
py-16
"

>


{/* BACKGROUND */}

<div

className="
absolute
inset-0
-z-10
bg-[#003B6F]
overflow-hidden
"

>


<div

className="
absolute
inset-0
opacity-10
bg-[linear-gradient(45deg,transparent_45%,white_46%,transparent_47%),linear-gradient(-45deg,transparent_45%,white_46%,transparent_47%)]
bg-[length:120px_120px]
"

/>


</div>









<section

className="
max-w-6xl
mx-auto
px-6
"

>


<div

className="
bg-white
shadow-2xl
border
border-gray-200
"

>


{/* GOLD BAR */}

<div

className="
h-2
bg-[#F2C94C]
"

/>







<div

className="
p-8
md:p-14
"

>







{/* HEADER PROFILE */}


<div

className="
flex
flex-col
md:flex-row
items-center
gap-10
border-b
pb-10
"

>



<div

className="
relative
w-52
h-52
rounded-full
overflow-hidden
border-4
border-[#003B6F]
shadow-lg
"

>

<Image

src="/leadership/secretary.png"

alt="Secretary of Homeland Security"

fill

className="
object-cover
"

/>


</div>








<div>


<p

className="
uppercase
tracking-[0.2em]
text-sm
font-bold
text-[#003B6F]
"

>

Department of Homeland Security

</p>






<h1

className="
mt-4
text-5xl
font-bold
text-[#003B6F]
"

>

chedvn

</h1>






<h2

className="
mt-3
text-2xl
text-gray-700
"

>

Secretary of Homeland Security

</h2>





<p

className="
mt-5
text-gray-600
"

>

Leading the Department of Homeland Security's mission to protect the nation, secure our borders, and strengthen communities.

</p>



</div>



</div>









{/* BIOGRAPHY */}


<section

className="
mt-12
"

>


<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Biography

</h2>





<p

className="
mt-5
text-lg
leading-relaxed
text-gray-700
"

>

Chedvn was appointed as Secretary of Homeland Security to lead the Department's efforts across national security, emergency preparedness, border security, cybersecurity, and public safety.

With extensive experience in public service and leadership, the Secretary works alongside DHS personnel and partner agencies to advance the Department's mission and protect the American people.

</p>


</section>









{/* PRIORITIES */}


<section

className="
mt-12
"

>


<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Secretary's Priorities

</h2>






<div

className="
grid
md:grid-cols-3
gap-6
mt-6
"

>


<div

className="
border
p-6
bg-gray-50
"

>

<h3

className="
font-bold
text-xl
text-[#003B6F]
"

>

National Security

</h3>


<p

className="
mt-3
text-gray-600
"

>

Protecting the nation through preparedness, intelligence coordination, and operational excellence.

</p>


</div>







<div

className="
border
p-6
bg-gray-50
"

>

<h3

className="
font-bold
text-xl
text-[#003B6F]
"

>

Community Resilience

</h3>


<p

className="
mt-3
text-gray-600
"

>

Supporting communities through disaster response, recovery, and emergency management.

</p>


</div>







<div

className="
border
p-6
bg-gray-50
"

>

<h3

className="
font-bold
text-xl
text-[#003B6F]
"

>

Department Excellence

</h3>


<p

className="
mt-3
text-gray-600
"

>

Building a professional workforce dedicated to service and public trust.

</p>


</div>



</div>


</section>









{/* QUOTE */}


<section

className="
mt-12
border-l-4
border-[#003B6F]
bg-gray-50
p-8
"

>


<p

className="
text-xl
italic
text-gray-700
"

>

"Together, we will continue to strengthen the security of our nation and serve the communities that depend on us."

</p>



<p

className="
mt-4
font-bold
text-[#003B6F]
"

>

— Secretary Name

</p>


</section>









{/* OFFICE INFORMATION */}


<section

className="
mt-12
border-t
pt-8
"

>


<h2

className="
text-2xl
font-bold
text-[#003B6F]
"

>

Office of the Secretary

</h2>



<div

className="
mt-4
text-gray-700
"

>


<p>

Department of Homeland Security

</p>


<p>

Washington, D.C.

</p>


<p>

Official Leadership Office

</p>


</div>


</section>









</div>

</div>


</section>


</main>


);


}
