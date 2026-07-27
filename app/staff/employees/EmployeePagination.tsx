"use client";

import { useRef } from "react";
import EmployeeCard from "./EmployeeCard";


export default function EmployeePagination({

employees

}:{

employees:any[];

}){


const slider = useRef<HTMLDivElement>(null);



function move(direction:number){

slider.current?.scrollBy({

left: direction,

behavior:"smooth"

});

}



return (

<div>


<div

ref={slider}

className="
flex
gap-8
overflow-x-auto
scroll-smooth
pb-6
snap-x
snap-mandatory
"

>


{

employees.map((employee:any)=>(


<div

key={employee.id}

className="
w-[380px]
flex-none
snap-start
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
gap-6
mt-8
">


<button

onClick={()=>move(-450)}

className="
bg-[#003B6F]
text-white
px-8
py-3
font-black
hover:bg-[#005AA7]
transition
"

>

← Previous

</button>




<button

onClick={()=>move(450)}

className="
bg-[#003B6F]
text-white
px-8
py-3
font-black
hover:bg-[#005AA7]
transition
"

>

Next →

</button>



</div>

)

}



</div>

);


}
