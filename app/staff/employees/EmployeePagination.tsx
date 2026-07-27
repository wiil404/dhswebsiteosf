"use client";

import { useState } from "react";
import EmployeeCard from "./EmployeeCard";


export default function EmployeePagination({

employees

}:{

employees:any[];

}){


const [page,setPage] = useState(0);


const perPage = 9;


const totalPages = Math.ceil(
employees.length / perPage
);


const currentEmployees = employees.slice(

page * perPage,

(page + 1) * perPage

);



return (

<div>


<div className="
grid
md:grid-cols-3
gap-6
">


{

currentEmployees.map((employee:any)=>(


<EmployeeCard

key={employee.id}

employee={employee}

/>


))


}


</div>





{

totalPages > 1 && (

<div className="
flex
justify-between
items-center
mt-8
">


<button

disabled={page===0}

onClick={()=>setPage(page-1)}

className="
px-6
py-3
bg-[#003B6F]
text-white
font-black
disabled:opacity-40
hover:bg-[#005AA7]
transition
"

>

← Previous

</button>




<p className="
font-bold
text-[#003B6F]
">

Page {page+1} / {totalPages}

</p>




<button

disabled={page===totalPages-1}

onClick={()=>setPage(page+1)}

className="
px-6
py-3
bg-[#003B6F]
text-white
font-black
disabled:opacity-40
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
