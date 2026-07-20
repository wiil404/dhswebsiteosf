"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";



const clearanceLevels = [

{
level:1,
title:"Full Clearance",
description:
"Multiple Guests. No Search Required."
},

{
level:2,
title:"Restricted Clearance",
description:
"1 Guest. No Search. Lanyard Required. PEOC lockdown access if authorised."
},

{
level:3,
title:"Controlled Clearance",
description:
"No Guests. Search Required. Lanyard Required."
},

{
level:4,
title:"Invitation Only",
description:
"Access upon invitation. No Guests. Search & Lanyard Required."
}

];





const areas = [

{
key:"white_house",
name:"White House Ground Access"
},

{
key:"capitol",
name:"Capitol Area"
},

{
key:"dhs",
name:"DHS Restricted Areas"
},

{
key:"airport",
name:"Airport Restricted Areas"
}

];





export default function CreateClearance(){


const router =
useRouter();



const [loading,setLoading] =
useState(false);



const [mode,setMode] =
useState<
"individual" |
"organisation"
>(
"individual"
);



const [robloxUsername,setRobloxUsername] =
useState("");



const [form,setForm] =
useState<any>({

subject_name:"",

organisation:"",

subject_type:"individual",

roblox_username:"",

roblox_user_id:"",


clearance_level:4,


white_house:4,

capitol:4,

dhs:4,

airport:4,


blacklisted:false,

blacklist_reason:"",

blacklist_areas:[]

});







async function lookupRoblox(){


if(!robloxUsername)
return;



const response =
await fetch(

"/api/roblox/lookup",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

username:robloxUsername

})

}

);



const data =
await response.json();




if(!response.ok){


alert(data.error);

return;

}





setForm({

...form,

roblox_username:data.username,

roblox_user_id:data.id,

subject_name:data.username

});


}









function update(
key:string,
value:any
){


setForm({

...form,

[key]:value

});


}








function toggleBlacklistArea(
area:string
){


let current =
form.blacklist_areas || [];



if(current.includes(area)){


current =
current.filter(
(x:string)=>x!==area
);


}

else{


current.push(area);


}




update(
"blacklist_areas",
current
);


}









async function submit(){


setLoading(true);



const response =
await fetch(

"/api/staff/clearance/create",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

...form,

mode,

subject_type:mode

})

}

);



const data =
await response.json();



if(!response.ok){


alert(data.error);

setLoading(false);

return;

}




router.push(
"/staff/clearance"
);


}








return (

<main className="
max-w-5xl
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


<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Create Security Clearance

</h1>


<p className="
mt-3
text-gray-600
">

Assign clearance permissions for DHS protected areas.

</p>







<div className="
mt-8
flex
gap-4
">


<button

onClick={()=>{

setMode("individual");

update(
"subject_type",
"individual"
);

}}

className={`
px-5 py-3 font-bold
${
mode==="individual"
?
"bg-[#003B6F] text-white"
:
"bg-gray-200"
}
`}

>

Individual

</button>



<button

onClick={()=>{

setMode("organisation");

update(
"subject_type",
"organisation"
);

}}

className={`
px-5 py-3 font-bold
${
mode==="organisation"
?
"bg-[#003B6F] text-white"
:
"bg-gray-200"
}
`}

>

Organisation

</button>


</div>









{
mode==="individual" && (

<div className="mt-8">


<label className="font-bold">

Roblox Username

</label>


<div className="
flex
gap-3
mt-2
">


<input

className="
border
p-3
flex-1
"

value={robloxUsername}

onChange={
e=>setRobloxUsername(
e.target.value
)
}

/>


<button

onClick={lookupRoblox}

className="
bg-[#003B6F]
text-white
px-5
font-bold
"

>

Lookup

</button>


</div>





{

form.roblox_user_id && (

<p className="
mt-3
text-green-600
font-bold
">

Verified Roblox ID:
{form.roblox_user_id}

</p>

)

}


</div>

)

}








{
mode==="organisation" && (

<input

className="
border
p-3
w-full
mt-8
"

placeholder="
Organisation Name
"

value={form.organisation}

onChange={
e=>update(
"organisation",
e.target.value
)
}

/>

)

}









<section className="mt-12">


<h2 className="
text-2xl
font-bold
text-[#003B6F]
">

Area Clearance

</h2>



<div className="
grid
md:grid-cols-2
gap-5
mt-6
">


{

areas.map(area=>(


<div

key={area.key}

className="
border
p-5
"

>


<h3 className="font-bold">

{area.name}

</h3>



<select

className="
border
p-3
w-full
mt-3
"

value={
form[area.key]
}

onChange={
e=>update(
area.key,
Number(e.target.value)
)
}

>


{

clearanceLevels.map(level=>(

<option

key={level.level}

value={level.level}

>

Level {level.level}

</option>

))

}


</select>


</div>


))

}


</div>


</section>









<section className="mt-12">


<h2 className="
text-2xl
font-bold
text-[#003B6F]
">

Blacklist

</h2>



<label className="
flex
gap-3
mt-5
font-bold
">


<input

type="checkbox"

checked={
form.blacklisted
}

onChange={
e=>update(
"blacklisted",
e.target.checked
)
}

/>


Blacklist Subject

</label>







{

form.blacklisted && (

<div className="mt-5">


<input

className="
border
p-3
w-full
"

placeholder="
Reason
"

value={
form.blacklist_reason
}

onChange={
e=>update(
"blacklist_reason",
e.target.value
)
}

/>



<h3 className="
font-bold
mt-6
">

Blacklist Areas

</h3>



{

areas.map(area=>(


<label

key={area.key}

className="
block
mt-3
"

>


<input

type="checkbox"

checked={
form.blacklist_areas.includes(
area.key
)
}

onChange={()=>toggleBlacklistArea(
area.key
)}

/>


{" "}

{area.name}


</label>


))


}


</div>

)

}



</section>








<button

disabled={loading}

onClick={submit}

className="
mt-12
bg-[#003B6F]
text-white
px-10
py-4
font-bold
disabled:opacity-50
"

>

{

loading
?
"Creating..."
:
"Create Clearance"

}

</button>





</div>


</main>

);


}
