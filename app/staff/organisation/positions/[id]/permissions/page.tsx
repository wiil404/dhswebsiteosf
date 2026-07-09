"use client";

import {useEffect,useState} from "react";
import {useParams,useRouter} from "next/navigation";



export default function PositionPermissions(){


const params = useParams();

const router = useRouter();


const id =
params.id as string;



const [permissions,setPermissions]=useState<string[]>([]);

const [available,setAvailable]=useState<any[]>([]);





useEffect(()=>{

load();

},[]);





async function load(){



const all =
await fetch(
"/api/staff/permissions/all"
);


const allData =
await all.json();



setAvailable(allData);





const current =
await fetch(
`/api/staff/organisation/positions/permissions?id=${id}`
);



const currentData =
await current.json();




setPermissions(

currentData.map(
(x:any)=>x.permission_id
)

);



}







function toggle(id:string){


setPermissions(prev=>

prev.includes(id)

?

prev.filter(
x=>x!==id
)

:

[
...prev,
id
]

);


}








async function save(){



await fetch(
"/api/staff/organisation/positions/permissions",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

position_id:id,

permissions

})

}

);



router.back();



}







return (

<main className="
max-w-4xl
mx-auto
px-6
py-12
">


<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Manage Position Permissions

</h1>





<div className="
mt-8
space-y-4
">


{
available.map(
(permission)=>(


<label

key={permission.id}

className="
flex
gap-4
border
rounded-lg
p-5
"

>


<input

type="checkbox"

checked={
permissions.includes(
permission.id
)
}

onChange={()=>toggle(permission.id)}

/>




<div>

<h3 className="font-bold">

{permission.name}

</h3>


<p className="text-gray-600">

{permission.description}

</p>


</div>



</label>


)

)

}


</div>





<button

onClick={save}

className="
mt-8
bg-[#003B6F]
text-white
px-6
py-3
rounded
"

>

Save Permissions

</button>



</main>

);


}