import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase-admin";



const executiveRoles = [

"Secretary of Homeland Security",

"Deputy Secretary of Homeland Security",

"Chief of Staff",

"Special Response Team Commander",

"Secret Service Director",

"CBP Commissioner",

"Under Secretary for Aviation Operations",

"Under Secretary for Public Affairs"

];





const divisionRoles = [

{
division:"Special Response Team",
positions:[

"Special Agent in Charge (SRT)",

"Assistant Special Agent in Charge (SRT)"

]
},


{
division:"United States Secret Service",
positions:[

"Deputy Director",

"Assistant Director",

"Special Agent in Charge (SS)"

]
},


{
division:"United States Customs and Border Protection",
positions:[

"CBP Deputy Commissioner",

"Supervisory Customs Agent"

]
},


{
division:"Law Enforcement Helicopter Taskforce",
positions:[

"Senior Flight Officer",

"Flight Officer"

]
},


{
division:"Public Affairs",
positions:[

"Public Affairs Staff"

]
}

];










async function getAvatar(id:number){


try{


const response = await fetch(

`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=420x420&format=Png&isCircular=true`

);



const data =
await response.json();



return (

data.data?.[0]?.imageUrl

||
"/leadership/default.png"

);


}

catch{

return "/leadership/default.png";

}


}









async function getEmployeeByPosition(position:string){


const {

data:role

}=await supabaseAdmin

.from("positions")

.select("id")

.eq(
"title",
position
)

.single();




if(!role)
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
role.id
)

.eq(
"status",
"Active"
)

.single();




if(
!employee ||
!employee.roblox_username ||
!employee.roblox_user_id
)

return null;



return {

...employee,

position

};


}









async function getLeadership(){


const executive:any[] = [];




for(
const role of executiveRoles
){


const employee =
await getEmployeeByPosition(role);



if(employee){

executive.push(employee);

}


}




const divisions:any[] = [];




for(
const division of divisionRoles
){


for(
const position of division.positions
){


const employee =
await getEmployeeByPosition(position);



if(employee){


divisions.push({

...employee,

division:division.division


});


}


}


}




return {

executive,

divisions

};


}









export default async function Leadership(){



const {

executive,

divisions

}=await getLeadership();







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







{/* EXECUTIVE */}


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

EXECUTIVE LEADERSHIP

</p>





<h2

className="
mt-4
text-5xl
font-black
text-[#003B6F]
"

>

The People Leading DHS

</h2>




<p

className="
mt-5
max-w-3xl
mx-auto
text-gray-600
"

>

The Department is led by senior officials responsible for
directing operations, managing divisions, and advancing
the DHS mission.

</p>


</div>







<div

className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-8
mt-16
"

>


{

executive.map(async(person:any)=>(


<LeaderCard

key={person.position}

person={person}

/>


))


}


</div>









{/* DIVISION LEADERSHIP */}



{

divisions.length > 0 &&


<section

className="
mt-24
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

DIVISION LEADERSHIP

</p>




<h2

className="
mt-4
text-4xl
font-black
text-[#003B6F]
"

>

Command Staff

</h2>




</div>








<div

className="
grid
md:grid-cols-3
lg:grid-cols-5
gap-6
mt-12
"

>


{

divisions.map(async(person:any)=>(


<LeaderCard

key={person.position}

person={person}

small

/>


))


}


</div>


</section>


}




</div>


</section>


);


}










async function LeaderCard({

person,

small=false

}:{

person:any,

small?:boolean

}){


const avatar =
await getAvatar(
person.roblox_user_id
);




return (

<div

className={

`
bg-white
shadow-xl
border
text-center
${

small

?

"p-4"

:

"p-6"

}

`

}

>


<div

className={

`
relative
mx-auto
rounded-full
overflow-hidden
border-4
border-[#003B6F]

${

small

?

"w-20 h-20"

:

"w-36 h-36"

}

`

}

>


<Image

src={avatar}

fill

alt={person.position}

className="
object-cover
"

/>


</div>





<h3

className={

`
font-black
text-[#003B6F]

${

small

?

"text-lg mt-4"

:

"text-xl mt-6"

}

`

}

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





{

small &&

<p

className="
text-sm
text-gray-500
mt-2
"

>

{person.division}

</p>

}





</div>


);


}
