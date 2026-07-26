import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

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



export const dynamic = "force-dynamic";





async function getRobloxAvatar(id:number){

    try{

        const response = await fetch(

            `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=420x420&format=Png&isCircular=true`,

            {
                cache:"no-store"
            }

        );


        const data = await response.json();


        return data.data?.[0]?.imageUrl || null;


    }catch{

        return null;

    }

}







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
division_id,
position_id

`)

.eq(
"user_id",
user.id
)

.maybeSingle();



let positionTitle = "Staff Member";
let divisionName = "Department of Homeland Security";


if(employee?.position_id){

const {data:position}=await supabaseAdmin

.from("positions")

.select("title")

.eq(
"id",
employee.position_id
)

.single();


if(position){

    positionTitle = position.title;

}

}



if(employee?.division_id){

const {data:division}=await supabaseAdmin

.from("divisions")

.select("name")

.eq(
"id",
employee.division_id
)

.single();


if(division){

    divisionName = division.name;

}

}



console.log("EMPLOYEE:", employee);


console.log("EMPLOYEE:", employee);
console.log("EMPLOYEE ERROR:", employeeError);





const avatar = employee?.roblox_user_id

? await getRobloxAvatar(employee.roblox_user_id)

: null;







const createNews =
await canCreateNews();


const editNews =
await canEditNews();


const deleteNews =
await canDeleteNews();


const manageUsers =
await canManageUsers();


const viewAudit =
await hasPermission("audit.view");


const manageClearance =
await canManageClearance();


const policyCreate =
await hasPermission("policies.create");


const policyManage =
await hasPermission("policies.manage");


const contractsManage =
await hasPermission("contracts.manage");


const administrator =
profile.role === "Administrator";









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


<div className="
flex
justify-between
items-start
gap-6
flex-wrap
">


<div>

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


</div>





<form action={logout}>

<button

className="
bg-red-600
hover:bg-red-700
transition
text-white
px-6
py-3
font-black
shadow-lg
"

>

Logout

</button>


</form>



</div>


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
relative
w-32
h-32
rounded-full
bg-white/10
border-4
border-[#F2C94C]
overflow-hidden
flex
items-center
justify-center
text-5xl
font-black
">


{

avatar ?

<Image

src={avatar}

alt="Staff Avatar"

fill

className="object-cover"

/>

:

employee?.roblox_username?.charAt(0)

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

{profile.role || "Staff Member"}

</p>





<h2 className="
text-4xl
font-black
mt-2
">

{

employee?.roblox_username ||

profile.email

}

</h2>





<p className="
mt-2
text-xl
text-blue-100
">

{

positionTitle

}

</p>





<p className="
text-blue-200
">

{

divisionName

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
positionTitle
}

/>




<InfoCard

title="Division"

value={
divisionName
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

<PortalCard

href="/staff/news/create"

title="Create Press Release"

description="Publish official DHS statements and releases."

/>

)

}





{

(editNews || deleteNews) && (

<PortalCard

href="/staff/news"

title="Manage News Releases"

description="Edit, publish and maintain existing communications."

/>

)

}



</PortalSection>









<PortalSection

title="Policy & Directives"

description="Create, review and maintain Department policies."

>



{

policyCreate && (

<PortalCard

href="/staff/policies/create"

title="Create Policy"

description="Draft and submit new DHS directives."

/>

)

}





{

policyManage && (

<PortalCard

href="/staff/policies"

title="Manage Policies"

description="Review, approve and maintain policy records."

/>

)

}



</PortalSection>









<PortalSection

title="Personnel Operations"

description="Manage employees, contracts and workforce records."

>



{

manageUsers && (

<PortalCard

href="/staff/employees"

title="Employee Directory"

description="View and manage DHS employee records."

/>

)

}





{

manageUsers && (

<PortalCard

href="/staff/users"

title="Staff Management"

description="Manage accounts, permissions and access."

/>

)

}





{

contractsManage && (

<PortalCard

href="/staff/contracts"

title="Contract Management"

description="Create and manage employee agreements."

/>

)

}



</PortalSection>









<PortalSection

title="Security Operations"

description="Manage restricted systems, clearance and security access."

>



{

manageClearance && (

<PortalCard

href="/staff/clearance"

title="Security Clearance Registry"

description="Manage clearance levels and restricted access."

/>

)

}





{

manageClearance && (

<PortalCard

href="/staff/clearance/create"

title="Create Clearance"

description="Issue new clearance records."

/>

)

}



</PortalSection>









<PortalSection

title="Organisation Management"

description="Maintain the DHS organisational structure."

>



{

administrator && (

<PortalCard

href="/staff/organisation"

title="Organisation Settings"

description="Manage divisions and department structure."

/>

)

}







</PortalSection>









<PortalSection

title="System Administration"

description="Administrative tools and monitoring systems."

>



{

viewAudit && (

<PortalCard

href="/staff/audit"

title="Audit Logs"

description="Review system activity and staff actions."

/>

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
text-xs
uppercase
tracking-widest
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
