"use client";


import {useState} from "react";
import Breadcrumb from "@/components/Breadcrumb";



export default function ApplicationsPage(){


const [number,setNumber]=useState("");

const [username,setUsername]=useState("");

const [result,setResult]=useState<any>(null);

const [error,setError]=useState("");




async function lookup(){


setError("");

setResult(null);



const response =
await fetch(

"/api/recruitment/applications/lookup",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

application_number:number,

roblox_username:username

})

}

);





const data =
await response.json();





if(!response.ok){

setError(
data.error
);

return;

}





setResult(
data.application
);


}









return (

<main className="
max-w-7xl
mx-auto
px-6
py-16
">


<Breadcrumb />



<div className="
bg-white
shadow-xl
border
p-10
">


<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Application Status

</h1>




<p className="
mt-4
text-gray-600
">

Enter your application reference number and Roblox username to view your application.

</p>





<input

className="border p-4 w-full mt-8"

placeholder="Application Reference Number"

value={number}

onChange={
e=>setNumber(e.target.value)
}

/>





<input

className="border p-4 w-full mt-4"

placeholder="Roblox Username"

value={username}

onChange={
e=>setUsername(e.target.value)
}

/>






<button

onClick={lookup}

className="
mt-6
bg-[#003B6F]
text-white
px-8
py-3
font-bold
"

>

View Application

</button>






{
error && (

<p className="
mt-5
text-red-600
font-bold
">

{error}

</p>

)

}








{
result && (

<div className="
mt-10
border
p-6
bg-gray-50
">


<h2 className="
text-2xl
font-bold
">

Application Found

</h2>




<p className="mt-4">

<strong>Status:</strong>{" "}

{result.status}

</p>





<p>

<strong>Division:</strong>{" "}

{result.divisions?.name}

</p>





<p>

<strong>Reference:</strong>{" "}

{result.application_number}

</p>



</div>

)

}



</div>


</main>


);


}
