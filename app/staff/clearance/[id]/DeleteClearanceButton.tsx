"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function DeleteClearanceButton({

id

}:{

id:string;

}){


const router = useRouter();

const [loading,setLoading] = useState(false);





async function deleteClearance(){


const confirmed = confirm(

"Are you sure you want to permanently delete this clearance record?"

);



if(!confirmed){

return;

}



setLoading(true);




try{


const response = await fetch(

`/api/staff/clearance/${id}`,

{

method:"DELETE"

}

);





const result = await response.json();






if(!response.ok){


alert(

result.error ||

"Failed to delete clearance"

);


setLoading(false);

return;


}






router.push("/staff/clearance");

router.refresh();




}

catch(error){


console.error(error);


alert(
"An error occurred while deleting clearance"
);


setLoading(false);


}



}







return (

<button

onClick={deleteClearance}

disabled={loading}

className="
bg-red-600
text-white
px-6
py-3
font-bold
hover:bg-red-700
transition
disabled:opacity-50
"

>


{

loading

?

"Deleting..."

:

"Delete Clearance"

}


</button>


);


}