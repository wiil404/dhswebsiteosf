"use client";


import {
useState
} from "react";

import {
useRouter
} from "next/navigation";





export default function ClearanceForm({

subject

}:{

subject:any

}){


const router =
useRouter();



const existing =
subject.security_clearances?.[0];




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





const [blacklisted,setBlacklisted] =
useState(
existing?.blacklisted || false
);



const [reason,setReason] =
useState(
existing?.blacklist_reason || ""
);



const [saving,setSaving] =
useState(false);







function toggle(area:string){


setAreas({

...areas,

[area]:
!(areas as any)[area]

});


}








async function save(){


setSaving(true);



const response =
await fetch(

"/api/staff/clearance/update",

{


method:"POST",


headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

subject_id:
subject.id,


clearance_level:
level,


...areas,


blacklisted,


blacklist_reason:
reason


})


}

);





const data =
await response.json();





if(!response.ok){

alert(
data.error ||
"Failed saving"
);

setSaving(false);

return;

}



router.push(
"/staff/clearance"
);


}





return (

<div className="mt-10 space-y-8">





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

value={level}

onChange={
e=>setLevel(
Number(e.target.value)
)
}

>


<option value={1}>

Level 1 - Full Clearance

</option>


<option value={2}>

Level 2 - Limited Guests

</option>


<option value={3}>

Level 3 - Search Required

</option>


<option value={4}>

Level 4 - Invitation Only

</option>


</select>


</div>









<div>


<h2 className="
font-bold
text-xl
">

Authorised Areas

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

onChange={()=>toggle(area)}

/>


<span>

{
area.replace("_"," ")
}

</span>


</label>


)

)


}


</div>









<div className="
border
bg-red-50
p-5
">


<label className="
flex
gap-3
font-bold
">


<input

type="checkbox"

checked={blacklisted}

onChange={
e=>
setBlacklisted(
e.target.checked
)
}

/>


Blacklist Subject


</label>





{

blacklisted && (

<textarea

className="
border
p-3
w-full
mt-4
"

placeholder="Blacklist reason"

value={reason}

onChange={
e=>setReason(
e.target.value
)
}

/>

)

}


</div>








<button

onClick={save}

disabled={saving}

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
"Save Clearance"

}

</button>






</div>

);


}