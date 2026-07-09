"use client";

import {useEffect,useState} from "react";



export default function Organisation(){



const [divisions,setDivisions] =
useState<any[]>([]);





const [position,setPosition] =
useState({

title:"",
description:"",
division_id:""

});









async function load(){


const response = await fetch(
"/api/staff/organisation/divisions"
);


const data =
await response.json();



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

<main

className="
max-w-7xl
mx-auto
px-6
py-16
"

>



<div

className="
bg-white
shadow-xl
border
border-gray-200
p-8
md:p-12
"

>








{/* HEADER */}


<div

className="
border-b
border-gray-200
pb-8
"

>


<h1

className="
text-4xl
font-bold
text-[#003B6F]
"

>

Organisation Management

</h1>





<p

className="
mt-3
text-gray-600
"

>

Manage DHS divisions, positions, and organisational structure.

</p>


</div>









{/* CREATE POSITION */}


<section

className="
mt-10
border
border-gray-200
p-7
"

>



<h2

className="
text-2xl
font-bold
text-[#003B6F]
"

>

Create Position

</h2>






<div

className="
mt-6
space-y-4
"

>





<select

className="
w-full
border
border-gray-300
p-4
focus:border-[#003B6F]
outline-none
"

value={
position.division_id
}

onChange={e=>

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
w-full
border
border-gray-300
p-4
focus:border-[#003B6F]
outline-none
"

placeholder="Position Title"

value={
position.title
}

onChange={e=>

setPosition({

...position,

title:e.target.value

})

}

/>








<textarea

className="
w-full
border
border-gray-300
p-4
focus:border-[#003B6F]
outline-none
"

rows={4}

placeholder="Position Description"

value={
position.description
}

onChange={e=>

setPosition({

...position,

description:e.target.value

})

}

/>







<button

onClick={createPosition}

className="
bg-[#003B6F]
text-white
px-7
py-3
font-bold
hover:bg-[#00284d]
transition
"

>

Create Position

</button>





</div>



</section>









{/* STRUCTURE */}


<section

className="
mt-14
"

>



<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Department Structure

</h2>








<div

className="
mt-8
space-y-8
"

>





{

divisions.map(

division=>(


<div

key={division.id}

className="
border
border-gray-200
p-7
shadow-sm
"

>





<div

className="
border-b
border-gray-100
pb-4
"

>


<h3

className="
text-2xl
font-bold
text-[#003B6F]
"

>

{division.name}

</h3>


</div>









<div

className="
mt-6
space-y-4
"

>






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
bg-[#F5F8FB]
border
border-[#D9E4EF]
p-5
"

>



<div>


<p

className="
font-bold
text-gray-900
"

>

{position.title}

</p>





<p

className="
text-sm
text-gray-600
mt-1
"

>

{position.description}

</p>



</div>








<button

onClick={()=>deletePosition(position.id)}

className="
bg-red-600
text-white
px-4
py-2
font-semibold
hover:bg-red-700
transition
"

>

Delete

</button>






</div>


)





:
(
<p

className="
text-gray-500
"

>

No positions created.

</p>


)
}







</div>






</div>



)


)

}





</div>






</section>






</div>





</main>


);


}
