import Link from "next/link";
import { redirect } from "next/navigation";

import { getUser } from "../../lib/auth";

import {
    getProfile,
    canCreateNews,
    canManageUsers,
    canEditNews,
    canDeleteNews,
    hasPermission
} from "../../lib/permissions";

import { canManageClearance } from "../../lib/clearance";

import { supabaseAdmin } from "../../lib/supabase-admin";

import { logout } from "../actions/logout";



export default async function Dashboard(){


    const user = await getUser();



    if(!user){

        redirect("/staff/login");

    }





    const profile =
    await getProfile();





    if(!profile){

        redirect("/staff/login");

    }






    const {
        data:employee

    } = await supabaseAdmin

    .from("employees")

    .select(`

        roblox_username,

        roblox_user_id,

        email,

        positions(
            title
        ),

        divisions(
            name
        )

    `)

    .eq(
        "user_id",
        user.id
    )

    .single();









    const createNews =
    await canCreateNews();



    const editNews =
    await canEditNews();



    const deleteNews =
    await canDeleteNews();



    const manageUsers =
    await canManageUsers();



    const viewAudit =
    await hasPermission(
        "audit.view"
    );





    const manageOrganisation =
    profile.role === "Administrator";





    const manageClearance =
    await canManageClearance();









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
flex
justify-between
items-center
border-b
border-gray-200
pb-8
"

>


<div>


<h1

className="
text-4xl
font-bold
text-[#003B6F]
"

>

DHS Staff Dashboard

</h1>



<p

className="
mt-3
text-gray-500
"

>

Welcome back,{" "}

{
employee?.roblox_username ||
profile.email
}

</p>


</div>








<form action={logout}>


<button

className="
bg-red-600
text-white
px-6
py-3
font-semibold
hover:bg-red-700
transition
"

>

Logout

</button>


</form>



</div>









{/* PROFILE */}


<div

className="
mt-10
border
border-[#D9E4EF]
bg-[#F5F8FB]
p-7
flex
items-center
gap-6
"

>


<div

className="
w-20
h-20
rounded-full
bg-[#003B6F]
text-white
flex
items-center
justify-center
text-3xl
font-bold
"

>

{

employee?.roblox_username
?.charAt(0)

||

profile.email.charAt(0)

}


</div>








<div>


<h2

className="
text-2xl
font-bold
text-gray-900
"

>


{
employee?.roblox_username ||
profile.email
}


</h2>





<p

className="
mt-1
text-[#003B6F]
font-semibold
"

>

{

employee?.positions?.title ||

"Staff Member"

}

</p>





<p

className="
text-gray-600
"

>

{

employee?.divisions?.name ||

"Department of Homeland Security"

}

</p>






<p

className="
mt-2
text-sm
text-gray-500
"

>

Role: {profile.role}

</p>



</div>



</div>









{/* PORTAL GRID */}


<div

className="
mt-12
grid
md:grid-cols-2
gap-6
"

>







{
createNews && (

<PortalCard

href="/staff/news/create"

title="Create Press Release"

description="Publish new DHS statements, notices and official releases."

/>

)

}









{

(editNews || deleteNews) && (

<PortalCard

href="/staff/news"

title="Manage News Releases"

description="Edit, publish and manage existing DHS announcements."

/>

)

}









{
manageUsers && (

<PortalCard

href="/staff/users"

title="Staff Management"

description="Manage staff accounts, access and user roles."

/>

)

}









{
manageOrganisation && (

<PortalCard

href="/staff/organisation"

title="Organisation Management"

description="Manage divisions, positions and department structure."

/>

)

}









{
manageClearance && (

<PortalCard

href="/staff/clearance"

title="Security Clearance Management"

description="Manage DHS, White House, Capitol and Airport restricted area access, clearance levels and blacklists."

/>

)

}









{
manageUsers && (

<PortalCard

href="/staff/employees"

title="Employee Directory"

description="View and manage DHS employee records."

/>

)

}








<PortalCard

href="/news"

title="Public News Portal"

description="View publicly released DHS statements."

/>









{
viewAudit && (

<PortalCard

href="/staff/audit"

title="Audit Logs"

description="Review staff actions and system activity."

/>

)

}





</div>








</div>


</main>


);


}









function PortalCard({

href,
title,
description

}:{

href:string;

title:string;

description:string;

}){


return (

<Link

href={href}

className="
group
relative
overflow-hidden
border
border-gray-200
bg-white
p-7
shadow-sm
transition
duration-300
hover:-translate-y-1
hover:shadow-xl
"

>


<div

className="
absolute
left-0
top-0
h-full
w-1
bg-[#003B6F]
group-hover:bg-[#F2C94C]
transition
"

/>





<h2

className="
text-xl
font-bold
text-[#003B6F]
"

>

{title}

</h2>





<p

className="
mt-3
text-gray-600
leading-relaxed
"

>

{description}

</p>





<p

className="
mt-6
text-sm
font-bold
text-[#003B6F]
opacity-0
group-hover:opacity-100
transition
"

>

Open Portal →

</p>





</Link>


);


}
