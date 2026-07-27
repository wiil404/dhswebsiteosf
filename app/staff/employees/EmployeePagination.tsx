"use client";

import { useRef } from "react";
import EmployeeCard from "./EmployeeCard";


export default function EmployeePagination({

employees

}:{

employees:any[];

}){


const sliderRef = useRef<HTMLDivElement>(null);



function scroll(direction:number){


sliderRef.current?.scrollBy({

left: direction,

behavior:"smooth"

});


}



return (

<div>


<div

ref={sliderRef}

className="
flex
overflow-x-auto
gap-6
scroll-smooth
snap-x
snap-mandatory
pb-5
scrollbar-thin
"

>



{

employees.map((employee:any)=>(


<div

key={employee.id}

className="
min-w-[85%]
sm:min-w-[45%]
lg:min-w-[30%]
xl:min-w-[23%]
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

employees.length > 4 && (

<div className="
flex
justify-center
gap-5
mt-8
">


<button

onClick={()=>scroll(-500)}

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

onClick={()=>scroll(500)}

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
