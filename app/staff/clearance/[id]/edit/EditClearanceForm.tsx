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




const existing:any = {};



subject.security_clearances?.forEach(

(c:any)=>{


existing[c.area_id] = {

id:c.id,

level:c.clearance_level,

blacklisted:c.blacklisted,

reason:c.blacklist_reason

};


}

);







const [form,setForm] =
useState(existing);




const [loading,setLoading] =
useState(false);









function updateLevel(

area:string,

level:string

){


setForm({

...form,

[area]:{

...form[area],

level

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
data.error ||
"Update failed"
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
space-y-6
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
font-bold
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

updateLevel(
area.id,
e.target.value
)

}

>


<option value="">

No Access

</option>


<option value="1">

Clearance Level 1

</option>


<option value="2">

Clearance Level 2

</option>


<option value="3">

Clearance Level 3

</option>


<option value="4">

Clearance Level 4

</option>


</select>




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
px-8
py-4
font-bold
"

>


{

loading
?
"Saving..."
:
"Save Changes"

}


</button>




</div>

);


}