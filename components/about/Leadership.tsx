import Image from "next/image";
import { supabaseAdmin } from "../../app/lib/supabase-admin";




const leadershipRoles = [

{
title:
"Secretary of Homeland Security",

description:
"Leading the Department of Homeland Security and directing the overall mission of protecting the nation, strengthening communities, and coordinating Department operations."
},


{
title:
"Deputy Secretary of Homeland Security",

description:
"Supporting the Secretary and assisting with Department-wide coordination, strategic planning, and operational effectiveness."
},


{
title:
"Chief of Staff",

description:
"Managing executive operations, supporting senior leadership, and ensuring Department priorities are effectively carried out."
},


{
title:
"General Counsel",

description:
"Providing legal guidance, oversight, and support to ensure Department operations remain professional and compliant."
},


{
title:
"Under Secretary",

description:
"Supporting senior Department leadership and assisting with strategic initiatives across DHS operations."
}


];









async function getLeadership(){



const {

data

} = await supabaseAdmin

.from("employees")

.select(`

roblox_username,

roblox_user_id,

positions(
title
)

`)

.eq(
"status",
"Active"
);





if(!data)
return [];






return leadershipRoles.map(role=>{


const person =
data.find(

(employee:any)=>

employee.positions?.title === role.title

);





return {


...role,


username:
person?.roblox_username || "Vacant",


userId:
person?.roblox_user_id || null


};



});




}









async function getAvatar(id:number){



try{


const response =
await fetch(

`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=420x420&format=Png&isCircular=true`

);



const json =
await response.json();




return (

json.data?.[0]?.imageUrl
||
"/leadership/default.png"

);



}

catch{


return "/leadership/default.png";


}


}











export default async function Leadership(){



const leaders =
await getLeadership();






const leadersWithAvatar =
await Promise.all(

leaders.map(async leader=>({


...leader,


avatar:

leader.userId
?
await getAvatar(leader.userId)
:
"/leadership/default.png"


}))

);










return (

<section

className="
py-20
bg-white
"

>


<div

className="
max-w-7xl
mx-auto
px-6
"

>




<div

className="
text-center
"

>


<p

className="
uppercase
tracking-[0.3em]
font-black
text-[#003B6F]
"

>

Executive Leadership

</p>




<h2

className="
mt-4
text-5xl
font-black
text-[#003B6F]
"

>

Leading The Department

</h2>






<p

className="
mt-5
text-lg
text-gray-600
max-w-3xl
mx-auto
"

>

The Department is guided by experienced leaders responsible
for strategic direction, operational excellence, and advancing
the DHS mission.

</p>




</div>









<div

className="
grid
md:grid-cols-3
gap-8
mt-14
"

>





{

leadersWithAvatar.map(

leader=>(



<div

key={leader.title}

className="
bg-gray-50
border
shadow-lg
overflow-hidden
hover:-translate-y-2
transition
"

>






<div

className="
h-2
bg-[#F2C94C]
"

/>






<div

className="
p-8
text-center
"

>



<div

className="
relative
mx-auto
w-40
h-40
rounded-full
overflow-hidden
border-4
border-[#003B6F]
"

>



<Image

src={leader.avatar}

alt={leader.username}

fill

className="
object-cover
"

/>



</div>








<h3

className="
mt-6
text-2xl
font-black
text-[#003B6F]
"

>

{leader.username}

</h3>







<p

className="
mt-2
font-black
text-gray-900
"

>

{leader.title}

</p>







<p

className="
mt-5
text-gray-600
leading-relaxed
"

>

{leader.description}

</p>




</div>




</div>




)


)

}



</div>




</div>


</section>


);


}