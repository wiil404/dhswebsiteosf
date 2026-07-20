"use client";


import {
useState
} from "react";

import {
useRouter
} from "next/navigation";



export default function EditClearanceForm({

clearance

}:{

clearance:any

}){


const router =
useRouter();





const [loading,setLoading]=
useState(false);





const [form,setForm]=useState({

white_house:
clearance.white_house || 4,

capitol:
clearance.capitol || 4,

dhs:
clearance.dhs || 4,

airport:
clearance.airport || 4,


blacklisted:
clearance.blacklisted || false,


blacklist_areas:
clearance.blacklist_areas || [],


blacklist_reason:
clearance.blacklist_reason || "",


notes:
clearance.notes || ""

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








function toggleArea(area:string){


if(
form.blacklist_areas.includes(area)
){


setForm({

...form,

blacklist_areas:
form.blacklist_areas.filter(
(a:string)=>a!==area
)

});


}

else{


setForm({

...form,

blacklist_areas:[
...form.blacklist_areas,
area
]

});


}


}








async function save(){


setLoading(true);



const response =
await fetch(

`/api/staff/clearance/${clearance.id}`,

{

method:"PATCH",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(form)

}

);





if(response.ok){

router.push("/staff/clearance");

router.refresh();

}

else{

alert(
"Failed saving clearance"
);

}



setLoading(false);


}









return (

<div className="
mt-10
space-y-8
">






<Section title="Clearance Levels">


{

(
[
    ["white_house","White House"],
    ["capitol","Capitol"],
    ["dhs","DHS Restricted Areas"],
    ["airport","Airport Restricted Areas"]
] as const
).map(([key,label])=>(


<div

key={key}

className="
mb-5
"

>


<label className="
font-bold
block
mb-2
">

{label}

</label>



<select

className="
border
p-3
w-full
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

<option value={1}>
Level 1 - Full Clearance
</option>

<option value={2}>
Level 2 - Restricted
</option>

<option value={3}>
Level 3 - Controlled
</option>

<option value={4}>
Level 4 - Invitation Only
</option>


</select>


</div>


))


}


</Section>









<Section title="Blacklist">


<label className="
flex
gap-3
items-center
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


Blacklist Individual


</label>







{

form.blacklisted && (

<div className="mt-5 space-y-5">


<div>


<p className="font-bold mb-2">

Blacklist Areas

</p>


{

[

"White House",

"Capitol",

"DHS",

"Airport"

].map(area=>(


<label

key={area}

className="
block
"

>


<input

type="checkbox"

checked={
form.blacklist_areas.includes(area)
}

onChange={()=>
toggleArea(area)
}

/>

{" "}

{area}


</label>


))


}


</div>







<textarea

className="
border
p-4
w-full
"

placeholder="Blacklist reason"

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


</div>


)

}






</Section>









<Section title="Notes">


<textarea

className="
border
p-4
w-full
"

rows={5}

value={
form.notes
}

onChange={
e=>
update(
"notes",
e.target.value
)

}

/>


</Section>









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
"Save Clearance"

}


</button>







</div>

);


}









function Section({

title,
children

}:{

title:string;

children:React.ReactNode;

}){


return (

<section className="
border
p-6
">


<h2 className="
text-2xl
font-bold
text-[#003B6F]
mb-5
">

{title}

</h2>


{children}


</section>

);


}
