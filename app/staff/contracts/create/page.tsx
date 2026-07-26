import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";




function replaceVariables(
    content:string,
    values:any
){

    let output = content;


    Object.keys(values).forEach(key=>{


        output = output.replaceAll(

            `{{${key}}}`,

            values[key] ?? ""

        );


    });


    return output;

}







export default async function CreateContractPage(){



const {data:templates}=await supabaseAdmin

.from("contract_templates")

.select("*")

.eq(
"active",
true
)

.order(
"title"
);






const {data:employees}=await supabaseAdmin

.from("employees")

.select(`

id,

roblox_username,

roblox_user_id,

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




const template_id =
String(
formData.get("template")
);





const public_view =
formData.get("public") === "on";





const {data:template}=await supabaseAdmin

.from("contract_templates")

.select("*")

.eq(
"id",
template_id
)

.single();





const { error } = await supabaseAdmin

.from("contracts")

.insert({

contract_number: generateContractNumber(),

employee_id,

title: template.title,

contract_type: template.contract_type,

content,

status: "Pending Employee Signature",

public_visible: publicVisible,

employee_signed: false,

executive_signed: false,

created_by: null

});


if(error){

    console.error(error);

    throw new Error(error.message);

}








const { error: contractError } = await supabaseAdmin

.from("contracts")

.insert({

template_id,

employee_id,

title: template.title,

content,

status: "Pending Employee Signature",

public_view,

});



if(contractError){

    console.error(contractError);

    throw new Error(contractError.message);

}







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

Generate official employee agreements from approved templates.

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

Contract Template

</label>


<select

name="template"

required

className="
w-full
border
p-4
"

>


<option value="">
Select Template
</option>



{
templates?.map((template:any)=>(

<option

key={template.id}

value={template.id}

>

{template.title}

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









<div className="
bg-[#F5F8FB]
border
p-6
">


<label className="
flex
gap-3
font-bold
items-center
">


<input

type="checkbox"

name="public"

/>


Allow public viewing of contract


</label>



<p className="
text-sm
text-gray-500
mt-2
">

Public users will only see the released contract and signatures.

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
