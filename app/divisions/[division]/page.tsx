import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabase-admin";



const divisions:any = {



"special-response-team":{

divisionId:
"4161d355-cdf6-4351-8c55-2f9fbc29cbca",

folder:"srt",

name:
"Special Response Team",

short:
"SRT",

commander:
"Special Response Team Commander",


heroTitle:
"THE NATION'S PREMIER TACTICAL RESPONSE FORCE",


description:

"The Special Response Team represents the highest level of tactical capability within the Department of Homeland Security. Built from highly trained operators, SRT personnel respond to critical incidents, specialised missions, and high-risk situations requiring precision, discipline, and teamwork.",



history:

"Established as DHS's elite operational response division, the Special Response Team exists to provide rapid deployment capability when conventional resources are insufficient.",



capabilities:[

{
title:"Rapid Response",
text:"Deploying specialised operators to incidents requiring immediate tactical intervention."
},

{
title:"Special Operations",
text:"Conducting advanced missions requiring exceptional skill, coordination, and preparation."
},

{
title:"Operational Readiness",
text:"Maintaining constant readiness through training, discipline, and teamwork."
}

],



roles:[

"Special Response Team Commander",

"Special Agent in Charge (SRT)",

"Assistant Special Agent in Charge (SRT)",

"Operator",

"Probationary Operator"

],


discord:true,


discordLink:
"https://discord.gg/YNmyjdqUp"

},






"secret-service":{

divisionId:
"039748c5-271e-4b15-8192-938daaa28272",

folder:"usss",

name:
"United States Secret Service",

short:
"USSS",

commander:
"Secret Service Director",


heroTitle:
"PROTECTING NATIONAL LEADERSHIP",


description:

"The United States Secret Service provides elite protective operations, threat prevention, and specialised security support. Personnel safeguard critical individuals while supporting the Department's broader national security mission.",


history:

"Operating as one of DHS's most recognised protective organisations, the Secret Service combines professionalism, intelligence, and operational excellence.",


capabilities:[

{
title:"Protective Operations",
text:"Providing security for protected individuals and national leadership."
},

{
title:"Threat Assessment",
text:"Identifying and preventing potential threats through intelligence."
},

{
title:"Security Operations",
text:"Supporting DHS missions through specialised protective expertise."
}

],



roles:[

"Secret Service Director",

"Deputy Director",

"Assistant Director",

"Special Agent in Charge",

"Deputy Special Agent in Charge",

"Supervisory Special Agent",

"Senior Special Agent",

"Special Agent",

"Probationary Agent"

]

},







"helicopter-taskforce":{

divisionId:
"49cf99c6-3dec-4105-b678-2795718cad79",

folder:"leht",

name:
"Law Enforcement Helicopter Taskforce",

short:
"LEHT",

commander:
"Under Secretary for Aviation Operations",


heroTitle:
"FROM ABOVE, WE PROTECT",


description:

"The Law Enforcement Helicopter Taskforce provides DHS with advanced aviation capability. Flight personnel deliver rapid response, aerial support, and operational assistance across Department missions.",


history:

"LEHT was created to provide DHS with a dedicated aviation element capable of supporting ground operations and emergency response.",


capabilities:[

{
title:"Aviation Support",
text:"Providing aerial assistance to DHS operations."
},

{
title:"Rapid Deployment",
text:"Delivering personnel and resources quickly through aviation assets."
},

{
title:"Flight Excellence",
text:"Maintaining professional aviation standards."
}

],



roles:[

"Under Secretary for Aviation Operations",

"Senior Flight Officer",

"Flight Officer",

"Pilot",

"Trainee"

]


},







"cbp":{


divisionId:
"a5540d05-f9cc-4082-8228-2289b02e241f",

folder:"cbp",

name:
"United States Customs and Border Protection",

short:
"CBP",

commander:
"Customs and Border Protection Commissioner",


heroTitle:
"SECURING OUR BORDERS",


description:

"Customs and Border Protection protects communities, secures national borders, and supports homeland security through dedicated enforcement professionals.",


history:

"CBP serves as DHS's frontline security organisation, protecting the nation through enforcement, awareness, and operational excellence.",


capabilities:[

{
title:"Border Security",
text:"Protecting national borders through professional enforcement."
},

{
title:"Customs Operations",
text:"Supporting safe and lawful movement across borders."
},

{
title:"Community Protection",
text:"Keeping communities safe through dedicated service."
}

],


roles:[

"CBP Commissioner",

"CBP Deputy Commissioner",

"Supervisory Customs Agent",

"Customs Agent",

"Probationary Customs Agent"

]


},








"public-affairs":{


divisionId:
"3c17bd3b-1992-4571-85bc-5cbb45939eed",

folder:"pao",

name:
"Public Affairs",

short:
"PAO",

commander:
"Under Secretary for Public Affairs",


heroTitle:
"THE VOICE OF DHS",


description:

"Public Affairs manages Department communications, public information, and transparency efforts while connecting DHS operations with the communities it serves.",


history:

"Public Affairs ensures accurate communication between DHS personnel, leadership, media, and the public.",


capabilities:[

{
title:"Communications",
text:"Delivering clear and accurate Department information."
},

{
title:"Media Relations",
text:"Managing relationships with external organisations."
},

{
title:"Public Trust",
text:"Supporting transparency and confidence."
}

],


roles:[

"Under Secretary for Public Affairs",

"Public Affairs Staff"

]


}



};









