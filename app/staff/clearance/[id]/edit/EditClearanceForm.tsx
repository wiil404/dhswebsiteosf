"use client";


import {useState} from "react";

import {useRouter} from "next/navigation";





export default function EditClearanceForm({

subject,

areas

}:{

subject:any;

areas:any[];

}){


const router =
useRouter();





const initial:any = {};




subject.security_clearances?.forEach(

(c:any)=>{


initial[c.area_id] = {

id:c.id,

level:String(c.clearance_level),


peoc_access:c.peoc_access ?? false,

white_house_lanyard:c.white_house_lanyard ?? false,

lanyard_required:c.lanyard_required ?? false,


blacklisted:c.blacklisted ?? false,

blacklist_reason:c.blacklist_reason || "",


expires_at:c.expires_at || "",


notes:c.notes || "",


override_department:c.override_department ?? false

};


}

);







const [form,setForm] =
useState(initial);



const [loading,setLoading] =
useState(false);









function update(

area:string,

field:string,

value:any

){


setForm({

...form,

[area]:{

...form[area],

[field]:value

}

});


}









async function save(){


setLoading(true);



const response =
await fetch(

`/api/staff/clearance/${subject.id}/update`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

clearances:form

})

}

);






const data =
await response.json();






if(!response.ok){


alert(
data.error
);


setLoading(false);

return;


}





router.push(

`/staff/clearance/${subject.id}`

);


router.refresh();



}









return (

<div className="
mt-10
space-y-8
">








{

areas.map(

(area:any)=>(



<div

key={area.id}

className="
border
p-6
"

>



<h2 className="
text-xl
font-black
text-[#003B6F]
">

{area.name}

</h2>







<select

className="
border
p-3
mt-4
"

value={

form[area.id]?.level || ""

}

onChange={e=>

update(

area.id,

"level",

e.target.value

)

}

>


<option value="">

No Access

</option>


<option value="1">

Level 1 - Full Clearance

</option>


<option value="2">

Level 2 - Limited Access

</option>


<option value="3">

Level 3 - Restricted

</option>


<option value="4">

Level 4 - Invitation Only

</option>


</select>









{

area.name === "White House Grounds" && (

<div className="
grid
md:grid-cols-2
gap-4
mt-6
">





<label>

PEOC Access

<input

type="checkbox"

className="ml-3"

checked={
form[area.id]?.peoc_access ?? false
}

onChange={e=>

update(

area.id,

"peoc_access",

e.target.checked

)

}

/>

</label>






<label>

White House Lanyard

<input

type="checkbox"

className="ml-3"

checked={
form[area.id]?.white_house_lanyard ?? false
}

onChange={e=>

update(

area.id,

"white_house_lanyard",

e.target.checked

)

}

/>

</label>








<label>

Lanyard Required

<input

type="checkbox"

className="ml-3"

checked={
form[area.id]?.lanyard_required ?? false
}

onChange={e=>

update(

area.id,

"lanyard_required",

e.target.checked

)

}

/>

</label>


</div>

)

}









<label className="
block
mt-6
font-bold
">

Blacklist Area

<input

type="checkbox"

className="ml-3"

checked={
form[area.id]?.blacklisted ?? false
}

onChange={e=>

update(

area.id,

"blacklisted",

e.target.checked

)

}

/>

</label>









{

form[area.id]?.blacklisted &&

<textarea

className="
border
border-red-400
p-3
w-full
mt-5
"

placeholder="Blacklist reason"

value={

form[area.id]?.blacklist_reason || ""

}

onChange={e=>

update(

area.id,

"blacklist_reason",

e.target.value

)

}

/>


}





<input

className="
border
p-3
w-full
mt-5
"

type="date"

value={

form[area.id]?.expires_at || ""

}

onChange={e=>

update(

area.id,

"expires_at",

e.target.value

)

}

/>









<textarea

className="
border
p-3
w-full
mt-5
"

placeholder="Notes"

value={

form[area.id]?.notes || ""

}

onChange={e=>

update(

area.id,

"notes",

e.target.value

)

}

/>








</div>



)

)

}









<button

onClick={save}

disabled={loading}

className="
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

"Saving..."

:

"Save Clearance Changes"

}


</button>





</div>


);


}
