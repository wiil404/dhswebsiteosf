"use client";

import { useEffect, useState } from "react";



export default function PermissionsPage(){


const [positions,setPositions] =
useState<any[]>([]);

const [
selectedPermissions,
setSelectedPermissions
] =
useState<string[]>([]);

const [permissions,setPermissions] =
useState<any[]>([]);


const [selectedPosition,setSelectedPosition] =
useState("");


const [assigned,setAssigned] =
useState<string[]>([]);


const [loading,setLoading] =
useState(false);


const [saving,setSaving] =
useState(false);


async function loadPositions(){

    try{

        const response =
            await fetch(
                "/api/staff/positions",
                {
                    cache:"no-store"
                }
            );


        const data =
            await response.json();


        console.log(
            "POSITIONS:",
            data
        );


        setPositions(
            Array.isArray(data)
            ?
            data
            :
            []
        );


    }
    catch(error){

        console.error(
            "POSITION LOAD ERROR:",
            error
        );


        setPositions([]);

    }

}


useEffect(()=>{

loadPositions();
loadPermissions();

},[]);






async function loadRolePermissions(roleId:string){

    try{

        const response =
            await fetch(
                `/api/staff/permissions/${roleId}`
            );


        const data =
            await response.json();



        console.log(
            "ROLE PERMISSIONS:",
            data
        );



        setPermissions(
            Array.isArray(data)
                ? data
                :
                data.permissions || []
        );


    }
    catch(error){

        console.error(
            "FAILED LOADING ROLE PERMISSIONS:",
            error
        );

        setPermissions([]);

    }

}








async function loadPermissions(){

    try{

        const response =
            await fetch(
                "/api/staff/permissions",
                {
                    cache:"no-store"
                }
            );


        const data =
            await response.json();



        console.log(
            "ALL PERMISSIONS:",
            data
        );



        setPermissions(
            Array.isArray(data)
            ?
            data
            :
            []
        );


    }
    catch(error){

        console.error(
            "LOAD PERMISSIONS ERROR:",
            error
        );


        setPermissions([]);

    }

}


async function loadPositionPermissions(
    positionId:string
){

    try{


        const response =
            await fetch(
                `/api/staff/position-permissions?position_id=${positionId}`,
                {
                    cache:"no-store"
                }
            );



        const data =
            await response.json();



        console.log(
            "POSITION PERMISSIONS:",
            data
        );



        const ids =
            data.map(
                (item:any)=>
                    item.permission_id
            );



        setSelectedPermissions(ids);



    }
    catch(error){

        console.error(
            "POSITION PERMISSION ERROR:",
            error
        );


        setSelectedPermissions([]);

    }


}





async function selectPosition(id:string){


setSelectedPosition(id);


setLoading(true);



const response =
await fetch(

`/api/staff/positions/${id}/permissions`,

{
cache:"no-store"
}

);



const data =
await response.json();




setAssigned(

data.map(
(item:any)=>
item.permission_id
)

);



setLoading(false);


}









function togglePermission(id:string){


setAssigned(
current =>

current.includes(id)

?

current.filter(
(permission)=>
permission !== id
)

:

[
...current,
id
]

);


}









async function save(){


if(!selectedPosition)
return;



setSaving(true);



const response =
await fetch(

`/api/staff/positions/${selectedPosition}/permissions`,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

permissions:assigned

})

}

);



const data =
await response.json();



if(data.error){

alert(data.error);

}
else{

alert(
"Permissions updated successfully"
);

}



setSaving(false);


}







return (

<main className="
max-w-6xl
mx-auto
px-6
py-12
">


<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Permission Management

</h1>


<p className="
mt-2
text-gray-600
">

Manage what each DHS position can access.

</p>






<section className="
mt-8
bg-white
border
rounded-lg
shadow
p-6
">


<label className="
font-bold
block
">

Select Position

</label>




<select

className="
mt-3
border
rounded
p-3
w-full
"

value={selectedPosition}

onChange={(e)=>{

    const value =
        e.target.value;


    setSelectedPosition(value);


    if(value){

        loadPositionPermissions(value);

    }

}}

>


<option value="">

Choose Position

</option>



{

positions.map((position)=>(


<option

key={position.id}

value={position.id}

>

{position.title}

</option>


))

}


</select>


</section>








{

selectedPosition &&

<section className="
mt-8
bg-white
border
rounded-lg
shadow
p-6
">


<h2 className="
text-2xl
font-bold
text-[#003B6F]
">

Permissions

</h2>



{

loading ?

<p className="mt-5">
Loading permissions...
</p>


:


<div className="
mt-6
grid
md:grid-cols-2
gap-4
">


{

permissions.map((permission)=>(


<label

key={permission.id}

className="
flex
items-center
gap-4
border
rounded
p-4
cursor-pointer
hover:bg-gray-50
"

>


<input

type="checkbox"

checked={
assigned.includes(permission.id)
}

onChange={()=>
togglePermission(permission.id)
}

/>


<div>


<p className="
font-semibold
">

{permission.name}

</p>


<p className="
text-sm
text-gray-500
">

{permission.description}

</p>


</div>


</label>


))

}


</div>


}




<button

onClick={save}

disabled={saving}

className="
mt-8
bg-[#003B6F]
text-white
px-8
py-3
rounded
font-bold
"

>

{

saving

?

"Saving..."

:

"Save Permissions"

}


</button>




</section>

}




</main>

);


}