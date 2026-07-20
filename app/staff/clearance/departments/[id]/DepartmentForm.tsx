"use client";


import {
useState
} from "react";

import {
useRouter
} from "next/navigation";



export default function DepartmentForm({

department

}:{

department:any

}){


const router =
useRouter();



const existing =
department.organisation_clearances?.[0];




const [level,setLevel] =
useState(

existing?.clearance_level || 4

);




const [areas,setAreas] =
useState({

white_house:
existing?.white_house || false,


capitol:
existing?.capitol || false,


dhs:
existing?.dhs || false,


airport:
existing?.airport || false

});




const [saving,setSaving] =
useState(false);





function toggle(key:string){

setAreas({

...areas,

[key]:
!(areas as any)[key]

});

}







async function save(){


setSaving(true);



const response =
await fetch(

"/api/staff/clearance/departments/update",

{


method:"POST",


headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

organisation_id:
department.id,

clearance_level:
level,

...areas


})


}

);





const data =
await response.json();





if(!response.ok){

alert(
data.error ||
"Error"
);

setSaving(false);

return;

}





router.push(
"/staff/clearance/departments"
);


}





return (

<div className="
mt-10
space-y-8
">





<div>

<label className="font-bold">

Clearance Level

</label>


<select

className="
border
p-3
w-full
"

value={level}

onChange={
e=>setLevel(
Number(e.target.value)
)
}

>


<option value={1}>
Level 1 - Full Access
</option>


<option value={2}>
Level 2
</option>


<option value={3}>
Level 3
</option>


<option value={4}>
Level 4 - Invitation
</option>


</select>

</div>









<div>


<h2 className="font-bold text-xl">

Areas

</h2>




{

Object.keys(areas).map(

(area)=>(


<label

key={area}

className="
flex
gap-3
mt-3
"

>


<input

type="checkbox"

checked={
(areas as any)[area]
}

onChange={()=>
toggle(area)
}

/>


{area.replace("_"," ")}


</label>


)

)


}


</div>






<button

onClick={save}

className="
bg-[#003B6F]
text-white
px-8
py-3
font-bold
"

>

{

saving
?
"Saving..."
:
"Save Department Clearance"

}

</button>



</div>

);


}