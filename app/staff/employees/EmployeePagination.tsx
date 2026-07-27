"use client";

import { useRef } from "react";
import EmployeeCard from "./EmployeeCard";


export default function EmployeePagination({

employees

}:{

employees:any[];

}){


const container = useRef<HTMLDivElement>(null);


function scroll(direction:number){


container.current?.scrollBy({

left: direction,

behavior:"smooth"

});


}



return (

<div>


<div

ref={container}

className="
flex
overflow-x-auto
scroll-smooth
snap-x
snap-mandatory
gap-6
pb-4
scrollbar-thin
"

>


{

employees.map((employee:any)=>(


<div

key={employee.id}

className="
min-w-[90%]
md:min-w-[48%]
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

employees.length > 2 && (

<div className="
flex
justify-center
gap-4
mt-6
">


<button

onClick={()=>scroll(-350)}

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

onClick={()=>scroll(350)}

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
