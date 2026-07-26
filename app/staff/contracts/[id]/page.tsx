import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase-admin";


export const dynamic = "force-dynamic";
export const revalidate = 0;



export default async function ContractViewPage(
{
    params
}:{
    params:{
        id:string
    }
}
){


const contractId = params.id;



const {
    data:contract,
    error
}=await supabaseAdmin

.from("contracts")

.select(`
    *,
    employees(
        id,
        roblox_username,
        employee_number,
        position_id,
        division_id
    )
`)

.eq(
    "id",
    contractId
)

.maybeSingle();





console.log(
"CONTRACT:",
{
    contractId,
    contract,
    error
}
);





if(!contract){

throw new Error(
`Contract does not exist: ${contractId}`
);

}





let position = null;
let division = null;





if(contract.employees){



const positionResult =
await supabaseAdmin

.from("positions")

.select("title")

.eq(
"id",
contract.employees.position_id
)

.maybeSingle();



position =
positionResult.data;






const divisionResult =
await supabaseAdmin

.from("divisions")

.select("name")

.eq(
"id",
contract.employees.division_id
)

.maybeSingle();



division =
divisionResult.data;



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

Official Employment Contract Record

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

Contract Information

</h2>



<div className="
grid
md:grid-cols-3
gap-6
mt-6
">


<Info

title="Contract Number"

value={contract.contract_number || "Unknown"}

/>



<Info

title="Contract Type"

value={contract.contract_type || "Unknown"}

/>



<Info

title="Status"

value={contract.status || "Unknown"}

/>



</div>


</section>









<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Employee

</h2>



<div className="
bg-[#F5F8FB]
border
p-8
mt-6
">


<p className="
text-2xl
font-black
text-[#003B6F]
">

{
contract.employees?.roblox_username || "Unknown Employee"
}

</p>



<p className="
mt-3
text-gray-700
">

Employee Number:

{" "}

{
contract.employees?.employee_number || "Pending"
}

</p>




<p className="
mt-2
text-gray-700
">

Position:

{" "}

{
position?.title || "Unknown"
}

</p>




<p className="
mt-2
text-gray-700
">

Division:

{" "}

{
division?.name || "Unknown"
}

</p>



</div>


</section>









<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Signature Status

</h2>




<div className="
grid
md:grid-cols-2
gap-6
mt-6
">


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



<Info

title="Executive Signature"

value={
contract.executive_signed
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

Contract Document

</h2>



<div className="
mt-6
border
bg-white
p-8
whitespace-pre-wrap
leading-relaxed
">

{contract.content}


</div>


</section>








</div>


</div>


</section>


</main>

);


}






function Info(
{
title,
value
}:{
title:string,
value:string
}
){

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
