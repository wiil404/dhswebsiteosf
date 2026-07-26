import Link from "next/link";
import { getRobloxLoginURL } from "@/lib/roblox-auth";


export default function EmployeeLogin(){


const loginURL =
getRobloxLoginURL();



return (

<main className="
min-h-screen
bg-[#003B6F]
flex
items-center
justify-center
px-6
">


<div className="
bg-white
shadow-2xl
max-w-xl
w-full
p-12
text-center
">


<div className="
h-2
bg-[#F2C94C]
absolute
"/>



<h1 className="
text-4xl
font-black
text-[#003B6F]
">

Employee Portal

</h1>



<p className="
mt-5
text-gray-600
">

Secure employee access portal for Department of Homeland Security personnel.

</p>




<a

href={loginURL}

className="
mt-10
inline-flex
bg-[#003B6F]
text-white
px-10
py-4
font-black
hover:bg-[#002B52]
transition
"

>

Login with Roblox

</a>





<Link

href="/"

className="
block
mt-6
text-gray-500
"

>

Return Home

</Link>


</div>


</main>

);


}