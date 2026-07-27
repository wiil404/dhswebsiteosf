"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Editor from "../../../../../components/Editor";
import FileUpload from "../../../../../components/FileUpload";



export default function EditPolicy(){


const params = useParams();

const router = useRouter();


const id = params.id as string;





const [title,setTitle]=useState("");

const [category,setCategory]=useState("Security");

const [tag,setTag]=useState("Internal");

const [scope,setScope]=useState("UNIVERSAL");

const [divisionId,setDivisionId]=useState("");

const [classification,setClassification]=useState("PUBLIC");

const [content,setContent]=useState("");

const [attachments,setAttachments]=useState<any[]>([]);

const [featuredImage,setFeaturedImage]=useState("");

const [divisions,setDivisions]=useState<any[]>([]);


const [loading,setLoading]=useState(true);

const [saving,setSaving]=useState(false);






useEffect(()=>{


async function loadPolicy(){


const response = await fetch(
`/api/policies/${id}`
);


const data = await response.json();



if(!response.ok){

alert(data.error || "Failed loading policy");

return;

}



const policy = data.policy;



setTitle(policy.title || "");

setCategory(policy.category || "Security");

setTag(policy.tag || "Internal");

setScope(policy.scope || "UNIVERSAL");

setDivisionId(policy.division_id || "");

setClassification(policy.classification || "PUBLIC");

setContent(policy.content || "");

setAttachments(policy.attachments || []);

setFeaturedImage(policy.featured_image || "");



}



async function loadDivisions(){


const response = await fetch(
"/api/divisions"
);


const data = await response.json();


setDivisions(
data.divisions || []
);


}



loadPolicy();

loadDivisions();


setLoading(false);



},[id]);








async function updatePolicy(){


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

scope,

division_id:

scope==="DIVISIONAL"

?

divisionId

:

null,


classification,

content,

attachments,

featuredImage


})

}

);




const data = await response.json();



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







<div>

<label className="
block
font-black
text-[#003B6F]
mb-2
">

Category

</label>


<select

className="
w-full
border
p-4
"

value={category}

onChange={(e)=>setCategory(e.target.value)}

>

<option>Security</option>
<option>Operations</option>
<option>Personnel</option>
<option>Training</option>
<option>Aviation</option>
<option>Administrative</option>

</select>


</div>







<div>

<label className="
block
font-black
text-[#003B6F]
mb-2
">

Policy Tag

</label>


<select

className="
w-full
border
p-4
"

value={tag}

onChange={(e)=>setTag(e.target.value)}

>

<option value="Internal">
Internal
</option>

<option value="Operational">
Operational
</option>

<option value="Security">
Security
</option>

<option value="Civil">
Civil
</option>


</select>


</div>







<div>

<label className="
block
font-black
text-[#003B6F]
mb-2
">

Scope

</label>


<select

className="
w-full
border
p-4
"

value={scope}

onChange={(e)=>setScope(e.target.value)}

>

<option value="UNIVERSAL">
Department Wide Policy
</option>


<option value="DIVISIONAL">
Division Specific Policy
</option>


</select>


</div>







{

scope==="DIVISIONAL" && (

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

onChange={(e)=>setDivisionId(e.target.value)}

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








<div>

<label className="
block
font-black
text-[#003B6F]
mb-2
">

Classification

</label>


<select

disabled={tag==="Civil"}

className="
w-full
border
p-4
"

value={

tag==="Civil"

?

"PUBLIC"

:

classification

}

onChange={(e)=>setClassification(e.target.value)}

>


<option value="PUBLIC">
Public Release
</option>


<option value="FOUO">
For Official Use Only
</option>


</select>


</div>









<div>

<label className="
block
font-black
text-[#003B6F]
mb-2
">

Content

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

onChange={(e)=>setValue(e.target.value)}

/>


</div>


);


}