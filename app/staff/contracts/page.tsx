import Link from "next/link";

import { supabaseAdmin } from "@/app/lib/supabase-admin";


export default async function StaffContractsPage(){


const { data: contracts } = await supabaseAdmin

.from("contracts")

.select(`

*,

employees(

roblox_username,

employee_number,

divisions(

name

),

positions(

title

)

)

`)

.order(
"created_at",
{
ascending:false
}
);




return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-7xl
mx-auto
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
bg-gradient-to-r
from-[#003B6F]
to-[#005AA7]
text-white
p-10
">


<p className="
uppercase
tracking-[0.35em]
text-[#F2C94C]
font-black
text-sm
">

Department of Homeland Security

</p>



<div className="
flex
justify-between
items-center
mt-4
">


<h1 className="
text-5xl
font-black
">

Contracts

</h1>



<Link

href="/staff/contracts/create"

className="
bg-[#F2C94C]
text-[#003B6F]
px-6
py-3
font-black
hover:scale-105
transition
"

>

Create Contract

</Link>


</div>




<p className="
mt-4
text-blue-100
">

Manage employee agreements and official records.

</p>


</div>






<div className="
p-10
">


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Contract Registry

</h2>



<div className="
mt-8
space-y-6
">


{
contracts?.map((contract:any)=>(


<div

key={contract.id}

className="
border
bg-[#F5F8FB]
p-7
flex
justify-between
items-center
"

>


<div>


<h3 className="
text-xl
font-black
text-[#003B6F]
">

{contract.title}

</h3>



<p className="
mt-2
text-gray-700
">

Employee:

{" "}

{contract.employees?.roblox_username}

</p>




<p className="
text-sm
text-gray-500
mt-1
">

{contract.employees?.positions?.title}

•

{" "}

{contract.employees?.divisions?.name}

</p>

 {

contract.employee_signed && (

<div className="
mt-3
text-sm
text-gray-600
">


<p>

Signed by:

{" "}

<b>
{contract.employee_signature_name}
</b>

</p>


<p>

Date:

{" "}

<b>
{
new Date(
contract.employee_signature_date
).toLocaleString("en-GB")
}

</b>

</p>


</div>

)

} 


<div className="
mt-3
flex
gap-3
">


<span className="
bg-white
border
px-4
py-2
font-bold
text-sm
">

{contract.status}

</span>


{
contract.public_view && (

<span className="
bg-green-100
border
border-green-400
px-4
py-2
font-bold
text-sm
">

Public

</span>

)

}



</div>



</div>






<Link

href={`/staff/contracts/${contract.id}`}

className="
bg-[#003B6F]
text-white
px-5
py-3
font-bold
"

>

View

</Link>



</div>


))


}



{
(!contracts || contracts.length === 0) && (

<p className="
text-gray-500
">

No contracts created.

</p>

)

}



</div>



</div>


</div>


</section>


</main>

);


}
