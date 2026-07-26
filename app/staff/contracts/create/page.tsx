import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";



function generateContractNumber(){

    const year = new Date().getFullYear();

    const random =
        Math.floor(
            Math.random()*9000
        ) + 1000;


    return `DHS-CON-${year}-${random}`;

}





export default async function CreateContractPage(){



const {

data:employees

}= await supabaseAdmin

.from("employees")

.select(`

id,

roblox_username,

employee_number,

positions(

title

),

divisions(

name

)

`)

.eq(
"status",
"Active"
)

.order(
"roblox_username"
);







async function createContract(
formData:FormData
){


"use server";



const employee_id =
String(
formData.get("employee")
);




const title =
String(
formData.get("title")
);




const type =
String(
formData.get("type")
);




const content =
String(
formData.get("content")
);




const publicVisible =
formData.get("public") === "on";





await supabaseAdmin

.from("contracts")

.insert({

contract_number:
generateContractNumber(),

employee_id,

title,

contract_type:
type,

content,

public_visible:
publicVisible,

status:
"Pending Employee Signature",

employee_signed:false,

executive_signed:false

});





redirect(
"/staff/contracts"
);


}









return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-5xl
mx-auto
px-6
">



<form
action={createContract}
className="
bg-white
shadow-2xl
border
overflow-hidden
"
>


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

Create Contract

</h1>



<p className="
mt-3
text-blue-100
">

Generate an official employee agreement.

</p>


</div>









<div className="
p-10
space-y-8
">







<div>

<label className="
block
font-black
text-[#003B6F]
mb-2
">

Employee

</label>


<select

name="employee"

required

className="
w-full
border
p-4
"

>


<option value="">
Select Employee
</option>



{

employees?.map((employee:any)=>(


<option

key={employee.id}

value={employee.id}

>

{employee.roblox_username}

{" - "}

{employee.positions?.title || "Employee"}

{" - "}

{employee.divisions?.name || "DHS"}

</option>


))


}


</select>


</div>









<div>


<label className="
block
font-black
text-[#003B6F]
mb-2
">

Contract Title

</label>


<input

name="title"

required

placeholder="Example: Operational Assignment Agreement"

className="
w-full
border
p-4
"

/>


</div>









<div>


<label className="
block
font-black
text-[#003B6F]
mb-2
">

Contract Type

</label>



<select

name="type"

className="
w-full
border
p-4
"

>


<option>
Employment Agreement
</option>


<option>
Promotion Agreement
</option>


<option>
Operational Assignment
</option>


<option>
Confidentiality Agreement
</option>


<option>
Other
</option>


</select>



</div>









<div>


<label className="
block
font-black
text-[#003B6F]
mb-2
">

Contract Terms

</label>


<textarea

name="content"

required

rows={12}

placeholder="
Enter official contract wording here...
"

className="
w-full
border
p-4
"

/>


</div>









<div className="
bg-[#F5F8FB]
border
p-6
">


<label className="
flex
items-center
gap-3
font-bold
">


<input

type="checkbox"

name="public"

/>


Allow public viewing of this contract


</label>



<p className="
text-sm
text-gray-500
mt-2
">

Public viewers will only see the contract and completed signatures.

</p>


</div>









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

Create Contract

</button>





</div>


</form>


</section>


</main>


);


}