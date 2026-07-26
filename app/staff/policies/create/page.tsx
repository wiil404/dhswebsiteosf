"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Editor from "../../../../components/Editor";
import FileUpload from "../../../../components/FileUpload";



export default function CreatePolicy(){


const router = useRouter();



const [title,setTitle] = useState("");

const [category,setCategory] = useState(
"Security"
);

const [scope,setScope] = useState(
"UNIVERSAL"
);

const [divisionId,setDivisionId] = useState("");

const [classification,setClassification] = useState(
"PUBLIC"
);

const [content,setContent] = useState("");

const [attachments,setAttachments] = useState<
{
name:string;
url:string;
}[]
>([]);


const [loading,setLoading] = useState(false);







async function createPolicy(){


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
scope === "DIVISIONAL"
?
divisionId
:
null,

classification,

content,

attachments

})

}

);






const result =
await response.json();






if(!response.ok){


alert(
result.error || "Failed to create policy"
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







<div>


<label className="
block
font-black
text-[#003B6F]
mb-2
">

Policy Title

</label>


<input

className="
w-full
border
p-4
"

placeholder="
Policy title
"

value={title}

onChange={(e)=>
setTitle(e.target.value)
}

/>


</div>









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

onChange={(e)=>
setCategory(e.target.value)
}

>


<option>
Security
</option>


<option>
Operations
</option>


<option>
Personnel
</option>


<option>
Training
</option>


<option>
Aviation
</option>


<option>
Administrative
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

Divisional Policy

</option>


</select>



</div>









{

scope === "DIVISIONAL" && (

<div>


<label className="
block
font-black
text-[#003B6F]
mb-2
">

Division ID

</label>


<input

className="
w-full
border
p-4
"

placeholder="
Division UUID
"

value={divisionId}

onChange={(e)=>
setDivisionId(e.target.value)
}

/>


<p className="
text-sm
text-gray-500
mt-2
">

Enter the division ID this policy applies to.

</p>


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

featuredImage={""}

setFeaturedImage={()=>{}}

/>









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
