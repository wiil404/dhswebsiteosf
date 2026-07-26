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



const profile = await getProfile();


if(!profile){

    redirect("/staff/login");

}






const {data:employee}=await supabaseAdmin

.from("employees")

.select(`

roblox_username,

employee_number,

status,

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

.maybeSingle();







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


const manageClearance =
await canManageClearance();


const administrator =
profile.role === "Administrator";



const policyCreate =
await hasPermission(
"policies.create"
);


const policyManage =
await hasPermission(
"policies.manage"
);


const contractsManage =
await hasPermission(
"contracts.manage"
);








return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-7xl
mx-auto
px-6
">





<div className="
bg-white
shadow-2xl
border
overflow-hidden
">



<div className="
h-3
bg-[#F2C94C]
"/>








<header className="
bg-gradient-to-r
from-[#003B6F]
to-[#005AA7]
text-white
p-10
md:p-14
">



<p className="
uppercase
tracking-[0.35em]
text-sm
font-black
text-[#F2C94C]
">

Department of Homeland Security

</p>




<h1 className="
text-5xl
font-black
mt-4
">

Staff Operations Portal

</h1>




<p className="
mt-4
text-blue-100
text-lg
max-w-3xl
">

Manage Department communications, personnel,
policies, contracts, security systems and
administrative operations.

</p>



</header>









<section className="
p-10
md:p-14
">







<div className="
bg-[#003B6F]
text-white
p-8
shadow-xl
flex
flex-col
md:flex-row
gap-8
items-center
">






<div className="
w-32
h-32
rounded-full
bg-white/10
border-4
border-[#F2C94C]
flex
items-center
justify-center
text-5xl
font-black
">

{

employee?.roblox_username
?.charAt(0)
||
"S"

}

</div>







<div>


<p className="
uppercase
tracking-widest
text-sm
text-blue-200
font-bold
">

Staff Member

</p>



<h2 className="
text-4xl
font-black
mt-2
">

{

employee?.roblox_username
||
profile.email

}

</h2>





<p className="
mt-2
text-xl
text-blue-100
">

{

employee?.positions?.[0]?.title
||
"Staff Member"

}

</p>




<p className="
text-blue-200
">

{

employee?.divisions?.[0]?.name
||
"Department of Homeland Security"

}

</p>




<div className="
flex
gap-4
mt-5
flex-wrap
">


<span className="
bg-green-500/20
border
border-green-300
px-5
py-2
font-bold
">

✓ ACTIVE

</span>



{

employee?.employee_number && (

<span className="
bg-white/10
px-5
py-2
font-bold
">

{employee.employee_number}

</span>

)

}



</div>



</div>



</div>









<div className="
grid
md:grid-cols-3
gap-6
mt-10
">


<InfoCard

title="Position"

value={
employee?.positions?.[0]?.title ||
"Unknown"
}

/>



<InfoCard

title="Division"

value={
employee?.divisions?.[0]?.name ||
"Unknown"
}

/>



<InfoCard

title="Status"

value={
employee?.status ||
"Unknown"
}

/>



</div>








<PortalSection

title="Communications"

description="Manage official Department announcements and public messaging."

>


{

createNews && (

PortalCard(

"/staff/news/create",

"Create Press Release",

"Publish official DHS statements and releases."

)

)

}




{

(editNews || deleteNews) && (

PortalCard(

"/staff/news",

"Manage News Releases",

"Edit, publish and maintain existing communications."

)

)

}



</PortalSection>








<PortalSection

title="Policy & Directives"

description="Create, review and maintain Department policies."

>


{

policyCreate && (

PortalCard(

"/staff/policies/create",

"Create Policy",

"Draft and submit new DHS directives."

)

)

}



{

policyManage && (

PortalCard(

"/staff/policies",

"Manage Policies",

"Review, approve and maintain policy records."

)

)

}



</PortalSection>

<PortalSection

title="Personnel Operations"

description="Manage employees, contracts and workforce records."

>


{

manageUsers && (

PortalCard(

"/staff/employees",

"Employee Directory",

"View and manage DHS employee records."

)

)

}





{

manageUsers && (

PortalCard(

"/staff/users",

"Staff Management",

"Manage accounts, permissions and access."

)

)

}






{

contractsManage && (

PortalCard(

"/staff/contracts",

"Contract Management",

"Create and manage employee agreements."

)

)

}



</PortalSection>









<PortalSection

title="Security Operations"

description="Manage restricted systems, clearance and security access."

>



{

manageClearance && (

PortalCard(

"/staff/clearance",

"Security Clearance Registry",

"Manage clearance levels and restricted access."

)

)

}



{

administrator && (

PortalCard(

"/staff/clearance/create",

"Create Clearance",

"Issue new clearance records."

)

)

}



</PortalSection>









<PortalSection

title="Organisation Management"

description="Maintain the DHS organisational structure."

>



{

administrator && (

PortalCard(

"/staff/organisation",

"Organisation Settings",

"Manage divisions and department structure."

)

)

}



{

administrator && (

PortalCard(

"/staff/positions",

"Position Management",

"Manage roles and assignments."

)

)

}



</PortalSection>









<PortalSection

title="System Administration"

description="Administrative tools and monitoring systems."

>



{

viewAudit && (

PortalCard(

"/staff/audit",

"Audit Logs",

"Review system activity and staff actions."

)

)

}





<PortalCard

href="/news"

title="Public Website"

description="View public DHS communications."

/>



<PortalCard

href="/employee/dashboard"

title="Employee Portal"

description="Access the employee workforce portal."

/>



</PortalSection>









<section className="
mt-16
border-l-4
border-[#F2C94C]
bg-[#F5F8FB]
p-8
">


<h3 className="
text-2xl
font-black
text-[#003B6F]
">

Staff Portal Security

</h3>



<p className="
mt-3
text-gray-700
leading-relaxed
">

This portal provides authorised DHS staff with access to internal management systems. Available tools are determined by assigned permissions and responsibilities.

</p>



</section>







</section>


</div>


</section>


</main>


);


}








function InfoCard({

title,

value

}:{

title:string;

value:string;

}){


return (

<div className="
bg-[#F5F8FB]
border
p-6
">


<p className="
uppercase
tracking-widest
text-xs
font-bold
text-gray-500
">

{title}

</p>



<p className="
mt-3
text-xl
font-black
text-[#003B6F]
">

{value}

</p>



</div>

);


}









function PortalSection({

title,

description,

children

}:{

title:string;

description:string;

children:React.ReactNode;

}){


return (

<section className="
mt-14
">


<div className="
flex
items-end
justify-between
flex-wrap
gap-4
">


<div>


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

{title}

</h2>


<p className="
mt-2
text-gray-600
">

{description}

</p>


</div>


</div>





<div className="
grid
md:grid-cols-3
gap-6
mt-8
">


{children}


</div>



</section>

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
bg-white
border
shadow-sm
p-7
hover:shadow-xl
transition
"

>


<div className="
absolute
left-0
top-0
h-full
w-1
bg-[#003B6F]
group-hover:bg-[#F2C94C]
transition
"/>





<div className="
relative
">



<div className="
w-12
h-12
rounded-full
bg-[#003B6F]
text-white
flex
items-center
justify-center
font-black
text-xl
mb-5
group-hover:bg-[#005AA7]
transition
">

✓

</div>





<h3 className="
text-xl
font-black
text-[#003B6F]
">

{title}

</h3>





<p className="
mt-3
text-gray-600
leading-relaxed
">

{description}

</p>





<p className="
mt-6
font-black
text-[#003B6F]
opacity-0
group-hover:opacity-100
transition
">

Open System →

</p>



</div>



</Link>


);


}
