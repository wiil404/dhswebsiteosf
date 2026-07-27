"use client";

import { useRef } from "react";
import EmployeeCard from "./EmployeeCard";


export default function EmployeePagination({

employees

}:{

employees:any[];

}){


const slider = useRef<HTMLDivElement>(null);



function move(amount:number){

slider.current?.scrollBy({

left:amount,

behavior:"smooth"

});

}



return (

<div>


<div

ref={slider}

className="
flex
gap-6
overflow-x-auto
scroll-smooth
pb-4
"

>


{

employees.map((employee:any)=>(


<div

key={employee.id}

className="
min-w-[350px]
max-w-[350px]
flex-shrink-0
"

>


<EmployeeCard

employee={employee}

/>


</div>


))


}


</div>





{

employees.length > 3 && (

<div className="
flex
justify-center
gap-5
mt-6
">


<button

onClick={()=>move(-400)}

className="
bg-[#003B6F]
text-white
px-6
py-3
font-black
hover:bg-[#005AA7]
transition
"

>

←

</button>




<button

onClick={()=>move(400)}

className="
bg-[#003B6F]
text-white
px-6
py-3
font-black
hover:bg-[#005AA7]
transition
"

>

→

</button>



</div>

)

}



</div>

);


}
