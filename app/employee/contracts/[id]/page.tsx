import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { getEmployeeSession } from "@/app/lib/employee-auth";

import { signEmployeeContract } from "./actions";


export const dynamic = "force-dynamic";
export const revalidate = 0;



export default async function EmployeeContractPage({

params

}:{

params: Promise<{
    id:string
}>

}){


const session = await getEmployeeSession();



if(!session){

redirect("/employee/login");

}



const {id}=await params;



const {

data:contract,

error

}=await supabaseAdmin

.from("contracts")

.select("*")

.eq(
"id",
id
)

.eq(
"employee_id",
session.employees.id
)

.single();





if(error || !contract){

redirect("/employee/contracts");

}







return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-6xl
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

{contract.title}

</h1>



<p className="
mt-3
text-blue-100
">

Employee Contract Review

</p>



</div>









<div className="
p-10
space-y-10
">







<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Contract Status

</h2>



<div className="
grid
md:grid-cols-3
gap-6
mt-6
">



<Info

title="Contract Number"

value={
contract.contract_number
}

/>



<Info

title="Status"

value={
contract.status
}

/>



<Info

title="Employee Signature"

value={

contract.employee_signed

?

"Signed"

:

"Awaiting Signature"

}

/>



</div>


</section>









<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Agreement

</h2>




<div className="
mt-6
border
p-8
whitespace-pre-wrap
leading-relaxed
text-gray-700
bg-[#F5F8FB]
">

{contract.content}

</div>



</section>









<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Employee Acceptance

</h2>





<div className="
border
bg-[#F5F8FB]
p-8
mt-6
">


<p className="
text-gray-700
leading-relaxed
">

By signing this agreement, I acknowledge that I have read,
understood, and agree to comply with all provisions contained
within this Department of Homeland Security employment contract.

</p>





{

!contract.employee_signed && (

<form

action={async()=>{

"use server";

await signEmployeeContract(contract.id);

}}

className="mt-8"

>


<button

className="
bg-[#003B6F]
text-white
px-8
py-4
font-black
text-lg
hover:bg-[#005AA7]
transition
"

>

Sign Contract

</button>


</form>

)

}





{

contract.employee_signed && (

<div className="
mt-6
bg-green-100
border
border-green-400
p-5
font-bold
text-green-800
">

You have signed this agreement.

</div>

)

}





</div>


</section>







</div>


</div>


</section>


</main>

);


}






function Info({

title,

value

}:{

title:string;

value:string;

}){


return (

<div className="
border
bg-[#F5F8FB]
p-6
">


<p className="
uppercase
tracking-widest
text-xs
font-bold
text-gray-500
">

{title}

</p>


<p className="
mt-3
font-black
text-[#003B6F]
">

{value}

</p>


</div>


);

}