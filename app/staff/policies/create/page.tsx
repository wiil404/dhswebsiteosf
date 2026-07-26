"use client";

import {useState,useEffect} from "react";
import {useRouter} from "next/navigation";

import Editor from "../../../../components/Editor";
import FileUpload from "../../../../components/FileUpload";



export default function CreatePolicy(){


const router = useRouter();



const [title,setTitle]=useState("");

const [category,setCategory]=useState(
"Security"
);


const [scope,setScope]=useState(
"UNIVERSAL"
);


const [divisionId,setDivisionId]=useState("");



const [classification,setClassification]=useState(
"PUBLIC"
);



const [content,setContent]=useState("");



const [divisions,setDivisions]=useState<any[]>([]);



const [attachments,setAttachments]=useState<
{
name:string;
url:string;
}[]
>([]);



const [featuredImage,setFeaturedImage]=useState("");



const [loading,setLoading]=useState(false);







useEffect(()=>{


async function loadDivisions(){


const response = await fetch(
"/api/divisions"
);


const data = await response.json();


setDivisions(
data.divisions || []
);


}


loadDivisions();


},[]);









async function createPolicy(){



if(
scope==="DIVISIONAL"
&&
!divisionId
){

alert(
"Please select a division for a divisional policy."
);

return;

}




setLoading(true);






const response = await fetch(

"/api/policies/create",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

title,

category,

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







const result =
await response.json();






if(!response.ok){


alert(
result.error ||
"Failed to create policy"
);


setLoading(false);

return;


}





router.push(
"/staff/policies"
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
shadow-2xl
overflow-hidden
">





<div className="
h-3
bg-[#F2C94C]
"/>





<div className="
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

Create Policy

</h1>


<p className="
mt-3
text-blue-100
">

Create official Department policies and directives.

</p>


</div>









<div className="
p-10
space-y-8
">







<Input

label="Policy Title"

value={title}

setValue={setTitle}

placeholder="Policy title"

/>









<div>

<label className="
block
font-black
text-[#003B6F]
mb-2
">

Policy Category

</label>


<select

className="
w-full
border
p-4
"

value={category}

onChange={(e)=>
setCategory(e.target.value)
}

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

Policy Scope

</label>



<select

className="
w-full
border
p-4
"

value={scope}

onChange={(e)=>
setScope(e.target.value)
}

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

className="
w-full
border
p-4
"

value={classification}

onChange={(e)=>
setClassification(e.target.value)
}

>

<option value="PUBLIC">
Public Release
</option>


<option value="FOUO">
For Official Use Only (FOUO)
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








{

featuredImage && (

<div className="
border
p-5
bg-gray-50
">

<p className="
font-bold
mb-3
">

Featured Image Preview

</p>


<img

src={featuredImage}

className="
max-h-64
"

/>


</div>

)

}









<button

onClick={createPolicy}

disabled={loading}

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

loading

?

"Submitting..."

:

"Submit Policy"

}


</button>





</div>





</div>



</section>



</main>


);


}







function Input({

label,

value,

setValue,

placeholder

}:{

label:string;

value:string;

setValue:(v:string)=>void;

placeholder:string;

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

placeholder={placeholder}

onChange={(e)=>
setValue(e.target.value)
}

/>


</div>

);


}
