import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { signExecutiveContract } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function ContractViewPage({
    params
}:{
    params: Promise<{id:string}>
}){


const { id } = await params;



const {
    data:contract,
    error:contractError

}=await supabaseAdmin

.from("contracts")

.select("*")

.eq(
"id",
id
)

.single();





console.log("CONTRACT:", contract);
console.log("ERROR:", contractError);





if(contractError || !contract){

    throw new Error(
        `Contract does not exist: ${id}`
    );

}









const {
    data:employee

}=await supabaseAdmin

.from("employees")

.select("*")

.eq(
"id",
contract.employee_id
)

.single();






let position = null;

let division = null;



if(employee?.position_id){


const {data}=await supabaseAdmin

.from("positions")

.select("title")

.eq(
"id",
employee.position_id
)

.single();


position=data;


}





if(employee?.division_id){


const {data}=await supabaseAdmin

.from("divisions")

.select("name")

.eq(
"id",
employee.division_id
)

.single();


division=data;


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
border
shadow-2xl
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

{employee?.roblox_username || "Unknown"}

</p>



<p className="
mt-2
text-gray-600
">

Employee Number:

{" "}

{employee?.employee_number || "Pending"}

</p>




<p className="
mt-2
text-gray-600
">

Position:

{" "}

{position?.title || "Unknown"}

</p>




<p className="
mt-2
text-gray-600
">

Division:

{" "}

{division?.name || "Unknown"}

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





<div className="
border
p-6
bg-[#F5F8FB]
">


<p className="
uppercase
text-xs
font-bold
tracking-widest
text-gray-500
">

Employee Signature

</p>



<p className="
mt-3
font-black
text-[#003B6F]
">

{

contract.employee_signed

?

"Signed"

:

"Awaiting Signature"

}

</p>



{

contract.employee_signed && (

<div className="
mt-4
text-sm
">

<p>
Signed By: {contract.employee_signature_name}
</p>

<p>
Roblox ID: {contract.employee_signature_id}
</p>

<p>
Date: {
new Date(
contract.employee_signature_date
)
.toLocaleString("en-GB")
}
</p>

</div>

)

}



</div>









<div className="
border
p-6
bg-[#F5F8FB]
">


<p className="
uppercase
text-xs
font-bold
tracking-widest
text-gray-500
">

Executive Signature

</p>



<p className="
mt-3
font-black
text-[#003B6F]
">

{

contract.executive_signed

?

"Signed"

:

"Awaiting Signature"

}

</p>





{

!contract.executive_signed && (

<form

action={signExecutiveContract}

className="
mt-5
"

>

<input

type="hidden"

name="contractId"

value={contract.id}

/>


<button

className="
bg-[#003B6F]
text-white
px-6
py-3
font-black
"

>

Sign as Executive

</button>


</form>

)

}






{

contract.executive_signed && (

<div className="
mt-4
text-sm
">

<p>
Signed By: {contract.executive_signature_name}
</p>

<p>
Roblox ID: {contract.executive_signature_id}
</p>


<p>

Date:

{" "}

{
new Date(
contract.executive_signature_date
)
.toLocaleString("en-GB")
}

</p>


</div>

)

}



</div>





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
p-8
whitespace-pre-wrap
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





function Info({
title,
value
}:{
title:string,
value:string
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
