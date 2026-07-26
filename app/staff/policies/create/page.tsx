import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { getEmployeeSession } from "@/app/lib/employee-auth";

import {
    canCreatePolicy,
    canManageAllPolicies
} from "@/app/lib/policy-permissions";



export const dynamic = "force-dynamic";
export const revalidate = 0;




function generatePolicyNumber(){

    const year = new Date()
    .getFullYear();


    const random =
    Math.floor(
        Math.random() * 9000
    ) + 1000;


    return `DHS-POL-${year}-${random}`;

}








export default async function CreatePolicyPage(){



const session = await getEmployeeSession();



if(!session){

redirect("/staff");

}



const employee = session.employees;





const {data:position}=await supabaseAdmin

.from("positions")

.select("title")

.eq(
"id",
employee.position_id
)

.single();





if(
!canCreatePolicy(
position?.title
)
){

return (

<main className="
min-h-screen
bg-[#F5F8FB]
p-16
">


<h1 className="
text-4xl
font-black
text-red-700
">

Access Denied

</h1>


<p className="
mt-4
">

You do not have permission to create policies.

</p>


</main>

);

}







const {data:divisions}=await supabaseAdmin

.from("divisions")

.select("*")

.order(
"name"
);








async function createPolicy(
formData:FormData
){

"use server";





const title =
String(
formData.get("title")
);




const content =
String(
formData.get("content")
);




const classification =
String(
formData.get("classification")
);




const division_id =
String(
formData.get("division")
);





const effective_date =
String(
formData.get("effective_date")
);




const review_date =
String(
formData.get("review_date")
);








const {error}=await supabaseAdmin

.from("policies")

.insert({

policy_number:
generatePolicyNumber(),


title,


content,


classification,


division_id:
division_id || null,


created_by:
employee.id,


status:
"Pending Approval",


effective_date:
effective_date || null,


review_date:
review_date || null


});






if(error){

console.error(error);

throw new Error(
error.message
);

}




redirect(
"/staff/policies"
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

action={createPolicy}

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

Create Policy

</h1>


<p className="
mt-3
text-blue-100
">

Submit an official Department policy.

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

Policy Title

</label>


<input

name="title"

required

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

Division

</label>



<select

name="division"

className="
w-full
border
p-4
"

>


<option value="">

Department Wide

</option>



{

divisions?.map((division:any)=>(

<option

key={division.id}

value={division.id}

>

{division.name}

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

Classification

</label>




<select

name="classification"

className="
w-full
border
p-4
"

>


<option value="Public">

Public

</option>



<option value="FOUO">

For Official Use Only

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

Effective Date

</label>



<input

type="date"

name="effective_date"

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

Review Date

</label>



<input

type="date"

name="review_date"

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

Policy Content

</label>




<textarea

name="content"

required

rows={15}

className="
w-full
border
p-4
"

/>



</div>









<button

className="
bg-[#003B6F]
text-white
px-8
py-4
font-black
text-lg
"

>

Submit Policy

</button>








</div>





</form>


</section>


</main>

);


}