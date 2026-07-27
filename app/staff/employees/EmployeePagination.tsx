"use client";

import { useRef } from "react";
import EmployeeCard from "./EmployeeCard";


export default function EmployeePagination({

employees

}:{

employees:any[];

}){


const scrollRef = useRef<HTMLDivElement>(null);


const move = (amount:number)=>{

scrollRef.current?.scrollBy({

left: amount,

behavior:"smooth"

});

};



return (

<div>


<div

ref={scrollRef}

className="
flex
gap-6
overflow-x-auto
scroll-smooth
pb-5
snap-x
snap-mandatory
"

>


{

employees.map((employee:any)=>(


<div

key={employee.id}

className="
w-[320px]
flex-shrink-0
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

onClick={()=>move(-700)}

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

onClick={()=>move(700)}

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
