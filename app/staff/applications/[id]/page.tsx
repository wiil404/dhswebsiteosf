"use client";


import {useEffect,useState} from "react";
import {useParams,useRouter} from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";



export default function ApplicationReviewPage(){



const params = useParams();

const router = useRouter();


const id = String(params.id);



const [application,setApplication] = useState<any>(null);

const [loading,setLoading] = useState(true);

const [status,setStatus] = useState("");

const [notes,setNotes] = useState("");

const [saving,setSaving] = useState(false);







async function loadApplication(){


const response = await fetch(

`/api/staff/applications/${id}`

);



const data = await response.json();



if(!response.ok){

alert(
data.error || "Unable to load application"
);

return;

}



setApplication(data);

setStatus(
data.status || "Pending Review"
);

setNotes(
data.internal_notes || ""
);


setLoading(false);


}








useEffect(()=>{


loadApplication();


},[]);









async function updateApplication(){


setSaving(true);



const response = await fetch(

`/api/staff/applications/${id}`,

{

method:"PATCH",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

status,

internal_notes:notes

})


}

);





const data = await response.json();





if(!response.ok){


alert(
data.error || "Failed updating application"
);


setSaving(false);

return;


}





alert(
"Application updated"
);



router.refresh();


loadApplication();


setSaving(false);


}









if(loading){


return (

<main className="
max-w-7xl
mx-auto
px-6
py-16
">

Loading application...

</main>

);


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





<div className="
h-3
bg-[#F2C94C]
"/>








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

Review Application

</h1>




<p

className="
mt-4
text-xl
text-gray-200
"

>

{

application.application_number

}

</p>


</section>









<section

className="
p-10
md:p-14
space-y-12
"

>










{/* Applicant Information */}



<div>


<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Applicant Information

</h2>





<div

className="
grid
md:grid-cols-2
gap-6
mt-6
"

>


<Info

label="Roblox Username"

value={application.roblox_username}

/>


<Info

label="Roblox User ID"

value={application.roblox_user_id}

/>


<Info

label="Discord Username"

value={application.discord_username}

/>


<Info

label="Email"

value={application.email}

/>



</div>


</div>









{/* Division */}


<div>


<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Division

</h2>




<div

className="
mt-5
bg-gray-50
border
p-6
"

>


<p className="
text-xl
font-bold
">

{

application.divisions?.name

}


</p>


</div>



</div>









{/* Questions */}

<div>

<h2
className="
text-3xl
font-bold
text-[#003B6F]
"
>
Division Assessment
</h2>


<div
className="
space-y-6
mt-6
"
>

{
application.answers?.map((answer:any)=>(

<div
key={answer.id}
className="
border
p-6
"
>

<p
className="
font-bold
text-gray-900
"
>
{answer.application_questions?.question || "Question unavailable"}
</p>


<p
className="
mt-3
text-gray-700
"
>
{answer.answer || "No answer provided"}
</p>


</div>

))
}

</div>

</div>








{/* Review Controls */}



<div


className="
border-t
pt-10
"


>


<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Application Decision

</h2>







<select

className="
border
p-4
w-full
mt-6
"

value={status}

onChange={e=>
setStatus(e.target.value)
}

>


<option>
Pending Review
</option>


<option>
Under Review
</option>


<option>
Interview Required
</option>


<option>
Accepted
</option>


<option>
Denied
</option>



</select>









<textarea

className="
border
p-4
w-full
mt-6
"

rows={5}

placeholder="Internal notes"

value={notes}

onChange={e=>
setNotes(e.target.value)
}

/>








<button

onClick={updateApplication}

disabled={saving}

className="
mt-6
bg-[#003B6F]
text-white
px-8
py-4
font-bold
hover:bg-[#002B52]
transition
"

>

{

saving

?

"Saving..."

:

"Save Decision"

}

</button>




</div>









{/* History */}



<div>


<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Review History

</h2>




<div className="
mt-6
space-y-4
">


{

application.application_reviews?.length > 0

?

application.application_reviews.map((review:any)=>(


<div

key={review.id}

className="
border
bg-gray-50
p-5
"

>


<p className="font-bold">

{review.action}

</p>


<p className="text-gray-600">

{review.notes}

</p>


<p className="text-sm text-gray-500 mt-2">

{

new Date(
review.created_at
)
.toLocaleDateString()

}

</p>


</div>


))

:

<p className="text-gray-500">

No review history.

</p>


}



</div>


</div>









</section>









</div>






</main>


);

}









function Info({

label,

value

}:{

label:string;

value:any;

}){


return (

<div

className="
border
p-5
"

>


<p className="
text-sm
text-gray-500
uppercase
font-bold
">

{label}

</p>


<p className="
mt-2
font-bold
text-gray-900
"

>

{

value ||

"Not provided"

}

</p>


</div>

);


}
