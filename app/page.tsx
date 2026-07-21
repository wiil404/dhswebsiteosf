import HeroCarousel from "@/components/HeroCarousel";
import Image from "next/image";
import Link from "next/link";
import { supabaseAdmin } from "./lib/supabase-admin";
export const dynamic = "force-dynamic";
import Breadcrumb from "@/components/Breadcrumb";



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


<Breadcrumb />


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





<FeatureCard

image="/hero/recruitment.jpg"

href="/recruitment"

title="Join DHS"

description="Begin your career serving the nation alongside dedicated professionals."

button="Apply Now"

/>






<FeatureCard

image="/hero/divisions.jpg"

href="/divisions"

title="Explore Our Agencies"

description="Discover the divisions, teams, and responsibilities that make up DHS."

button="View Divisions"

/>








<FeatureCard

image="/hero/about.jpg"

href="/about"

title="About The Department"

description="Learn about our mission, leadership, history, and commitment to service."

button="Learn More"

/>





</div>


</section>

id="p2"
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








{/* CLEARANCE REGISTRY */}

<section

className="
max-w-7xl
mx-auto
px-6
pb-16
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
bg-[#003B6F]
"

/>




<div

className="
p-10
md:p-14
"

>


<div

className="
flex
flex-col
md:flex-row
justify-between
items-start
md:items-center
gap-8
"

>


<div>


<p

className="
uppercase
text-sm
font-bold
tracking-widest
text-[#003B6F]
"

>

Public Verification Service

</p>





<h2

className="
mt-4
text-4xl
md:text-5xl
font-black
text-[#003B6F]
leading-tight
"

>

Security Clearance Registry

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

Verify authorised DHS personnel and organisations through the official public clearance database. Access approved security records, clearance levels, and verification information.

</p>



</div>








<Link

href="/clearance"

className="
shrink-0
bg-[#003B6F]
text-white
px-8
py-4
font-black
hover:bg-[#002B52]
transition
"

>

View Registry →

</Link>



</div>




</div>


</div>


</section>








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

news?.map(article => (


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









function FeatureCard({

image,

href,

title,

description,

button


}:{

image:string;

href:string;

title:string;

description:string;

button:string;

}){


return (

<Link

href={href}

className="
relative
h-96
overflow-hidden
shadow-xl
block
group
"

>


<Image

src={image}

alt={title}

fill

className="
object-cover
transition
duration-700
group-hover:scale-110
"

/>




<div

className="
absolute
inset-0
bg-gradient-to-t
from-[#001F3F]
via-[#003B6F]/60
to-transparent
"

/>





<div

className="
absolute
bottom-0
p-8
text-white
"

>



<h3

className="
text-3xl
font-bold
"

>

{title}

</h3>





<p

className="
mt-3
text-gray-200
leading-relaxed
"

>

{description}

</p>






<div

className="
mt-6
inline-flex
bg-[#F2C94C]
text-[#003B6F]
px-6
py-3
font-bold
transition
group-hover:translate-x-2
"

>

{button} →

</div>




</div>


</Link>


);


}
