"use client";

import EmployeeCard from "./EmployeeCard";
import { useRef } from "react";


export default function EmployeePagination({

division,

employees

}:{

division:string;

employees:any[];

}){


const container = useRef<HTMLDivElement>(null);


const scroll = (amount:number)=>{

container.current?.scrollBy({

left: amount,

behavior:"smooth"

});

};



const perPage = 10;


const pages = [];


for(let i = 0; i < employees.length; i += perPage){

pages.push(

employees.slice(
i,
i + perPage
)

);

}



return (

<div>


<div

ref={container}

className="
flex
overflow-hidden
scroll-smooth
"

>



{

pages.map((page,index)=>(


<div

key={index}

className="
min-w-full
grid
md:grid-cols-2
gap-6
"

>


{

page.map((employee:any)=>(


<EmployeeCard

key={employee.id}

employee={employee}

/>


))


}


</div>


))


}



</div>





{

pages.length > 1 && (


<div className="
flex
justify-center
gap-4
mt-8
">


<button

onClick={()=>scroll(-window.innerWidth)}

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

← Previous

</button>





<button

onClick={()=>scroll(window.innerWidth)}

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

Next →

</button>


</div>


)

}



</div>


);


}
