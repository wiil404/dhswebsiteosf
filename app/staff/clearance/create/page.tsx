"use client";


import {useState} from "react";

import {useRouter} from "next/navigation";





export default function CreateClearance(){


const router = useRouter();



const [loading,setLoading] = useState(false);

const [lookupLoading,setLookupLoading] = useState(false);



const [mode,setMode] = useState<
"individual" | "organisation"
>("individual");





const [form,setForm] = useState<any>({

organisation:"",

subject_type:"individual",


roblox_username:"",

roblox_user_id:"",



clearances:{


white_house:"",

capitol:"",

dhs:"",

airport:""


},



blacklisted:false,

blacklist_areas:[],

blacklist_reason:""


});









function update(

field:string,

value:any

){


setForm({

...form,

[field]:value

});


}









async function lookupRoblox(){


if(!form.roblox_username){

alert(
"Enter a Roblox username first"
);

return;

}



setLookupLoading(true);




try{


const response = await fetch(

`/api/roblox/lookup?username=${form.roblox_username}`

);





const data =
await response.json();






if(!response.ok){


alert(
data.error ||
"Roblox user not found"
);


return;


}






setForm({

...form,

roblox_user_id:data.id

});





}

catch(error){


console.error(error);


alert(
"Roblox lookup failed"
);


}

finally{


setLookupLoading(false);


}


}









function updateClearance(

area:string,

value:string

){


setForm({

...form,

clearances:{


...form.clearances,


[area]:value


}


});


}









function toggleBlacklistArea(

area:string

){


let areas = [
...form.blacklist_areas
];



if(
areas.includes(area)
){


areas =
areas.filter(
(x)=>x!==area
);


}

else{


areas.push(area);


}





setForm({

...form,

blacklist_areas:areas

});


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

mode,

organisation:
form.organisation,

subject_type:
mode,


roblox_username:
form.roblox_username,


roblox_user_id:
form.roblox_user_id,



clearances:
form.clearances,


blacklisted:
form.blacklisted,


blacklist_areas:
form.blacklist_areas,


blacklist_reason:
form.blacklist_reason


})

}

);





const result =
await response.json();





if(!response.ok){


alert(
result.error ||
"Failed creating clearance"
);


setLoading(false);

return;


}






router.push(
`/staff/clearance/${result.subject_id}`
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
border
shadow-xl
p-10
">





<h1 className="
text-4xl
font-black
text-[#003B6F]
">

Create Security Clearance

</h1>





<p className="
mt-3
text-gray-600
">

Create clearance access for DHS employees, external agencies or authorised civilians.

</p>









<div className="
mt-10
flex
gap-4
">


<button

onClick={()=>{

setMode("individual");

}}

className={

mode==="individual"

?

"bg-[#003B6F] text-white px-6 py-3 font-bold"

:

"border px-6 py-3 font-bold"

}

>

Individual

</button>





<button

onClick={()=>{

setMode("organisation");

}}

className={

mode==="organisation"

?

"bg-[#003B6F] text-white px-6 py-3 font-bold"

:

"border px-6 py-3 font-bold"

}

>

Organisation

</button>



</div>










{

mode==="individual"

&&

<section className="
mt-10
space-y-4
">


<input

className="
border
p-4
w-full
"

placeholder="Roblox Username"

value={
form.roblox_username
}

onChange={e=>

update(
"roblox_username",
e.target.value
)

}

/>





<button

onClick={lookupRoblox}

className="
bg-gray-800
text-white
px-5
py-3
font-bold
"

>

{

lookupLoading
?
"Checking..."
:
"Lookup Roblox ID"

}

</button>





<input

className="
border
p-4
w-full
bg-gray-100
"

readOnly

placeholder="Roblox User ID"

value={
form.roblox_user_id
}

/>



</section>


}










{

mode==="organisation"

&&


<input

className="
mt-10
border
p-4
w-full
"

placeholder="Organisation Name"

value={
form.organisation
}

onChange={e=>

update(
"organisation",
e.target.value
)

}

/>


}









<section className="
mt-12
">


<h2 className="
text-2xl
font-bold
text-[#003B6F]
">

Facility Access

</h2>





{

[

["white_house","White House Grounds"],

["capitol","United States Capitol"],

["dhs","DHS Restricted Areas"],

["airport","Airport Restricted Areas"]

].map(([key,label])=>(


<div

key={key}

className="
border
p-5
mt-4
"

>


<h3 className="
font-bold
">

{label}

</h3>



<select

className="
border
p-3
mt-3
"

value={
form.clearances[key]
}

onChange={e=>

updateClearance(
key,
e.target.value
)

}

>

<option value="">

No Access

</option>


<option value="1">

Level 1

</option>


<option value="2">

Level 2

</option>


<option value="3">

Level 3

</option>


<option value="4">

Level 4

</option>


</select>



</div>


))


}


</section>









<section className="
mt-12
">


<h2 className="
text-2xl
font-bold
text-red-700
">

Blacklist

</h2>






<label className="
flex
gap-3
mt-4
">


<input

type="checkbox"

checked={
form.blacklisted
}

onChange={e=>

update(
"blacklisted",
e.target.checked
)

}

/>


Blacklist Subject

</label>








{

form.blacklisted && (

<div className="
mt-5
space-y-4
">


{

[

["white_house","White House"],

["capitol","Capitol"],

["dhs","DHS"],

["airport","Airport"]

].map(([key,label])=>(


<label

key={key}

className="
flex
gap-3
"

>


<input

type="checkbox"

onChange={()=>toggleBlacklistArea(key)}

/>


{label}


</label>


))


}





<textarea

className="
border
p-4
w-full
"

placeholder="Blacklist Reason"

value={
form.blacklist_reason
}

onChange={e=>

update(
"blacklist_reason",
e.target.value
)

}

/>



</div>

)

}


</section>









<button

onClick={submit}

disabled={loading}

className="
mt-12
bg-[#003B6F]
text-white
px-10
py-4
font-black
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
