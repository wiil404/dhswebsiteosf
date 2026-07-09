import HeroCarousel from "@/components/HeroCarousel";
import Image from "next/image";
import Link from "next/link";
import { supabaseAdmin } from "./lib/supabase-admin";


export default async function Home() {


    const {
    data: featured
} = await supabaseAdmin

    .from("news")

    .select("*")

    .eq("featured", true)

    .eq("published", true)

    .limit(1)

    .maybeSingle();





    const {
    data: news,
    error: newsError
} = await supabaseAdmin

.from("news")

.select("*")

.eq("published", true)

.order(
    "created_at",
    {
        ascending:false
    }
)

.limit(3);


console.log(
    "NEWS DATA:",
    news
);

console.log(
    "NEWS ERROR:",
    newsError
);





return (

<main>


<HeroCarousel />





{/* FEATURE CARDS */}

<section

className="
relative
-mt-24
z-20
max-w-7xl
mx-auto
px-6
"

>

<div

className="
grid
md:grid-cols-3
gap-8
"

>

<RecruitCard
image="/hero/recruitment.jpg"
href="/recruitment"
/>


<RecruitCard
image="/hero/divisions.jpg"
href="/divisions"
/>


<RecruitCard
image="/hero/service.jpg"
href="/about"
/>


</div>


</section>







{/* FEATURED STATEMENT */}

{

featured && (

<section

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
"

>


<div

className="
h-2
bg-[#F2C94C]
"

/>



<div

className="
p-10
md:p-14
"

>


<p

className="
uppercase
text-sm
font-bold
tracking-widest
text-[#003B6F]
"

>

Featured Statement

</p>





<h2

className="
mt-4
text-4xl
md:text-5xl
font-bold
text-[#003B6F]
leading-tight
"

>

{featured.title}

</h2>





<p

className="
mt-5
text-lg
text-gray-700
max-w-4xl
leading-relaxed
"

>

{featured.summary}

</p>





<Link

href={`/news/${featured.slug}`}

className="
inline-flex
mt-8
bg-[#003B6F]
text-white
px-7
py-3
font-bold
hover:bg-[#002B52]
transition
"

>

Read Full Statement →

</Link>



</div>


</div>


</section>


)

}









{/* LATEST NEWS */}

<section

className="
max-w-7xl
mx-auto
px-6
pb-20
"

>


<div

className="
bg-white
shadow-xl
border
border-gray-200
p-10
md:p-14
"

>


<div

className="
flex
items-center
justify-between
"

>


<h2

className="
text-4xl
font-bold
text-[#003B6F]
"

>

Latest News

</h2>



<Link

href="/news"

className="
text-[#003B6F]
font-bold
hover:underline
"

>

View All →

</Link>


</div>







<div

className="
grid
md:grid-cols-3
gap-8
mt-10
"

>


{

news?.map(article=>(


<article

key={article.id}

className="
bg-white
border
border-gray-200
shadow-sm
hover:shadow-lg
transition
"

>


<div

className="
h-2
bg-[#003B6F]
"

/>




<div

className="
p-7
"

>


<p

className="
text-sm
font-bold
uppercase
tracking-wide
text-[#003B6F]
"

>

{article.category || "News"}

</p>





<h3

className="
mt-4
text-2xl
font-bold
text-gray-900
leading-tight
"

>

{article.title}

</h3>





<p

className="
mt-4
text-gray-600
leading-relaxed
"

>

{article.summary}

</p>






{

article.employees && (

<div

className="
mt-6
border-t
pt-4
"

>


<p

className="
font-bold
text-gray-900
"

>

Author: {article.employees.roblox_username}

</p>


<p

className="
text-sm
text-gray-600
"

>

{
article.employees.positions?.title ||
"Staff Member"
}

</p>


</div>


)

}





<div

className="
mt-6
flex
justify-between
items-center
"

>


<span

className="
text-sm
text-gray-500
"

>

{
new Date(article.created_at)
.toLocaleDateString()
}

</span>




<Link

href={`/news/${article.slug}`}

className="
font-bold
text-[#003B6F]
hover:underline
"

>

Read More →

</Link>



</div>



</div>



</article>


))


}



</div>



</div>



</section>






</main>

);


}









function RecruitCard({

image,

href

}:{

image:string;

href:string;

}){


return (

<Link

href={href}

className="
relative
h-80
overflow-hidden
shadow-xl
block
group
"

>


<Image

src={image}

alt=""

fill

className="
object-cover
transition
duration-500
group-hover:scale-105
"

/>



<div

className="
absolute
inset-0
bg-gradient-to-t
from-[#003B6F]/70
to-transparent
"

/>



</Link>


);


}