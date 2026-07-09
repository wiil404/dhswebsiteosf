"use client";

import { useRouter } from "next/navigation";


export default function DeleteButton({
    id
}:{
    id:number
}){


    const router = useRouter();



    async function remove(){


        const confirmed = confirm(
            "Are you sure you want to delete this article?"
        );


        if(!confirmed){

            return;

        }



        const response = await fetch(
            "/api/news/delete",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id
                })
            }
        );



        const result = await response.json();



        if(result.error){

            alert(result.error);
            return;

        }



        router.refresh();

    }



    return (

        <button
            onClick={remove}
            className="border px-4 py-2 rounded text-red-600"
        >
            Delete
        </button>

    );

}