import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabase-admin";



const divisions:any = {


"special-response-team": {

divisionId:
"4161d355-cdf6-4351-8c55-2f9fbc29cbca",

name:
"Special Response Team",

short:
"SRT",

commander:
"Special Response Team Commander",

description:
"The Special Response Team is the Department of Homeland Security's premier tactical response division. Personnel are trained to respond to high-risk incidents, critical threats, and specialised operational missions requiring advanced capabilities.",


mission:[

{
title:"Rapid Response",
text:"Deploying highly trained operators to incidents requiring immediate tactical intervention."
},

{
title:"Specialised Operations",
text:"Conducting advanced security operations and supporting DHS missions nationwide."
},

{
title:"Operational Excellence",
text:"Maintaining the highest standards of discipline, teamwork, and readiness."
}

],


discord:true,


discordLink:
"https://discord.gg/YOURDISCORD"

},






"secret-service": {


divisionId:
"039748c5-271e-4b15-8192-938daaa28272",


name:
"United States Secret Service",


short:
"USSS",


commander:
"Secret Service Director",


description:
"The United States Secret Service protects national leadership, supports DHS protective operations, and provides highly trained personnel dedicated to safeguarding critical individuals and locations.",


mission:[

{
title:"Protective Operations",
text:"Providing security services for protected individuals and national leadership."
},

{
title:"Threat Prevention",
text:"Identifying and mitigating threats through planning and intelligence."
},

{
title:"Operational Support",
text:"Supporting DHS operations through elite protective capabilities."
}

]

},






"helicopter-taskforce": {


divisionId:
"49cf99c6-3dec-4105-b678-2795718cad79",


name:
"Law Enforcement Helicopter Taskforce",


short:
"LEHT",


commander:
"Under Secretary for Aviation Operations",


description:
"The Law Enforcement Helicopter Taskforce provides aviation support to DHS operations through highly skilled pilots, flight officers, and aerial response personnel.",


mission:[

{
title:"Aerial Response",
text:"Providing rapid aviation support during critical incidents."
},

{
title:"Operational Aviation",
text:"Supporting law enforcement missions through helicopter operations."
},

{
title:"Flight Excellence",
text:"Maintaining professional aviation standards across DHS."
}

]

},






"cbp": {


divisionId:
"a5540d05-f9cc-4082-8228-2289b02e241f",


name:
"United States Customs and Border Protection",


short:
"CBP",


commander:
"CBP Commissioner",


description:
"United States Customs and Border Protection secures national borders, protects communities, and supports homeland security through dedicated enforcement personnel.",


mission:[

{
title:"Border Security",
text:"Protecting national borders through enforcement and operational readiness."
},

{
title:"Customs Enforcement",
text:"Preventing illegal activity while supporting lawful travel and trade."
},

{
title:"Community Protection",
text:"Working to keep communities safe through professional service."
}

]

},






"public-affairs": {


divisionId:
"3c17bd3b-1992-4571-85bc-5cbb45939eed",


name:
"Public Affairs",


short:
"PAO",


commander:
"Under Secretary for Public Affairs",


description:
"Public Affairs manages DHS communications, public information, and transparency initiatives while ensuring communities remain informed about Department operations.",


mission:[

{
title:"Public Communication",
text:"Delivering accurate information regarding DHS activities."
},

{
title:"Media Relations",
text:"Managing communication between DHS and external organisations."
},

{
title:"Transparency",
text:"Supporting openness and public confidence."
}

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

roblox_user_id,

positions(
title
)

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




if(!config){

notFound();

}






const commander =
await getCommander(config);







return (

<main

className="
relative
py-16
"

>


<div

className="
absolute
inset-0
-z-10
bg-[#003B6F]
"

/>






<section

className="
max-w-6xl
mx-auto
px-6
"

>


<div

className="
bg-white
shadow-2xl
border
border-gray-200
overflow-hidden
"

>


<div

className="
h-3
bg-[#F2C94C]
"

/>







<div

className="
p-8
md:p-14
"

>








<p

className="
uppercase
tracking-[0.3em]
font-bold
text-sm
text-[#003B6F]
"

>

Department of Homeland Security

</p>







<h1

className="
mt-4
text-5xl
font-black
text-[#003B6F]
"

>

{config.name}

</h1>





<p

className="
mt-4
text-xl
text-gray-600
"

>

{config.description}

</p>









{/* COMMANDER */}



<section

className="
mt-12
border-t
pt-10
"

>


<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Division Leadership

</h2>







<div

className="
mt-6
flex
items-center
gap-8
bg-gray-50
p-8
border
"

>


<div

className="
relative
w-36
h-36
rounded-full
overflow-hidden
border-4
border-[#003B6F]
"

>


<Image

src={

commander?.roblox_user_id

?

`https://www.roblox.com/headshot-thumbnail/image?userId=${commander.roblox_user_id}&width=420&height=420&format=png`

:

"/leadership/default.png"

}

alt="Commander"

fill

className="
object-cover
"

/>


</div>








<div>


<h3

className="
text-4xl
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





<p

className="
mt-2
text-xl
font-bold
"

>

{
config.commander
}

</p>



<p

className="
mt-3
text-gray-600
"

>

Division Commander

</p>


</div>


</div>


</section>









{/* MISSION */}


<section

className="
mt-14
"

>


<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Our Mission

</h2>




<div

className="
grid
md:grid-cols-3
gap-6
mt-6
"

>

{

config.mission.map(
(item:any)=>(


<div

key={item.title}

className="
border
p-6
bg-gray-50
"

>


<h3

className="
font-bold
text-xl
text-[#003B6F]
"

>

{item.title}

</h3>


<p

className="
mt-3
text-gray-600
"

>

{item.text}

</p>


</div>


)

)


}


</div>


</section>









{/* RECRUITMENT */}


<section

className="
mt-14
bg-[#003B6F]
text-white
p-10
"

>


<h2

className="
text-3xl
font-black
"

>

Join {config.name}

</h2>




<p

className="
mt-4
text-gray-200
"

>

Become part of DHS and serve alongside dedicated personnel committed to protecting the nation.

</p>






{

config.discord ?


<Link

href={config.discordLink}

className="
inline-flex
mt-8
bg-[#F2C94C]
text-black
px-8
py-4
font-black
"

>

Join Recruitment Discord →

</Link>


:


<Link

href={`/recruitment/apply?division=${config.divisionId}`}

className="
inline-flex
mt-8
bg-[#F2C94C]
text-black
px-8
py-4
font-black
"

>

Begin Application →

</Link>


}



</section>









</div>

</div>


</section>


</main>


);


}
