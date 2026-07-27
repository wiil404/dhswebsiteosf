"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Editor from "../../../../../components/Editor";
import FileUpload from "../../../../../components/FileUpload";



export default function EditPolicy(){


const params = useParams();

const router = useRouter();


const id = params.id as string;



const [loading,setLoading] = useState(true);

const [saving,setSaving] = useState(false);



const [title,setTitle] = useState("");

const [category,setCategory] = useState("Security");

const [tag,setTag] = useState("Internal");

const [scope,setScope] = useState("UNIVERSAL");

const [divisionId,setDivisionId] = useState("");

const [classification,setClassification] = useState("PUBLIC");

const [content,setContent] = useState("");

const [attachments,setAttachments] = useState<any[]>([]);

const [featuredImage,setFeaturedImage] = useState("");

const [divisions,setDivisions] = useState<any[]>([]);





useEffect(()=>{


async function load(){


try{


const policyResponse = await fetch(
`/api/policies/${id}`
);


const policyData = await policyResponse.json();



if(!policyResponse.ok){

alert(
policyData.error || "Failed loading policy"
);

router.push("/staff/policies");

return;

}



const policy = policyData.policy;



setTitle(
policy.title || ""
);


setCategory(
policy.category || "Security"
);


setTag(
policy.tag || "Internal"
);


setScope(
policy.scope || "UNIVERSAL"
);


setDivisionId(
policy.division_id || ""
);


setClassification(
policy.classification || "PUBLIC"
);


setContent(
policy.content || ""
);


setAttachments(
policy.attachments || []
);


setFeaturedImage(
policy.featured_image || ""
);







const divisionResponse = await fetch(
"/api/divisions"
);


const divisionData =
await divisionResponse.json();



setDivisions(
divisionData.divisions || []
);



setLoading(false);



}catch(error){


console.error(error);


alert(
"Failed loading policy"
);


router.push("/staff/policies");


}



}



if(id){

load();

}



},[id,router]);









async function updatePolicy(){



if(
tag !== "Civil"
&&
scope==="DIVISIONAL"
&&
!divisionId
){

alert(
"Please select a division."
);

return;

}




setSaving(true);





const response = await fetch(

`/api/policies/${id}`,

{

method:"PATCH",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

title,

category,

tag,


scope:

tag==="Civil"

?

"UNIVERSAL"

:

scope,



division_id:

tag==="Civil"

?

null

:

(
scope==="DIVISIONAL"

?

divisionId

:

null
),



classification:

tag==="Civil"

?

"PUBLIC"

:

classification,



content,

attachments,

featuredImage


})

}

);







const data =
await response.json();





if(!response.ok){


alert(
data.error || "Failed updating policy"
);


setSaving(false);

return;


}





router.push(
"/staff/policies"
);



}








if(loading){


return (

<div className="
min-h-screen
flex
items-center
justify-center
font-black
text-[#003B6F]
">

Loading Policy...

</div>

);


}









return (

<main className="
min-h-screen
bg-[#F5F8FB]
py-16
">


<section className="
max-w-6xl
mx-auto
px-6
">


<div className="
bg-white
border
shadow-xl
overflow-hidden
">


<div className="
h-3
bg-[#F2C94C]
"/>



<header className="
bg-gradient-to-r
from-[#003B6F]
to-[#005AA7]
text-white
p-10
">


<p className="
uppercase
tracking-[0.35em]
text-[#F2C94C]
font-black
text-sm
">

Department of Homeland Security

</p>



<h1 className="
text-5xl
font-black
mt-4
">

Edit Policy

</h1>



<p className="
text-blue-100
mt-3
">

Update policy information and release settings.

</p>


</header>









<div className="
p-10
space-y-8
">





<Field

label="Policy Title"

value={title}

setValue={setTitle}

/>







<Select

label="Category"

value={category}

setValue={setCategory}

options={[

"Security",
"Operations",
"Personnel",
"Training",
"Aviation",
"Administrative"

]}

/>







<Select

label="Policy Tag"

value={tag}

setValue={setTag}

options={[

"Internal",
"Operational",
"Security",
"Civil"

]}

/>







<Select

label="Scope"

value={scope}

setValue={setScope}

options={[

"UNIVERSAL",
"DIVISIONAL"

]}

/>








{

scope==="DIVISIONAL"
&&
tag!=="Civil"
&&

(

<div>


<label className="
block
font-black
text-[#003B6F]
mb-2
">

Division

</label>



<select

className="
w-full
border
p-4
"

value={divisionId}

onChange={(e)=>
setDivisionId(e.target.value)
}

>


<option value="">
Select Division
</option>



{

divisions.map((division:any)=>(


<option

key={division.id}

value={division.id}

>

{division.name}

</option>


))

}



</select>


</div>

)

}








<Select

label="Classification"

value={
tag==="Civil"
?
"PUBLIC"
:
classification
}

setValue={setClassification}

options={[

"PUBLIC",
"FOUO"

]}

disabled={tag==="Civil"}

/>









<div>


<label className="
block
font-black
text-[#003B6F]
mb-2
">

Policy Content

</label>



<div className="
border
p-5
">


<Editor

value={content}

onChange={setContent}

/>


</div>


</div>








<FileUpload

attachments={attachments}

setAttachments={setAttachments}

featuredImage={featuredImage}

setFeaturedImage={setFeaturedImage}

/>








<button

onClick={updatePolicy}

disabled={saving}

className="
bg-[#003B6F]
text-white
px-10
py-4
font-black
text-lg
hover:bg-[#005AA7]
transition
"

>


{

saving

?

"Saving..."

:

"Save Changes"

}


</button>





</div>





</div>


</section>


</main>


);


}









function Field({

label,

value,

setValue

}:{

label:string;

value:string;

setValue:(v:string)=>void;

}){


return (

<div>


<label className="
block
font-black
text-[#003B6F]
mb-2
">

{label}

</label>



<input

className="
w-full
border
p-4
"

value={value}

onChange={(e)=>
setValue(e.target.value)
}

/>


</div>


);


}









function Select({

label,

value,

setValue,

options,

disabled=false

}:{

label:string;

value:string;

setValue:(v:string)=>void;

options:string[];

disabled?:boolean;

}){


return (

<div>


<label className="
block
font-black
text-[#003B6F]
mb-2
">

{label}

</label>



<select

disabled={disabled}

className="
w-full
border
p-4
disabled:bg-gray-100
"

value={value}

onChange={(e)=>
setValue(e.target.value)
}

>


{

options.map(option=>(

<option

key={option}

value={option}

>

{option}

</option>


))

}


</select>


</div>


);


}
