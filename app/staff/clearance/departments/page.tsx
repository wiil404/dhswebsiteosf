import { redirect } from "next/navigation";
import Link from "next/link";

import { supabaseAdmin } from "../../../lib/supabase-admin";
import { canManageClearance } from "../../../lib/clearance";



export default async function DepartmentClearancePage(){


const allowed =
await canManageClearance();



if(!allowed){

    redirect("/staff/dashboard");

}





const {

data:departments

} = await supabaseAdmin


.from("security_organisations")

.select(`

*

,

organisation_clearances(
    *
)

`)


.order(
"name"
);






return (

<main className="
max-w-7xl
mx-auto
px-6
py-16
">


<div className="
bg-white
shadow-xl
border
p-10
">



<div className="
flex
justify-between
items-center
border-b
pb-6
">


<div>


<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Department Clearance

</h1>



<p className="
mt-3
text-gray-600
">

Authorise entire organisations and agencies.

</p>


</div>


</div>







<div className="
mt-10
space-y-6
">


{

departments?.map((dept:any)=>(


<div

key={dept.id}

className="
border
p-6
flex
justify-between
items-center
"


>


<div>


<h2 className="
text-xl
font-bold
text-[#003B6F]
">

{dept.name}

</h2>



<p className="
text-gray-600
">

{dept.organisation_type}

</p>


</div>






<Link

href={`/staff/clearance/departments/${dept.id}`}

className="
bg-[#003B6F]
text-white
px-5
py-3
font-bold
"

>

Manage

</Link>




</div>


))

}


</div>






</div>

</main>


);


}