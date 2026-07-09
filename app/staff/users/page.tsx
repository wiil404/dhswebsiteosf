import { redirect } from "next/navigation";
import { requirePermission } from "../../lib/requirePermission";
import UserManager from "./UserManager";



export default async function StaffUsersPage(){


const profile = await requirePermission(
    "staff.manage"
);





if(!profile){

    redirect("/staff/login");

}







if(profile.role !== "Administrator"){

    redirect("/staff/news");

}







return (

<main

className="
max-w-7xl
mx-auto
px-6
py-16
"

>


<div

className="
bg-white
shadow-xl
border
border-gray-200
p-8
md:p-12
"

>






{/* HEADER */}


<div

className="
border-b
border-gray-200
pb-8
"

>


<h1

className="
text-4xl
font-bold
text-[#003B6F]
"

>

Staff Management

</h1>





<p

className="
mt-3
text-gray-600
"

>

Manage DHS staff accounts, roles, and system permissions.

</p>





<div

className="
mt-4
inline-flex
items-center
bg-[#F5F8FB]
border
border-[#D9E4EF]
px-4
py-2
text-sm
font-semibold
text-[#003B6F]
"

>

Administrator Access

</div>




</div>









{/* USER MANAGEMENT */}


<div

className="
mt-10
"

>


<UserManager />


</div>







</div>


</main>


);


}
