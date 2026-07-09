"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ToggleButton({
    id,
    published
}:{
    id:string;
    published:boolean;
}){


    const router = useRouter();

    const [loading,setLoading] = useState(false);



    async function toggle(){


        setLoading(true);


        try {


            const response = await fetch(
                "/api/news/toggle",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify({

                        id,

                        published:!published

                    })

                }
            );



            const result = await response.json();



            console.log("TOGGLE RESPONSE:", result);



            if(result.error){

                alert(result.error);

                setLoading(false);

                return;

            }



            window.location.reload();



        } catch(error){


            console.error(error);

            alert("Failed to update article");


        }



        setLoading(false);


    }




    return (

        <button

            onClick={toggle}

            disabled={loading}

            className={
                published
                ?
                "text-orange-600 underline disabled:opacity-50"
                :
                "text-green-600 underline disabled:opacity-50"
            }

        >

            {
                loading
                ?
                "Updating..."
                :
                published
                ?
                "Unpublish"
                :
                "Publish"
            }


        </button>

    );


}