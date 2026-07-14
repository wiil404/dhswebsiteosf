"use client";

import { useState, useEffect } from "react";
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

const [checkingPermission,setCheckingPermission] = useState(true);









useEffect(()=>{


async function checkPermission(){


try{


const profileResponse =
await fetch(
    "/api/profile"
);



if(!profileResponse.ok){

    router.push("/staff/login");

    return;

}



const profile =
await profileResponse.json();






const permissionResponse =
await fetch(
    "/api/profile/permissions?permission=news.create"
);



const permission =
await permissionResponse.json();






if(

permission.allowed ||

profile.role === "Administrator" ||

profile.role === "Editor" ||

profile.role === "Public Affairs Officer"

){

    setCheckingPermission(false);

}

else{

    router.push("/staff/news");

}



}

catch(error){


console.error(
"PERMISSION ERROR:",
error
);


router.push("/staff/news");


}



}



checkPermission();



},[router]);









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



try{


const response =
await fetch(

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






if(result.error){


alert(result.error);

setLoading(false);

return;


}





router.push(
"/staff/news"
);



}

catch(error){


console.error(
"CREATE ERROR:",
error
);


alert(
"Something went wrong creating the article"
);


setLoading(false);


}



}









if(checkingPermission){


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
p-10
"

>


<h1

className="
text-2xl
font-bold
text-[#003B6F]
"

>

Checking permissions...

</h1>


</div>


</main>


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





<div

className="
border-b
border-gray-200
pb-8
"

>


<h1

className="
text-4xl
font-bold
text-[#003B6F]
"

>

Create Press Release

</h1>



<p

className="
mt-3
text-gray-500
"

>

Create and publish official DHS statements, notices and releases.

</p>


</div>









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
border-gray-300
p-4
"

placeholder="Title"

value={title}

onChange={(e)=>{


const value =
e.target.value;


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
border-gray-300
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
border-gray-300
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
border-gray-300
p-4
"

placeholder="Summary"

rows={4}

value={summary}

onChange={(e)=>
setSummary(e.target.value)
}

/>








<div

className="
border
border-gray-200
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
mt-8
border
border-[#D9E4EF]
bg-[#F5F8FB]
p-6
space-y-5
"

>



<label

className="
flex
items-center
gap-3
"

>

<input

type="checkbox"

checked={published}

onChange={(e)=>
setPublished(e.target.checked)
}

/>


<span className="
font-semibold
"

>

Publish immediately

</span>


</label>






<label

className="
flex
items-center
gap-3
"

>


<input

type="checkbox"

disabled={!published}

checked={featured}

onChange={(e)=>
setFeatured(e.target.checked)
}

/>



<span className="
font-semibold
"

>

Feature on homepage statement block

</span>


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
disabled:opacity-50
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
