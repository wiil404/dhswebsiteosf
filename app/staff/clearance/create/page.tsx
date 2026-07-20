import { redirect } from "next/navigation";

import CreateClearanceForm from "./CreateClearanceForm";

import { canManageClearance } from "../../../lib/clearance";


export default async function CreateClearancePage(){


const allowed =
await canManageClearance();



if(!allowed){

    redirect("/staff/dashboard");

}





return (

<main className="
max-w-5xl
mx-auto
px-6
py-16
">


<div className="
bg-white
shadow-xl
border
border-gray-200
p-10
">


<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Create Security Clearance

</h1>


<p className="
mt-3
text-gray-600
">

Assign clearance access to employees, external agencies, or civilians.

</p>





<CreateClearanceForm />


</div>


</main>

);


}