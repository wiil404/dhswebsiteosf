"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getEmployeeSession } from "@/app/lib/employee-auth";
import Editor from "@/app/components/Editor";


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

<main className="min-h-screen bg-[#F5F8FB] py-16">

<section className="max-w-3xl mx-auto px-6">

<div className="bg-white border shadow-xl p-10">


<h1 className="text-4xl font-black text-red-600">

Access Denied

</h1>


<p className="mt-4 text-gray-700">

You do not have permission to create policies.

</p>


<p className="mt-6 font-bold text-[#003B6F]">

Current Position: {currentPosition || "Unknown"}

</p>


</div>

</section>

</main>

);


}







async function createPolicy(formData:FormData){


"use server";



const title =
String(formData.get("title"));



const content =
String(formData.get("content"));



const classification =
String(formData.get("classification"));



const scope =
String(formData.get("scope"));



const category =
String(formData.get("category"));



const division =
formData.get("division") || null;




const isExecutive = [

"Secretary of Homeland Security",
"Deputy Secretary of Homeland Security",
"Chief of Staff",
"Under Secretary"

].includes(currentPosition);






const {error}=await supabaseAdmin

.from("policies")

.insert({

policy_number:
generatePolicyNumber(),


title,


content,


classification,


scope,


category,


division_id:
scope === "DIVISIONAL"

?
division || currentEmployee?.division_id

:

null,


created_by:
session.employees.id,


status:

isExecutive

?

"Approved"

:

"Pending Approval",



approved_by:

isExecutive

?

session.employees.id

:

null,


version:1,


image_urls:[]

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
max-w-6xl
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

Create official DHS policies and directives.

</p>


</div>






<div className="
p-10
space-y-8
">







<div>

<label className="block font-black text-[#003B6F] mb-2">

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

<label className="block font-black text-[#003B6F] mb-2">

Category

</label>


<select

name="category"

className="w-full border p-4"

>

<option>Security</option>

<option>Operations</option>

<option>Personnel</option>

<option>Training</option>

<option>Aviation</option>

<option>Administrative</option>

</select>


</div>









<div>

<label className="block font-black text-[#003B6F] mb-2">

Policy Scope

</label>


<select

name="scope"

className="w-full border p-4"

>


<option value="UNIVERSAL">

Department Wide Policy

</option>



<option value="DIVISIONAL">

Divisional Policy

</option>


</select>


</div>









<div>

<label className="block font-black text-[#003B6F] mb-2">

Division (for divisional policies)

</label>


<input

name="division"

placeholder="Division ID"

className="
w-full
border
p-4
"

/>


<p className="
text-sm
text-gray-500
mt-2
">

Leave blank for department-wide policies.

</p>


</div>









<div>

<label className="block font-black text-[#003B6F] mb-2">

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


<option value="PUBLIC">

Public Release

</option>


<option value="FOUO">

For Official Use Only (FOUO)

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


<input

type="hidden"

name="content"

value=""

/>



<Editor

value=""

onChange={()=>{}}

/>


<p className="
text-sm
text-gray-500
mt-2
">

Rich formatting enabled.

</p>


</div>









<button

className="
bg-[#003B6F]
text-white
px-10
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
