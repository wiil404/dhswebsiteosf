import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { canManageClearance } from "../../../lib/clearance";
import ClearanceForm from "./ClearanceForm";



export default async function ClearanceEditPage({

params

}:{

params:{
    id:string
}

}){


const allowed =
await canManageClearance();



if(!allowed){

    redirect("/staff/dashboard");

}



const {
    data:subject

} = await supabaseAdmin


.from("security_subjects")


.select(`

*

,

security_clearances(
    *
)

`)


.eq(
"id",
params.id
)


.single();





if(!subject){

    return (

        <main className="p-12">

            <h1 className="text-3xl font-bold">

            Subject not found

            </h1>

        </main>

    );

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
border
shadow-xl
p-10
">


<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Manage Clearance

</h1>


<p className="mt-3 text-gray-600">

{subject.full_name}

</p>



<ClearanceForm

subject={subject}

/>


</div>


</main>

);


}