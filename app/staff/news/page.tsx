import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { redirect } from "next/navigation";
import { requirePermission } from "../../lib/requirePermission";

import {
    canCreateNews,
    canEditNews,
    canDeleteNews,
    canPublishNews
} from "../../lib/permissions";


import DeleteButton from "./DeleteButton";
import ToggleButton from "./ToggleButton";





export default async function StaffNewsPage(){


const profile =
    await requirePermission([
        "news.create",
        "news.edit",
        "news.delete",
        "news.publish"
    ]);



if(!profile){

    redirect("/staff/login");

}






const createAllowed =
await canCreateNews();


const editAllowed =
await canEditNews();


const deleteAllowed =
await canDeleteNews();


const publishAllowed =
await canPublishNews();








const {
    data:articles,
    error
} = await supabase

.from("news")

.select("*")

.order(
    "date",
    {
        ascending:false
    }
);









return (

<main

className="
max-w-7xl
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







{/* HEADER */}


<div

className="
flex
justify-between
items-start
border-b
border-gray-200
pb-8
"

>


<div>


<h1

className="
text-4xl
font-bold
text-[#003B6F]
"

>

Manage News Releases

</h1>





<p

className="
mt-3
text-gray-500
"

>

Create, edit and manage official DHS releases.

</p>





<p

className="
mt-3
text-sm
font-semibold
text-[#003B6F]
"

>

Role: {profile.role}

</p>


</div>








{

createAllowed && (

<Link

href="/staff/news/create"

className="
bg-[#003B6F]
text-white
px-6
py-3
font-bold
hover:bg-[#00284d]
transition
"

>

+ New Release

</Link>

)

}



</div>









{
error && (

<div

className="
mt-8
bg-red-50
border
border-red-200
p-5
text-red-700
"

>

{error.message}

</div>

)

}









{/* ARTICLES */}


<div

className="
mt-10
space-y-6
"

>





{

articles?.map((article)=>(


<article

key={article.id}

className="
relative
border
border-gray-200
bg-white
p-7
shadow-sm
hover:shadow-lg
transition
"

>




<div

className="
absolute
left-0
top-0
h-full
w-1
bg-[#003B6F]
"

/>








<div

className="
flex
justify-between
items-start
gap-5
"

>


<div>


<h2

className="
text-2xl
font-bold
text-[#003B6F]
"

>

{article.title}

</h2>





<p

className="
mt-2
text-sm
text-gray-500
"

>

{article.category} • {article.date}

</p>


</div>








<span

className={`

px-4
py-1
text-sm
font-bold

${

article.published

?

"bg-green-100 text-green-700"

:

"bg-orange-100 text-orange-700"

}

`}

>

{

article.published

?

"Published"

:

"Draft"

}


</span>



</div>









<p

className="
mt-5
text-gray-700
leading-relaxed
"

>

{article.summary}

</p>









<div

className="
mt-7
flex
items-center
gap-6
border-t
border-gray-100
pt-5
"

>





<Link

href={`/news/${article.slug}`}

className="
font-semibold
text-[#003B6F]
hover:underline
"

>

View

</Link>









{

editAllowed && (

<Link

href={`/staff/news/edit/${article.id}`}

className="
font-semibold
text-[#003B6F]
hover:underline
"

>

Edit

</Link>

)

}









{

publishAllowed && (

<ToggleButton

id={article.id}

published={article.published}

/>

)

}









{

deleteAllowed && (

<DeleteButton

id={article.id}

/>

)

}








</div>







</article>



))

}



</div>







</div>


</main>


);


}
