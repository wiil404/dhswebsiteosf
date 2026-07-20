"use client";


import {
useState
} from "react";

import {
useRouter
} from "next/navigation";



export default function ClearanceCreateForm(){


const router = useRouter();



const [loading,setLoading] =
useState(false);



const [mode,setMode] =
useState<
"individual"|"organisation"
>("individual");



const [form,setForm] =
useState<any>({

subject_name:"",

organisation:"",

subject_type:"Civilian",

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


if(!form.roblox_username)
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

username:
form.roblox_username

})

}

);



const data =
await response.json();



if(data.success){


setForm({

...form,

subject_name:
data.username,

roblox_user_id:
data.id

});


}

else{


alert(
"Roblox user not found"
);


}


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









function toggleArea(
area:string
){


let areas =
[
...form.blacklist_areas
];



if(areas.includes(area)){


areas =
areas.filter(
(x)=>x!==area
);


}

else{


areas.push(area);


}


update(
"blacklist_areas",
areas
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

mode

})

}

);



const data =
await response.json();



if(!response.ok){


alert(
data.error ||
"Failed creating clearance"
);


setLoading(false);

return;


}



router.push(
"/staff/clearance"
);



}










return (

<div className="
mt-10
space-y-8
">







<div>


<label className="
font-bold
">

Clearance Type

</label>



<select

className="
border
p-3
w-full
mt-2
"

value={mode}

onChange={
e=>
setMode(
e.target.value as any
)
}

>

<option value="individual">
Individual
</option>


<option value="organisation">
Organisation / Agency
</option>


</select>


</div>









{

mode==="individual" && (


<div className="
space-y-4
">


<input

className="
border
p-3
w-full
"

placeholder="Roblox Username"

value={
form.roblox_username
}

onChange={
e=>
update(
"roblox_username",
e.target.value
)
}


/>



<button

type="button"

onClick={lookupRoblox}

className="
bg-gray-200
px-5
py-3
font-bold
"

>

Lookup Roblox Account

</button>





<input

className="
border
p-3
w-full
bg-gray-100
"

placeholder="Roblox User ID"

value={
form.roblox_user_id
}

readOnly

/>




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
"

placeholder="Organisation (FBI, USMS, etc.)"

value={
form.organisation
}

onChange={
e=>
update(
"organisation",
e.target.value
)
}


/>


)

}










<div>


<label className="font-bold">

Subject Type

</label>



<select

className="
border
p-3
w-full
mt-2
"

value={
form.subject_type
}

onChange={
e=>
update(
"subject_type",
e.target.value
)
}

>


<option>
Civilian
</option>


<option>
DHS Employee
</option>


<option>
Federal Agency
</option>


<option>
Government Official
</option>


</select>


</div>









<div>


<label className="font-bold">

Clearance Level

</label>


<select

className="
border
p-3
w-full
mt-2
"

value={
form.clearance_level
}

onChange={
e=>
update(
"clearance_level",
Number(e.target.value)
)
}

>


<option value="1">
Level 1 - Full Clearance
</option>


<option value="2">
Level 2
</option>


<option value="3">
Level 3
</option>


<option value="4">
Level 4 - Invitation Only
</option>


</select>


</div>









<h2 className="
text-2xl
font-bold
text-[#003B6F]
">

Area Access

</h2>






{

[

["white_house","White House"],

["capitol","Capitol"],

["dhs","DHS Restricted Areas"],

["airport","Airport Restricted Areas"]

].map(([key,name])=>(


<div

key={key}

className="
border
p-4
"

>


<label className="font-bold">

{name}

</label>


<select

className="
border
p-2
w-full
mt-2
"

value={
form[key]
}

onChange={
e=>
update(
key,
Number(e.target.value)
)
}

>


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









<div className="
border
p-5
">


<label className="
flex
gap-3
font-bold
">


<input

type="checkbox"

checked={
form.blacklisted
}

onChange={
e=>
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

<>


<input

className="
border
p-3
w-full
mt-4
"

placeholder="Blacklist Reason"

value={
form.blacklist_reason
}

onChange={
e=>
update(
"blacklist_reason",
e.target.value
)
}


/>



<p className="font-bold mt-5">

Blacklist Areas

</p>


{

["White House","Capitol","DHS","Airport"].map(area=>(


<label

key={area}

className="
block
mt-2
"

>


<input

type="checkbox"

checked={
form.blacklist_areas.includes(area)
}

onChange={
()=>toggleArea(area)
}


/>

{" "}

{area}


</label>


))


}


</>


)


}


</div>








<button

onClick={submit}

disabled={loading}

className="
bg-[#003B6F]
text-white
px-8
py-4
font-bold
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

);


}
