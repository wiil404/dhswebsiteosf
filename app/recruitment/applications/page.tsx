"use client";


import {useState} from "react";
import Breadcrumb from "@/components/Breadcrumb";



export default function ApplicationsPage(){


const [applicationNumber,setApplicationNumber]=useState("");

const [username,setUsername]=useState("");

const [application,setApplication]=useState<any>(null);

const [error,setError]=useState("");

const [loading,setLoading]=useState(false);







async function lookup(){


setLoading(true);

setError("");



const response = await fetch(

`/api/recruitment/applications?number=${applicationNumber}&username=${username}`

);



const data = await response.json();




if(!response.ok){

setApplication(null);

setError(
data.error || "Application not found"
);

setLoading(false);

return;

}




setApplication(data);

setLoading(false);


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
"

>

<h1

className="
text-5xl
font-black
"

>

Application Status

</h1>


<p className="
mt-4
text-gray-200
text-lg
">

Enter your application details to view your recruitment progress.

</p>


</section>









<section

className="
p-10
"

>



<input

className="
border
p-4
w-full
"

placeholder="Application Number"

value={applicationNumber}

onChange={
e=>setApplicationNumber(e.target.value)
}

/>





<input

className="
border
p-4
w-full
mt-5
"

placeholder="Roblox Username"

value={username}

onChange={
e=>setUsername(e.target.value)
}

/>







<button

onClick={lookup}

disabled={loading}

className="
mt-6
bg-[#003B6F]
text-white
px-8
py-4
font-bold
"

>

{
loading
?
"Searching..."
:
"Check Application Status →"
}

</button>






{
error && (

<p className="
mt-6
text-red-600
font-bold
">

{error}

</p>

)

}









{
application && (

<div

className="
mt-10
border
p-8
bg-gray-50
"

>


<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Application Found

</h2>




<p className="mt-5">

<strong>
Applicant:
</strong>

{" "}

{application.roblox_username}

</p>





<p className="mt-3">

<strong>
Division:
</strong>

{" "}

{application.divisions?.name}

</p>





<p className="mt-3">

<strong>
Status:
</strong>

{" "}

<span className="font-bold">

{application.status}

</span>

</p>





<p className="mt-3">

<strong>
Submitted:
</strong>

{" "}

{
new Date(
application.created_at
)
.toLocaleDateString()
}

</p>




</div>

)

}




</section>






</div>






</main>

);


}
