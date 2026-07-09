"use client";

import {useEffect,useState} from "react";


export default function Organisation(){


const [divisions,setDivisions]=useState<any[]>([]);


const [position,setPosition]=useState({

    title:"",
    description:"",
    division_id:""

});






async function load(){


const response = await fetch(
"/api/staff/organisation/divisions"
);


const data = await response.json();


setDivisions(data);


}



useEffect(()=>{

load();

},[]);







async function createPosition(){



await fetch(
"/api/staff/organisation/positions",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(position)

}

);




setPosition({

title:"",
description:"",
division_id:""

});



load();



}









async function deletePosition(id:string){



if(
!confirm(
"Delete this position?"
)
){

return;

}




await fetch(
"/api/staff/organisation/positions",
{

method:"DELETE",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id

})

}

);



load();


}










return (

<main className="
max-w-7xl
mx-auto
px-6
py-12
">



<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Organisation Management

</h1>







<section className="
mt-10
border
rounded-lg
p-6
bg-white
">


<h2 className="
text-2xl
font-bold
">

Create Position

</h2>




<select

className="
border
p-3
w-full
mt-4
"

value={
position.division_id
}

onChange={
e=>

setPosition({

...position,

division_id:e.target.value

})

}

>


<option value="">

Select Division

</option>



{
divisions.map(
division=>(


<option

key={division.id}

value={division.id}

>

{division.name}

</option>


)

)

}


</select>







<input

className="
border
p-3
w-full
mt-4
"

placeholder="Position Title"

value={
position.title
}

onChange={
e=>

setPosition({

...position,

title:e.target.value

})

}

/>








<textarea

className="
border
p-3
w-full
mt-4
"

placeholder="Position Description"

value={
position.description
}

onChange={
e=>

setPosition({

...position,

description:e.target.value

})

}

/>







<button

onClick={createPosition}

className="
mt-4
bg-[#003B6F]
text-white
px-5
py-3
rounded
"

>

Create Position

</button>


</section>









<section className="mt-12">


<h2 className="
text-3xl
font-bold
">

Department Structure

</h2>





<div className="
mt-6
space-y-8
">


{
divisions.map(
division=>(


<div

key={division.id}

className="
border
rounded-lg
p-6
bg-white
"

>


<h3 className="
text-2xl
font-bold
text-[#003B6F]
">

{division.name}

</h3>





<div className="
mt-5
space-y-3
">


{
division.positions?.length

?


division.positions.map(
(position:any)=>(



<div

key={position.id}

className="
flex
justify-between
items-center
bg-gray-50
p-4
rounded
"

>


<div>


<p className="
font-bold
">

{position.title}

</p>



<p className="
text-sm
text-gray-600
">

{position.description}

</p>


</div>




<button

onClick={()=>
deletePosition(
position.id
)
}

className="
bg-red-600
text-white
px-3
py-2
rounded
"

>

Delete

</button>



</div>


)

)


:


<p className="
text-gray-500
">

No positions created.

</p>


}



</div>



</div>


)

)

}



</div>


</section>





</main>

);


}