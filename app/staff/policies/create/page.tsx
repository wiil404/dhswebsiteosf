import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";


export const dynamic = "force-dynamic";
export const revalidate = 0;



const policyRoles = [

"Secretary of Homeland Security",
"Deputy Secretary of Homeland Security",
"Chief of Staff",
"Under Secretary",
"Secret Service Director",
"CBP Commissioner",
"Special Response Team Commander",
"Under Secretary for Aviation Operations",
"Senior Flight Officer",
"Deputy Director",
"Assistant Director",
"Chief of Operations",
"CBP Deputy Commissioner",
"Special Agent in Charge (SRT)"

];





function generatePolicyNumber(){

const year = new Date().getFullYear();

const random =
Math.floor(Math.random() * 9000) + 1000;


return `DHS-POL-${year}-${random}`;

}







export default async function CreatePolicyPage(){



const session = await getEmployeeSession();



if(!session){

redirect("/employee/login");

}






const {data:currentEmployee}=await supabaseAdmin

.from("employees")

.select(`

id,

roblox_username,

division_id,

positions(

title

)

`)

.eq(
"id",
session.employees.id
)

.single();







const currentPosition =

(currentEmployee?.positions as any)?.title || "";







const canCreatePolicy =

policyRoles.some(

(role)=>

role.toLowerCase().trim()

===

currentPosition.toLowerCase().trim()

);








if(!canCreatePolicy){


return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-3xl
mx-auto
px-6
">


<div className="
bg-white
border
shadow-xl
p-10
">


<h1 className="
text-4xl
font-black
text-red-600
">

Access Denied

</h1>



<p className="
mt-4
text-gray-700
">

You do not have permission to create policies.

</p>



<p className="
mt-6
font-bold
text-[#003B6F]
">

Current Position:

{" "}

{currentPosition || "Unknown"}

</p>



</div>


</section>


</main>

);


}








async function createPolicy(formData:FormData){

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



const division =
formData.get("division") || null;





const {error}=await supabaseAdmin

.from("policies")

.insert({

policy_number:
generatePolicyNumber(),

title,

content,

classification,

division_id:
division || currentEmployee?.division_id || null,

created_by:
session.employees.id,

status:
"Pending Approval",

effective_date:
null,

review_date:
null

});




if(error){

throw new Error(error.message);

}



redirect("/staff/policies");


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
border
shadow-2xl
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

Submit official Department policies for approval.

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

placeholder="Policy Name"

/>


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


<option>

Public

</option>


<option>

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

Policy Content

</label>



<textarea

name="content"

required

rows={12}

className="
w-full
border
p-4
"

placeholder="Write policy contents here..."

>


</textarea>


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

Submit Policy

</button>






</div>


</form>


</section>


</main>


);


}
