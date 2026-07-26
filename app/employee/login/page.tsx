import Link from "next/link";
import { getRobloxLoginURL } from "@/lib/../app/lib/roblox-auth";


export default function EmployeeLogin(){


const loginURL = getRobloxLoginURL();



return (

<main className="
min-h-screen
relative
flex
items-center
justify-center
py-20
">


<div className="
absolute
inset-0
-z-10
bg-[#003B6F]
">


<div className="
absolute
inset-0
opacity-10
bg-[linear-gradient(45deg,transparent_45%,white_46%,transparent_47%),linear-gradient(-45deg,transparent_45%,white_46%,transparent_47%)]
bg-[length:120px_120px]
"/>


</div>






<section className="
w-full
max-w-xl
px-6
">


<div className="
bg-white
shadow-2xl
border
overflow-hidden
">


<div className="
h-3
bg-[#F2C94C]
"/>






<div className="
p-10
md:p-14
text-center
">





<p className="
uppercase
tracking-[0.3em]
text-sm
font-black
text-[#003B6F]
">

Department of Homeland Security

</p>







<h1 className="
mt-6
text-4xl
font-black
text-[#003B6F]
">

Employee Portal

</h1>






<p className="
mt-5
text-gray-600
leading-relaxed
">

Access your DHS employee profile, contracts, policies,
clearances, and departmental resources.

</p>







<div className="
mt-10
bg-[#F5F8FB]
border
p-6
text-left
">


<h2 className="
font-black
text-[#003B6F]
">

Roblox Authentication

</h2>



<p className="
mt-3
text-sm
text-gray-600
">

Your Roblox account will be securely verified and matched
against the DHS employee directory.

</p>


</div>







<a

href={loginURL}

className="
mt-10
inline-flex
items-center
justify-center
w-full
bg-[#003B6F]
text-white
py-4
font-black
text-lg
hover:bg-[#002B52]
transition
"

>

Sign in with Roblox →

</a>







<div className="
mt-8
border-t
pt-6
text-sm
text-gray-500
">


<p>

Only registered DHS personnel may access this portal.

</p>



<Link

href="/"

className="
inline-block
mt-4
font-bold
text-[#003B6F]
hover:underline
"

>

Return to DHS Website

</Link>


</div>





</div>


</div>


</section>


</main>

);

}
