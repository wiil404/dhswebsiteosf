"use client";

import {
    use,
    useEffect,
    useState
} from "react";

import {
    useRouter
} from "next/navigation";



export default function DemotePage({

params

}:{

params:Promise<{
    id:string
}>

}){


const {id} = use(params);


const router = useRouter();



const [employee,setEmployee] =
useState<any>(null);


const [positions,setPositions] =
useState<any[]>([]);


const [selectedPosition,setSelectedPosition] =
useState("");


const [reason,setReason] =
useState("");


const [loading,setLoading] =
useState(false);





useEffect(()=>{

load();

},[]);







async function load(){


try{


const employeeResponse =
await fetch(

`/api/staff/employees/${id}`,

{
cache:"no-store"
}

);



const employeeData =
await employeeResponse.json();

console.log(
"POSITION DATA:",
employeeData.positions
);

console.log(
"DIVISION DATA:",
employeeData.divisions
);

console.log(
"DEMOTE EMPLOYEE:",
employeeData
);



setEmployee(employeeData);







const positionResponse =
await fetch(

"/api/staff/positions",

{
cache:"no-store"
}

);



const positionData =
await positionResponse.json();



setPositions(
positionData
);



}

catch(error){

console.error(
"DEMOTE LOAD ERROR:",
error
);

}


}









async function demote(){


if(!selectedPosition){

alert(
"Please select a new position"
);

return;

}



setLoading(true);



const response =
await fetch(

"/api/staff/employees/demote",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

employee_id:id,

position_id:selectedPosition,

reason

})})



const data =
await response.json();



if(data.error){

alert(data.error);

setLoading(false);

return;

}



router.push(

`/staff/employees/${id}`

);


}








if(!employee){

return (

<main className="p-12">

Loading employee...

</main>

);

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

Demote Employee

</h1>




<div className="
mt-8
bg-white
border
rounded-lg
shadow
p-8
">



<p className="
text-gray-500
">

Employee

</p>


<h2 className="
text-2xl
font-bold
">

{employee.roblox_username}

</h2>





<div className="
mt-6
">

<p className="text-gray-500">

Current Position

</p>


<p className="
font-bold
text-lg
">

{
Array.isArray(employee.positions)
?
employee.positions[0]?.title
:
employee.positions?.title
||
"No Position"
}

</p>


</div>






<label className="
block
mt-8
font-semibold
">

New Position

</label>




<select

className="
border
w-full
p-3
rounded
mt-2
"

value={selectedPosition}

onChange={(e)=>
setSelectedPosition(e.target.value)
}

>


<option value="">

Select Position

</option>



{

positions.map((position)=>(


<option

key={position.id}

value={position.id}

>

{position.title}

</option>


))

}



</select>







<label className="
block
mt-6
font-semibold
">

Reason For Demotion

</label>



<textarea

className="
border
w-full
p-3
rounded
mt-2
"

rows={5}

value={reason}

onChange={(e)=>
setReason(e.target.value)
}

placeholder="
Enter justification for this demotion...
"

/>







<button

onClick={demote}

disabled={loading}

className="
mt-8
bg-red-600
text-white
px-6
py-3
rounded
font-bold
"

>

{

loading
?
"Processing..."
:
"Confirm Demotion"

}

</button>




</div>


</main>

);


}