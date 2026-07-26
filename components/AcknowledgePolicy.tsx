"use client";

import {useState} from "react";



export default function AcknowledgePolicy({

policyId,

alreadyAcknowledged

}:{

policyId:string;

alreadyAcknowledged:boolean;

}){


const [loading,setLoading]=useState(false);

const [done,setDone]=useState(alreadyAcknowledged);




async function acknowledge(){


setLoading(true);



const response =
await fetch(
"/api/policies/acknowledge",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

policyId

})

}

);



if(response.ok){

setDone(true);

}



setLoading(false);


}





if(done){

return (

<div className="
bg-green-50
border
border-green-300
p-5
font-bold
text-green-800
">

✓ Policy Acknowledged

</div>

);

}




return (

<button

onClick={acknowledge}

disabled={loading}

className="
bg-[#003B6F]
text-white
px-6
py-3
font-black
"

>

{

loading

?

"Recording..."

:

"I Acknowledge This Policy"

}

</button>

);


}
