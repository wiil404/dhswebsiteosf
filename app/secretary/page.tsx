import Image from "next/image";


async function getRobloxAvatar(){

    const userId = "333195903";


    try {


        const userResponse = await fetch(

            `https://users.roblox.com/v1/users/${userId}`,

            {
                cache:"no-store"
            }

        );



        if(!userResponse.ok){

            return null;

        }



        const user = await userResponse.json();





        const avatarResponse = await fetch(

            `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=true`,

            {
                cache:"no-store"
            }

        );




        const avatarData = await avatarResponse.json();





        return {

            id:user.id,

            username:user.name,

            displayName:user.displayName,

            avatar:
            avatarData.data?.[0]?.imageUrl

        };



    }

    catch(error){

        console.error(
            "Roblox lookup failed:",
            error
        );


        return null;

    }


}





export default async function SecretaryPage(){


const roblox = await getRobloxAvatar();




return (


<main className="relative py-16 min-h-screen">





{/* BACKGROUND */}

<div className="
absolute
inset-0
-z-10
bg-[#003B6F]
overflow-hidden
">


<div className="
absolute
inset-0
opacity-10
bg-[linear-gradient(45deg,transparent_45%,white_46%,transparent_47%),linear-gradient(-45deg,transparent_45%,white_46%,transparent_47%)]
bg-[length:120px_120px]
"/>


</div>







<section className="
max-w-7xl
mx-auto
px-6
">


<div className="
bg-white
shadow-2xl
border
overflow-hidden
">





<div className="
h-3
bg-[#F2C94C]
"/>








{/* HEADER */}


<div className="
bg-gradient-to-r
from-[#003B6F]
to-[#005AA7]
text-white
p-10
md:p-14
">


<div className="
flex
flex-col
md:flex-row
items-center
gap-10
">






<div className="
relative
w-52
h-52
rounded-full
border-4
border-white
shadow-2xl
overflow-hidden
bg-white/20
">


{

roblox?.avatar && (

<Image

src={roblox.avatar}

alt="Secretary Roblox Avatar"

fill

className="
object-cover
"

/>

)

}



</div>








<div>


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

WiIl404

</h1>






<h2 className="
text-2xl
mt-3
text-blue-100
">

Secretary of Homeland Security

</h2>







<div className="
mt-5
flex
gap-4
flex-wrap
">


<span className="
bg-green-500/20
border
border-green-300
px-5
py-2
font-bold
">

✓ VERIFIED EXECUTIVE

</span>





<span className="
bg-white/10
px-5
py-2
font-bold
">

Roblox ID: {roblox?.id || "333195903"}

</span>



</div>





</div>





</div>


</div>









{/* PROFILE STATS */}


<div className="
p-10
md:p-14
">


<div className="
grid
md:grid-cols-4
gap-6
">


<Stat

title="Position"

value="Secretary"

/>



<Stat

title="Department"

value="DHS"

/>




<Stat

title="Status"

value="Active"

/>




<Stat

title="Office"

value="Executive"

/>



</div>





{/* BIOGRAPHY */}


<section className="
mt-14
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Biography

</h2>





<p className="
mt-6
text-lg
leading-relaxed
text-gray-700
">

WiIl404 serves as the Secretary of Homeland Security, leading the Department's mission to protect the nation through operational readiness, national security coordination, emergency preparedness, border security, and public safety initiatives.

<br/>
<br/>

Previously serving as Secretary of Homeland Security, WiIl404 was renominated under President Owen's Administration to continue leading the Department. Prior to his appointment, he served in numerous senior national leadership roles including six separate appointments as General and as Chairman of the Joint Chiefs of Staff.

<br/>
<br/>

Throughout his career, the Secretary has held a variety of public-facing positions focused on military leadership, government operations, and interagency cooperation. His experience continues to guide DHS in strengthening its workforce, improving operational capability, and maintaining public trust.

</p>


</section>

{/* CAREER TIMELINE */}


<section className="
mt-14
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Career Timeline

</h2>





<div className="
mt-8
space-y-6
">


<TimelineItem

title="Secretary of Homeland Security"

description="Currently serving as the head of the Department of Homeland Security, overseeing national security operations, emergency preparedness, border security, and departmental strategy."

/>





<TimelineItem

title="Secretary of Homeland Security — Previous Administration"

description="Previously served as Secretary of Homeland Security before being renominated under President Owen's Administration."

/>






<TimelineItem

title="Chairman of the Joint Chiefs of Staff"

description="Served as Chairman of the Joint Chiefs of Staff, advising senior government leadership on military readiness, operations, and national defence matters."

/>






<TimelineItem

title="General Officer Service"

description="Completed six separate General appointments, providing extensive leadership experience across military and government operations."

/>





</div>


</section>









{/* PRIORITIES */}



<section className="
mt-14
">


<h2 className="
text-4xl
font-black
text-[#003B6F]
">

Secretary's Priorities

</h2>







<div className="
grid
md:grid-cols-3
gap-6
mt-8
">






<PrioritiesCard

title="National Security"

description="Strengthening DHS operational readiness through improved coordination, intelligence sharing, and strategic planning."

/>







<PrioritiesCard

title="Operational Excellence"

description="Building a professional department through training, accountability, and effective leadership."

/>








<PrioritiesCard

title="Public Service"

description="Maintaining trust through transparency, communication, and dedication to protecting communities."

/>






</div>


</section>









{/* QUOTE */}



<section className="
mt-14
border-l-4
border-[#F2C94C]
bg-[#F5F8FB]
p-8
">


<p className="
text-2xl
italic
text-gray-700
">

"Leadership is built through service, preparation, and the commitment to protect those who depend on us. The Department of Homeland Security will continue to stand ready."

</p>




<p className="
mt-5
font-black
text-[#003B6F]
">

— Secretary WiIl404

</p>



</section>









{/* OFFICE */}



<section className="
mt-14
border-t
pt-10
">


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Office of the Secretary

</h2>




<div className="
grid
md:grid-cols-3
gap-6
mt-6
">





<InfoBox

title="Department"

value="Department of Homeland Security"

/>






<InfoBox

title="Location"

value="Washington, D.C."

/>






<InfoBox

title="Role"

value="Executive Leadership Office"

/>






</div>



</section>









</div>


</div>


</section>



</main>


);


}









function Stat({

title,

value

}:{

title:string;

value:string;

}){


return (

<div className="
bg-[#F5F8FB]
border
p-6
">


<p className="
text-xs
uppercase
tracking-widest
font-bold
text-gray-500
">

{title}

</p>



<p className="
mt-3
text-2xl
font-black
text-[#003B6F]
">

{value}

</p>


</div>


);


}









function TimelineItem({

title,

description

}:{

title:string;

description:string;

}){


return (

<div className="
relative
border-l-4
border-[#003B6F]
pl-6
">


<h3 className="
text-xl
font-black
text-[#003B6F]
">

{title}

</h3>




<p className="
mt-2
text-gray-600
leading-relaxed
">

{description}

</p>



</div>


);


}









function PrioritiesCard({

title,

description

}:{

title:string;

description:string;

}){


return (

<div className="
border
bg-[#F5F8FB]
p-7
shadow-sm
">


<h3 className="
text-xl
font-black
text-[#003B6F]
">

{title}

</h3>




<p className="
mt-3
text-gray-600
leading-relaxed
">

{description}

</p>


</div>


);


}









function InfoBox({

title,

value

}:{

title:string;

value:string;

}){


return (

<div className="
border
bg-white
p-6
">


<p className="
text-xs
uppercase
font-bold
tracking-widest
text-gray-500
">

{title}

</p>



<p className="
mt-3
font-black
text-[#003B6F]
">

{value}

</p>



</div>


);


}
