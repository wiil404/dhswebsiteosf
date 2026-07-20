"use client";


import {
useState
} from "react";

import {
useRouter
} from "next/navigation";



export default function CreateClearanceForm(){


const router =
useRouter();



const [loading,setLoading] =
useState(false);




const [form,setForm] =
useState({

full_name:"",

organisation:"",

subject_type:"Civilian",

roblox_username:"",

roblox_user_id:"",

discord_username:"",

email:"",

notes:"",

clearance_level:4,

white_house:false,

capitol:false,

dhs:false,

airport:false

});






function update(
key:string,
value:any
){


setForm({

...form,

[key]:value

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

"Content-Type":
"application/json"

},


body:JSON.stringify(form)


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






<div className="
grid
md:grid-cols-2
gap-5
">


<input

className="
border
p-4
"

placeholder="Full Name"

value={form.full_name}

onChange={
e=>update(
"full_name",
e.target.value
)
}

/>




<input

className="
border
p-4
"

placeholder="Organisation (FBI, USMS, DHS etc)"

value={form.organisation}

onChange={
e=>update(
"organisation",
e.target.value
)
}

/>





<select

className="
border
p-4
"

value={form.subject_type}

onChange={
e=>update(
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
Law Enforcement
</option>


<option>
Government Official
</option>


<option>
Contractor
</option>


</select>





<input

className="
border
p-4
"

placeholder="Roblox Username"

value={form.roblox_username}

onChange={
e=>update(
"roblox_username",
e.target.value
)
}

/>




<input

className="
border
p-4
"

placeholder="Roblox User ID"

value={form.roblox_user_id}

onChange={
e=>update(
"roblox_user_id",
e.target.value
)
}

/>




<input

className="
border
p-4
"

placeholder="Discord Username"

value={form.discord_username}

onChange={
e=>update(
"discord_username",
e.target.value
)
}

/>




<input

className="
border
p-4
"

placeholder="Email"

value={form.email}

onChange={
e=>update(
"email",
e.target.value
)
}

/>



</div>







<textarea

className="
border
p-4
w-full
"

rows={4}

placeholder="Notes"

value={form.notes}

onChange={
e=>update(
"notes",
e.target.value
)
}

/>









<div>

<h2 className="
text-2xl
font-bold
text-[#003B6F]
">

Clearance Level

</h2>



<select

className="
border
p-4
mt-4
w-full
"

value={form.clearance_level}

onChange={
e=>update(
"clearance_level",
Number(e.target.value)
)
}

>


<option value={1}>
Level 1 - Full Clearance
</option>


<option value={2}>
Level 2
</option>


<option value={3}>
Level 3
</option>


<option value={4}>
Level 4 - Invitation Only
</option>


</select>


</div>








<div>

<h2 className="
text-2xl
font-bold
text-[#003B6F]
">

Access Areas

</h2>



{

[

["white_house","White House"],

["capitol","Capitol"],

["dhs","DHS Restricted Areas"],

["airport","Airport Restricted Areas"]

].map(([key,label])=>(


<label

key={key}

className="
flex
gap-3
mt-4
"

>


<input

type="checkbox"

checked={
(form as any)[key]
}

onChange={
e=>update(
key,
e.target.checked
)
}

/>


{label}


</label>


))


}


</div>







<button

disabled={loading}

onClick={submit}

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