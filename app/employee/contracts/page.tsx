import Link from "next/link";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";


export const dynamic = "force-dynamic";
export const revalidate = 0;



export default async function EmployeeContractsPage(){


const session = await getEmployeeSession();



if(!session){

    redirect("/employee/login");

}




const {data:contracts,error}=await supabaseAdmin

.from("contracts")

.select("*")

.eq(
"employee_id",
session.employees.id
)

.order(
"created_at",
{
ascending:false
}
);




if(error){

    console.error(error);

}





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



<h1 className="
text-5xl
font-black
mt-4
">

My Contracts

</h1>



<p className="
mt-3
text-blue-100
">

Review and sign your assigned Department agreements.

</p>

<Link

href="/employee"

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

← Dashboard

</Link>

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
text-gray-600
">

{contract.contract_type}

</p>





<div className="
mt-3
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


</div>




</div>








<Link

href={`/employee/contracts/${contract.id}`}

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

No contracts assigned.

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
