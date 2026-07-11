import Image from "next/image";
import { supabaseAdmin } from "../../app/lib/supabase-admin";



const executivePositions = [

{
title:"Secretary of Homeland Security",

description:
"Leads the Department of Homeland Security and oversees all departmental operations, strategic priorities, and national security initiatives.",

focus:
"Department Leadership"

},


{
title:"Deputy Secretary of Homeland Security",

description:
"Supports the Secretary in managing DHS operations and ensures coordination between divisions, leadership teams, and operational personnel.",

focus:
"Executive Operations"

},


{
title:"Chief of Staff",

description:
"Coordinates executive priorities, manages leadership communication, and supports the effective operation of the Department.",

focus:
"Leadership Coordination"

}

];







const divisionCommandPositions = [

{
title:"Special Response Team Commander",
division:"Special Response Team"
},


{
title:"Secret Service Director",
division:"United States Secret Service"
},


{
title:"CBP Commissioner",
division:"United States Customs and Border Protection"
},


{
title:"Under Secretary for Aviation Operations",
division:"Law Enforcement Helicopter Taskforce"
},


{
title:"Under Secretary for Public Affairs",
division:"Public Affairs"
}

];









async function getAvatar(userId:number){


try{


const response = await fetch(

`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=true`,

{
cache:"no-store"
}

);



const json = await response.json();



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









async function getEmployeeByPosition(title:string){


const {

data:position

}=await supabaseAdmin

.from("positions")

.select("id,title")

.eq(
"title",
title
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
"position_id",
position.id
)

.eq(
"status",
"Active"
)

.single();



if(!employee)
return null;



return {

...employee,

position:title,

avatar:
await getAvatar(employee.roblox_user_id)

};


}









async function getLeadership(){


const executive:any[] = [];




for(const role of executivePositions){


const employee =
await getEmployeeByPosition(role.title);



if(employee){


executive.push({

...employee,

description:role.description,

focus:role.focus

});


}


}







const commanders:any[] = [];




for(const role of divisionCommandPositions){


const employee =
await getEmployeeByPosition(role.title);



if(employee){


commanders.push({

...employee,

division:role.division

});


}


}





return {

executive,

commanders

};


}









export default async function Leadership(){



const {

executive,

commanders

}

=
await getLeadership();







return (

<section

className="
py-24
bg-gray-50
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
mb-16
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

Department Leadership

</p>





<h1

className="
mt-4
text-5xl
font-black
text-[#003B6F]
"

>

Leading The Department

</h1>




<p

className="
mt-5
max-w-3xl
mx-auto
text-lg
text-gray-600
"

>

The Department of Homeland Security is led by experienced officials responsible for strategic direction, operational coordination, and division excellence.

</p>



</div>









<section>


<h2

className="
text-4xl
font-black
text-[#003B6F]
mb-8
"

>

Executive Leadership

</h2>





<div

className="
grid
md:grid-cols-3
gap-8
"

>



{

executive.map((person:any)=>(


<div

key={person.position}

className="
bg-white
shadow-xl
border
border-gray-200
p-8
"

>


<div

className="
relative
mx-auto
w-36
h-36
rounded-full
overflow-hidden
border-4
border-[#003B6F]
"

>


<Image

src={person.avatar}

alt={person.roblox_username}

fill

className="
object-cover
"

/>


</div>






<div

className="
text-center
mt-6
"

>


<h3

className="
text-3xl
font-black
text-[#003B6F]
"

>

{person.roblox_username}

</h3>




<p

className="
mt-2
font-bold
text-xl
"

>

{person.position}

</p>




<p

className="
mt-5
text-gray-600
leading-relaxed
"

>

{person.description}

</p>






<div

className="
mt-6
bg-gray-100
p-4
"

>


<p

className="
text-sm
uppercase
font-black
tracking-widest
text-[#003B6F]
"

>

Primary Responsibility

</p>



<p

className="
mt-2
text-gray-700
"

>

{person.focus}

</p>


</div>



</div>



</div>


))


}


</div>


</section>









{

commanders.length > 0 && (


<section

className="
mt-20
border-t
pt-16
"

>



<h2

className="
text-4xl
font-black
text-[#003B6F]
"

>

Division Command

</h2>



<p

className="
mt-4
text-gray-600
max-w-3xl
"

>

Commanders responsible for leading DHS operational divisions and maintaining excellence across specialised missions.

</p>







<div

className="
grid
md:grid-cols-3
gap-8
mt-10
"

>



{

commanders.map((person:any)=>(


<div

key={person.position}

className="
bg-white
shadow-lg
border
border-gray-200
p-6
text-center
"

>


<div

className="
relative
mx-auto
w-28
h-28
rounded-full
overflow-hidden
border-4
border-[#F2C94C]
"

>


<Image

src={person.avatar}

alt={person.roblox_username}

fill

className="
object-cover
"

/>


</div>






<h3

className="
mt-5
text-2xl
font-black
text-[#003B6F]
"

>

{person.roblox_username}

</h3>




<p

className="
font-bold
mt-2
"

>

{person.position}

</p>




<p

className="
uppercase
tracking-widest
text-sm
text-gray-500
mt-3
"

>

{person.division}

</p>



</div>


))


}


</div>




</section>


)


}




</div>


</section>


);


}