async function getCommander(config:any){


const {
data:position

}=await supabaseAdmin

.from("positions")

.select("id")

.eq(
"title",
config.commander
)

.single();



if(!position)
return null;




const {
data:employee

}=await supabaseAdmin

.from("employees")

.select(`
roblox_username,
roblox_user_id
`)

.eq(
"division_id",
config.divisionId
)

.eq(
"position_id",
position.id
)

.single();



return employee;


}








async function getAvatar(id:number){


try{


const res = await fetch(

`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=420x420&format=Png&isCircular=false`

,
{
cache:"no-store"
}

);


const data = await res.json();



if(
data.data &&
data.data.length > 0 &&
data.data[0].state === "Completed"
){

return data.data[0].imageUrl;

}


return "/leadership/default.png";


}

catch(error){

console.error(
"Roblox avatar error:",
error
);

return "/leadership/default.png";

}


}









export default async function DivisionPage({

params

}:{

params:Promise<{
division:string
}>

}){


const {
division

}=await params;



const config =
divisions[division];



if(!config)
notFound();




const commander =
await getCommander(config);



const avatar =
commander?.roblox_user_id
?
await getAvatar(
commander.roblox_user_id
)
:
"/leadership/default.png";






return (

<main className="bg-[#003B6F] py-10">


<section className="max-w-7xl mx-auto px-6">


<div className="bg-white shadow-2xl overflow-hidden">



<div className="relative h-[550px]">


<Image

src={`/divisions/${config.folder}/hero.jpg`}

fill

alt={config.name}

className="object-cover"

/>


<div className="absolute inset-0 bg-gradient-to-t from-[#003B6F] via-black/40 to-transparent"/>


<div className="absolute bottom-10 left-10 text-white">


<p className="text-[#F2C94C] font-bold tracking-widest">

DEPARTMENT OF HOMELAND SECURITY

</p>


<h1 className="text-6xl font-black mt-3">

{config.short}

</h1>


<p className="text-3xl font-bold">

{config.heroTitle}

</p>


</div>


</div>






<div className="p-10 md:p-16">





{/* COMMANDER PROFILE */}

<section>

<h2 className="text-4xl font-black text-[#003B6F]">
    Division Leadership
</h2>


<div className="
mt-8
flex
flex-col
md:flex-row
items-center
gap-10
bg-gray-50
border
p-10
">


{/* ROBLOX AVATAR */}

<div
className="
relative
w-56
h-56
rounded-full
overflow-hidden
border-4
border-[#003B6F]
shadow-xl
flex-shrink-0
"
>


<Image

src={avatar}

alt={
`${commander?.roblox_username || "Vacant"} Roblox Avatar`
}

fill

sizes="224px"

className="
object-cover
"

/>


</div>






{/* COMMANDER INFORMATION */}

<div>


<p

className="
uppercase
tracking-[0.25em]
text-sm
font-bold
text-[#003B6F]
"

>

Division Commander

</p>



<h3

className="
mt-3
text-5xl
font-black
text-[#003B6F]
"

>

{
commander?.roblox_username
||
"Vacant"
}

</h3>





<h4

className="
mt-3
text-2xl
font-bold
text-gray-800
"

>

{
config.commander
}

</h4>





<p

className="
mt-5
text-gray-600
max-w-xl
leading-relaxed
"

>

The Division Commander is responsible for overseeing departmental operations, maintaining organisational standards, and leading personnel in support of the Department of Homeland Security mission.

</p>



</div>


</div>


</section>







<section className="mt-16">


<h2 className="text-4xl font-black text-[#003B6F]">

About The Division

</h2>


<p className="mt-5 text-lg text-gray-700 leading-relaxed">

{config.description}

</p>


<p className="mt-5 text-lg text-gray-700 leading-relaxed">

{config.history}

</p>


</section>








<section className="mt-16">


<h2 className="text-4xl font-black text-[#003B6F]">

Capabilities

</h2>



<div className="grid md:grid-cols-3 gap-6 mt-8">


{config.capabilities.map((x:any)=>(


<div

key={x.title}

className="border p-6 bg-gray-50"

>

<h3 className="text-xl font-bold text-[#003B6F]">

{x.title}

</h3>


<p className="mt-3 text-gray-600">

{x.text}

</p>


</div>


))}


</div>


</section>








<section className="mt-16">


<h2 className="text-4xl font-black text-[#003B6F]">

Career Opportunities

</h2>



<div className="flex flex-wrap gap-3 mt-6">


{config.roles.map((r:string)=>(


<span

key={r}

className="bg-[#003B6F] text-white px-5 py-3 font-bold"

>

{r}

</span>


))}


</div>


</section>








<section className="mt-16 bg-[#003B6F] text-white p-10">


<h2 className="text-4xl font-black">

Join {config.name}

</h2>



<p className="mt-4 text-gray-200">

Begin your career with the Department of Homeland Security.

</p>




{

config.discord ?

<Link

href={config.discordLink}

className="inline-block mt-8 bg-[#F2C94C] text-black px-8 py-4 font-black"

>

Join Recruitment Discord →

</Link>


:

<Link

href={`/recruitment/apply?division=${config.divisionId}`}

className="inline-block mt-8 bg-[#F2C94C] text-black px-8 py-4 font-black"

>

Start Application →

</Link>


}



</section>



</div>



</div>


</section>


</main>

);


}
