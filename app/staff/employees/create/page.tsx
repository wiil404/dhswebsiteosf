"use client";


import {useState,useEffect} from "react";
import {useRouter} from "next/navigation";



export default function CreateEmployee(){


const router = useRouter();



const [divisions,setDivisions]=useState<any[]>([]);


const [form,setForm]=useState({

    roblox_username:"",

    roblox_user_id:"",

    email:"",

    division_id:"",

    position_id:"",

    status:"Active",

    hire_date:"",

    notes:""

});








useEffect(()=>{


async function load(){


const res = await fetch(
"/api/staff/organisation/divisions"
);


const data = await res.json();


setDivisions(data);


}


load();


},[]);









async function submit(){


const response = await fetch(

"/api/staff/employees",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(form)

}

);





const result = await response.json();





if(!response.ok){


alert(
result.error || "Failed creating employee"
);


return;


}




router.push(
"/staff/employees"
);


}









return (

<main

className="
relative
min-h-screen
py-16
"

>





{/* BACKGROUND */}

<div

className="
absolute
inset-0
-z-10
bg-[#003B6F]
overflow-hidden
"

>


<div

className="
absolute
inset-0
opacity-10
bg-[linear-gradient(45deg,transparent_45%,white_46%,transparent_47%),linear-gradient(-45deg,transparent_45%,white_46%,transparent_47%)]
bg-[length:120px_120px]
"

/>


</div>









<section

className="
max-w-4xl
mx-auto
px-6
"

>


<div

className="
bg-white
shadow-2xl
border
border-gray-200
"

>


{/* GOLD BAR */}

<div

className="
h-2
bg-[#F2C94C]
"

/>






<div

className="
p-8
md:p-12
"

>






<div

className="
border-b
pb-8
"

>


<p

className="
uppercase
tracking-[0.2em]
text-sm
font-bold
text-[#003B6F]
"

>

Department of Homeland Security

</p>




<h1

className="
mt-4
text-4xl
font-bold
text-[#003B6F]
"

>

Create Employee

</h1>



<p

className="
mt-3
text-gray-600
"

>

Add a new member of personnel to the DHS employee directory.

</p>



</div>









{/* FORM */}



<div

className="
mt-10
space-y-5
"

>








<FormInput

label="Roblox Username"

placeholder="Enter Roblox username"

onChange={(value)=>

setForm({

...form,

roblox_username:value

})

}

/>







<FormInput

label="Roblox User ID"

placeholder="Enter Roblox user ID"

onChange={(value)=>

setForm({

...form,

roblox_user_id:value

})

}

/>








<FormInput

label="DHS Email Address"

placeholder="employee@dhs.gov"

onChange={(value)=>

setForm({

...form,

email:value

})

}

/>









<div>


<label

className="
block
font-bold
text-gray-700
mb-2
"

>

Division

</label>



<select

className="
border
border-gray-300
p-3
w-full
focus:border-[#003B6F]
outline-none
"

value={form.division_id}

onChange={(e)=>

setForm({

...form,

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



</div>









<div>


<label

className="
block
font-bold
text-gray-700
mb-2
"

>

Status

</label>



<select

className="
border
border-gray-300
p-3
w-full
"

value={form.status}

onChange={(e)=>

setForm({

...form,

status:e.target.value

})

}

>


<option>

Active

</option>


<option>

Inactive

</option>


<option>

Leave

</option>


</select>


</div>









<div>


<label

className="
block
font-bold
text-gray-700
mb-2
"

>

Notes

</label>




<textarea

className="
border
border-gray-300
p-3
w-full
min-h-[120px]
"

placeholder="Additional employee information..."

value={form.notes}

onChange={(e)=>

setForm({

...form,

notes:e.target.value

})

}

/>



</div>










<button

onClick={submit}

className="
mt-6
bg-[#003B6F]
text-white
px-8
py-3
font-bold
hover:bg-[#00284d]
transition
"

>

Create Employee

</button>





</div>









</div>

</div>


</section>







</main>


);


}









function FormInput({

label,

placeholder,

onChange

}:{

label:string;

placeholder:string;

onChange:(value:string)=>void;

}){


return (

<div>


<label

className="
block
font-bold
text-gray-700
mb-2
"

>

{label}

</label>



<input

className="
border
border-gray-300
p-3
w-full
focus:outline-none
focus:border-[#003B6F]
"

placeholder={placeholder}

onChange={(e)=>

onChange(
e.target.value
)

}

/>


</div>


);


}
