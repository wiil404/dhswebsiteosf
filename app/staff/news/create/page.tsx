"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Editor from "../../../../components/Editor";
import FileUpload from "../../../../components/FileUpload";



export default function CreateNews(){


const router = useRouter();



const [title,setTitle] = useState("");
const [slug,setSlug] = useState("");
const [category,setCategory] = useState("Press Release");
const [summary,setSummary] = useState("");
const [content,setContent] = useState("");

const [published,setPublished] = useState(true);
const [featured,setFeatured] = useState(false);


const [attachments,setAttachments] = useState<
{
    name:string;
    url:string;
}[]
>([]);


const [featuredImage,setFeaturedImage] = useState("");

const [loading,setLoading] = useState(false);





function generateSlug(value:string){

return value

.toLowerCase()

.trim()

.replace(
/[^a-z0-9]+/g,
"-"
)

.replace(
/^-+|-+$/g,
"");

}





async function createArticle(){


setLoading(true);



const response = await fetch(

"/api/news/create",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

title,

slug,

category,

summary,

content,

published,

featured,

attachments,

featuredImage

})

}

);





const result =
await response.json();





if(!response.ok){

alert(
result.error || "Failed to create release"
);

setLoading(false);

return;

}





router.push(
"/staff/news"
);


}







return (

<main

className="
max-w-5xl
mx-auto
px-6
py-16
"

>


<div

className="
bg-white
shadow-xl
border
border-gray-200
p-8
md:p-12
"

>


<h1

className="
text-4xl
font-black
text-[#003B6F]
"

>

Create Press Release

</h1>


<p

className="
mt-3
text-gray-600
"

>

Create official DHS communications.

</p>







<div

className="
mt-10
space-y-5
"

>





<input

className="
w-full
border
p-4
"

placeholder="Title"

value={title}

onChange={(e)=>{

const value=e.target.value;

setTitle(value);

setSlug(
generateSlug(value)
);

}}

/>







<input

className="
w-full
border
p-4
"

placeholder="Slug"

value={slug}

onChange={(e)=>
setSlug(e.target.value)
}

/>







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
Press Release
</option>

<option>
Public Notice
</option>

<option>
Statement
</option>


</select>







<textarea

className="
w-full
border
p-4
"

rows={4}

placeholder="Summary"

value={summary}

onChange={(e)=>
setSummary(e.target.value)
}

/>








<div

className="
border
p-5
"

>


<Editor

value={content}

onChange={setContent}

/>


</div>







<FileUpload

attachments={attachments}

setAttachments={setAttachments}

featuredImage={featuredImage}

setFeaturedImage={setFeaturedImage}

/>









<div

className="
border
bg-gray-50
p-6
space-y-4
"

>


<label className="flex gap-3 items-center">


<input

type="checkbox"

checked={published}

onChange={(e)=>
setPublished(e.target.checked)
}

/>


Publish immediately


</label>







<label className="flex gap-3 items-center">


<input

type="checkbox"

checked={featured}

disabled={!published}

onChange={(e)=>
setFeatured(e.target.checked)
}

/>


Feature on homepage


</label>


</div>








<button

onClick={createArticle}

disabled={loading}

className="
mt-8
bg-[#003B6F]
text-white
px-8
py-3
font-bold
"

>


{

loading

?

"Saving..."

:

published

?

"Publish Release"

:

"Save Draft"

}


</button>





</div>


</div>


</main>


);


}
