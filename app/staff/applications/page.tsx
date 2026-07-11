"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";



export default function StaffApplicationsPage(){



const [applications,setApplications] = useState<any[]>([]);

const [loading,setLoading] = useState(true);

const [error,setError] = useState("");






async function loadApplications(){


try{


const response = await fetch(
    "/api/staff/applications"
);



const data = await response.json();




if(!response.ok){

setError(
    data.error || "Unable to load applications"
);

setLoading(false);

return;

}





setApplications(data);



}

catch(err){


console.error(err);


setError(
    "Failed loading applications"
);


}



setLoading(false);


}








useEffect(()=>{


loadApplications();


},[]);









function statusStyle(status:string){



switch(status){


case "Accepted":

return "bg-green-100 text-green-700";



case "Denied":

return "bg-red-100 text-red-700";



case "Under Review":

return "bg-blue-100 text-blue-700";



case "Interview Required":

return "bg-yellow-100 text-yellow-700";



default:

return "bg-gray-100 text-gray-700";


}



}









return (

<main

className="
max-w-7xl
mx-auto
px-6
py-16
"

>


<Breadcrumb />







<div

className="
bg-white
shadow-2xl
border
border-gray-200
overflow-hidden
"

>






<div

className="
h-3
bg-[#F2C94C]
"

/>









<section

className="
bg-[#003B6F]
text-white
p-10
md:p-14
"

>



<p

className="
uppercase
tracking-[0.3em]
text-sm
font-bold
text-[#F2C94C]
"

>

Department of Homeland Security

</p>





<h1

className="
mt-5
text-5xl
font-black
"

>

Application Management

</h1>






<p

className="
mt-5
text-xl
text-gray-200
max-w-4xl
"

>

Review and manage recruitment applications submitted to your authorised DHS divisions.

</p>



</section>









<section

className="
p-10
md:p-14
"

>





{

loading && (


<p className="text-gray-600">

Loading applications...

</p>


)

}








{

error && (


<div

className="
border
border-red-300
bg-red-50
text-red-700
p-5
font-semibold
"

>

{error}

</div>


)

}









{

!loading && !error && applications.length === 0 && (


<div

className="
text-center
py-16
text-gray-500
"

>

No applications available.

</div>


)

}









<div

className="
space-y-6
"

>


{

applications.map((application)=>(



<article

key={application.id}

className="
border
border-gray-200
shadow-md
hover:shadow-xl
transition
bg-white
"

>



<div

className="
border-l-4
border-[#003B6F]
p-7
"

>







<div

className="
flex
justify-between
items-start
gap-6
"

>





<div>



<p

className="
text-sm
uppercase
font-bold
tracking-wider
text-[#003B6F]
"

>

Application

</p>




<h2

className="
text-3xl
font-bold
text-gray-900
mt-2
"

>

{

application.application_number ||

"DHS Application"

}

</h2>





</div>







<span

className={`
px-4
py-2
rounded-full
font-bold
text-sm
${statusStyle(application.status)}
`}

>

{

application.status ||

"Pending Review"

}

</span>






</div>









<div

className="
grid
md:grid-cols-3
gap-6
mt-8
"

>



<div>

<p className="text-sm text-gray-500">

Applicant

</p>

<p className="font-bold text-gray-900">

{

application.roblox_username

}

</p>

</div>








<div>

<p className="text-sm text-gray-500">

Division

</p>


<p className="font-bold text-gray-900">

{

application.divisions?.name ||

"Unknown"

}

</p>


</div>








<div>

<p className="text-sm text-gray-500">

Submitted

</p>


<p className="font-bold text-gray-900">

{

new Date(
application.created_at
)
.toLocaleDateString()

}

</p>


</div>






</div>









<div

className="
mt-8
flex
justify-end
"

>


<Link

href={`/staff/applications/${application.id}`}

className="
bg-[#003B6F]
text-white
px-7
py-3
font-bold
hover:bg-[#002B52]
transition
"

>

Review Application →

</Link>



</div>








</div>





</article>



))

}



</div>







</section>









</div>






</main>


);


}