import { supabaseAdmin } from "../../lib/supabase-admin";
import { notFound } from "next/navigation";


async function getRobloxAvatar(userId:string){

    try{

        const response = await fetch(
            `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=true`,
            {
                cache:"no-store"
            }
        );


        const data = await response.json();


        return data?.data?.[0]?.imageUrl || null;


    }
    catch{

        return null;

    }

}







export default async function ArticlePage({

params,

}:{

params:Promise<{slug:string}>

}){


const {slug} = await params;





const {
    data:article,
    error

} = await supabaseAdmin

.from("news")

.select("*")

.eq(
    "slug",
    slug
)

.single();





if(error || !article){

    notFound();

}







let author:any = null;

let authorPosition:string | null = null;





if(article.author_id){


const {
    data:employee

} = await supabaseAdmin

.from("employees")

.select("*")

.eq(
    "id",
    article.author_id
)

.single();



author = employee;




if(employee?.position_id){


const {
    data:position

} = await supabaseAdmin

.from("positions")

.select("title")

.eq(
    "id",
    employee.position_id
)

.single();



authorPosition = position?.title || null;


}


}







const avatarUrl = author?.roblox_user_id

?

await getRobloxAvatar(
    author.roblox_user_id
)

:

null;









function getFileIcon(name:string){


const file=name.toLowerCase();



if(file.endsWith(".pdf"))
return "📄";


if(
file.endsWith(".doc") ||
file.endsWith(".docx")
)

return "📝";



if(
file.endsWith(".png") ||
file.endsWith(".jpg") ||
file.endsWith(".jpeg")
)

return "🖼️";



return "📁";


}










return (

<main

className="
relative
py-16
"

>


{/* BACKGROUND DESIGN */}

<div

className="
absolute
inset-0
-z-10
bg-[#003B6F]
overflow-hidden
"

>

<div

className="
absolute
inset-0
opacity-10
bg-[linear-gradient(45deg,transparent_45%,white_46%,transparent_47%),linear-gradient(-45deg,transparent_45%,white_46%,transparent_47%)]
bg-[length:120px_120px]
"

/>

</div>








<section

className="
max-w-5xl
mx-auto
px-6
"

>


<div

className="
bg-white
shadow-2xl
border
border-gray-200
"

>


{/* DHS GOLD BAR */}

<div

className="
h-2
bg-[#F2C94C]
"

/>







<div

className="
p-8
md:p-12
"

>






{/* HEADER */}


<header

className="
border-b
pb-8
"

>



<p

className="
uppercase
tracking-widest
text-sm
font-bold
text-[#003B6F]
"

>

{article.category || "Public Release"}

</p>






<h1

className="
mt-5
text-4xl
md:text-5xl
font-bold
text-[#003B6F]
leading-tight
"

>

{article.title}

</h1>






<div

className="
mt-8
flex
items-center
gap-5
"

>


{

avatarUrl ?

<img

src={avatarUrl}

alt="Author"

className="
w-16
h-16
rounded-full
border
object-cover
"

/>


:

<div

className="
w-16
h-16
rounded-full
bg-[#003B6F]
text-white
flex
items-center
justify-center
font-bold
text-2xl
"

>

{author?.roblox_username?.charAt(0) || "?"}

</div>


}





<div>


<p className="font-bold text-gray-900">

{author?.roblox_username || "Unknown Author"}

</p>


<p className="text-sm text-gray-600">

{authorPosition || "Staff Member"}

</p>


<p className="text-sm text-gray-500">

{author?.email}

</p>


</div>



</div>






<p

className="
mt-6
text-sm
text-gray-500
"

>

Published:

{" "}

{
new Date(
article.created_at
)
.toLocaleDateString()
}

</p>






</header>









{/* FEATURE IMAGE */}


{

article.featured_image && (

<img

src={article.featured_image}

alt={article.title}

className="
mt-10
w-full
rounded-lg
object-cover
max-h-[600px]
shadow
"

/>

)

}









{/* RELEASE NOTICE */}


<section

className="
mt-10
border-l-4
border-[#003B6F]
bg-gray-50
p-6
"

>


<h2

className="
font-bold
text-lg
text-[#003B6F]
"

>

FOR IMMEDIATE RELEASE

</h2>



<p className="
mt-2
text-gray-700
"

>

The Department of Homeland Security has released the following statement.

</p>


</section>









{/* ARTICLE CONTENT */}


<article

className="
article-content
mt-10
text-lg
leading-relaxed
text-gray-800
"

dangerouslySetInnerHTML={{

__html:article.content

}}

/>









{/* ATTACHMENTS */}


{

article.attachments &&

article.attachments.length > 0 && (


<section

className="
mt-12
border
rounded-lg
p-6
bg-gray-50
"

>


<h2

className="
text-2xl
font-bold
text-[#003B6F]
"

>

Attachments

</h2>




<ul className="
mt-5
space-y-3
">


{

article.attachments.map(

(file:any)=>(


<li

key={file.url}

>


<a

href={file.url}

target="_blank"

rel="noopener noreferrer"

className="
block
bg-white
border
p-4
font-semibold
text-[#003B6F]
hover:shadow-md
transition
"

>

{getFileIcon(file.name)}

{" "}

{file.name}


</a>


</li>


)

)


}


</ul>



</section>


)

}









<footer

className="
mt-12
border-t
pt-6
text-sm
text-gray-600
"

>


<p>

Issued by:

</p>



<p className="
font-bold
text-[#003B6F]
"

>

OSFUSA Department of Homeland Security

</p>


</footer>






</div>

</div>


</section>


</main>

);


}