"use client";


import {useState,useEffect} from "react";
import {useRouter} from "next/navigation";



export default function CreateEmployee(){


const router = useRouter();



const [divisions,setDivisions]=useState<any[]>([]);

const [positions,setPositions]=useState<any[]>([]);



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


const res =
await fetch(
"/api/staff/organisation/divisions"
);


setDivisions(
await res.json()
);


}



load();


},[]);








async function submit(){


    const response =
        await fetch(
            "/api/staff/employees",
            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(form)

            }

        );




    const result =
        await response.json();




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

<main className="
max-w-3xl
mx-auto
px-6
py-12
">


<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Create Employee

</h1>




<input

className="
border
p-3
w-full
mt-6
"

placeholder="Roblox Username"

onChange={
e=>

setForm({

...form,

roblox_username:e.target.value

})

}

/>






<input

className="
border
p-3
w-full
mt-4
"

placeholder="Roblox User ID"

onChange={
e=>

setForm({

...form,

roblox_user_id:e.target.value

})

}

/>

<input

className="
border
p-3
w-full
mt-4
"

placeholder="DHS Email Address"

onChange={

e=>

setForm({

...form,

email:e.target.value

})

}

/>





<select

className="
border
p-3
w-full
mt-4
"

onChange={
e=>

setForm({

...form,

division_id:e.target.value

})

}

>


<option>

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






<textarea

className="
border
p-3
w-full
mt-4
"

placeholder="Notes"

onChange={
e=>

setForm({

...form,

notes:e.target.value

})

}

/>





<button

onClick={submit}

className="
mt-6
bg-[#003B6F]
text-white
px-6
py-3
rounded
"

>

Create Employee

</button>




</main>

);


}