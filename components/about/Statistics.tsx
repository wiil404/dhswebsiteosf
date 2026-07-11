import { supabaseAdmin } from "../../app/lib/supabase-admin";



async function getStatistics(){


const {

count:employees

} = await supabaseAdmin

.from("employees")

.select(
"id",
{
count:"exact",
head:true
}
)

.eq(
"status",
"Active"
);







const {

count:divisions

} = await supabaseAdmin

.from("divisions")

.select(
"id",
{
count:"exact",
head:true
}
);







const {

count:positions

} = await supabaseAdmin

.from("positions")

.select(
"id",
{
count:"exact",
head:true
}
);






return {


employees:
employees || 0,


divisions:
divisions || 0,


positions:
positions || 0


};


}









export default async function Statistics(){



const stats =
await getStatistics();






const cards = [


{


number:
stats.employees,


title:
"Active Personnel",


description:
"Dedicated DHS members serving across operational divisions."


},




{


number:
stats.divisions,


title:
"Operational Divisions",


description:
"Specialised units working together under the DHS mission."


},





{


number:
stats.positions,


title:
"Leadership & Career Paths",


description:
"Structured roles providing opportunity and advancement."


},





{


number:
"24/7",


title:
"Mission Readiness",


description:
"Prepared to respond whenever the nation requires."


}


];








return (


<section

className="
bg-[#003B6F]
text-white
py-20
"

>


<div

className="
max-w-7xl
mx-auto
px-6
"

>





<div

className="
text-center
"

>


<p

className="
uppercase
tracking-[0.3em]
text-[#F2C94C]
font-black
"

>

Department Overview

</p>



<h2

className="
mt-4
text-5xl
font-black
"

>

The DHS Mission In Numbers

</h2>




<p

className="
mt-5
text-gray-200
max-w-3xl
mx-auto
text-lg
"

>

Behind every operation is a dedicated workforce,
structured organisation, and commitment to protecting
the communities we serve.

</p>



</div>









<div

className="
grid
md:grid-cols-4
gap-6
mt-14
"

>

{


cards.map(
(card)=>(


<div

key={card.title}

className="
bg-white
text-gray-900
p-8
border-t-4
border-[#F2C94C]
shadow-xl
hover:-translate-y-2
transition
"

>


<h3

className="
text-6xl
font-black
text-[#003B6F]
"

>

{card.number}

</h3>




<p

className="
mt-4
font-black
text-xl
text-[#003B6F]
"

>

{card.title}

</p>





<p

className="
mt-3
text-gray-600
leading-relaxed
"

>

{card.description}

</p>



</div>



)

)



}


</div>





</div>


</section>


);


}