"use client";

import { useEffect, useState } from "react";


export default function Organisation(){


    const [divisions,setDivisions] = useState<any[]>([]);


    const [position,setPosition] = useState({

        title:"",
        description:"",
        division_id:""

    });





    async function load(){

        const response = await fetch(
            "/api/staff/organisation/divisions"
        );


        const data = await response.json();


        setDivisions(data);

    }





    useEffect(()=>{

        load();

    },[]);







    async function createPosition(){


        await fetch(

            "/api/staff/organisation/positions",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(position)

            }

        );



        setPosition({

            title:"",
            description:"",
            division_id:""

        });



        load();


    }









    async function deletePosition(id:string){


        const confirmDelete =
            confirm("Delete this position?");



        if(!confirmDelete){

            return;

        }





        await fetch(

            "/api/staff/organisation/positions",

            {

                method:"DELETE",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    id

                })

            }

        );



        load();


    }









    return (

        <main

            className="
            max-w-7xl
            mx-auto
            px-6
            py-16
            "

        >


            <div

                className="
                bg-white
                shadow-xl
                border
                border-gray-200
                p-10
                "

            >



                <h1

                    className="
                    text-4xl
                    font-bold
                    text-[#003B6F]
                    "

                >

                    Organisation Management

                </h1>



                <p className="mt-3 text-gray-600">

                    Manage DHS divisions and organisational positions.

                </p>








                <section

                    className="
                    mt-10
                    border
                    border-gray-200
                    p-6
                    "

                >



                    <h2

                        className="
                        text-2xl
                        font-bold
                        text-[#003B6F]
                        "

                    >

                        Create Position

                    </h2>






                    <select

                        className="
                        border
                        p-3
                        w-full
                        mt-5
                        "

                        value={position.division_id}

                        onChange={(e)=>

                            setPosition({

                                ...position,

                                division_id:e.target.value

                            })

                        }

                    >


                        <option value="">

                            Select Division

                        </option>



                        {
                            divisions.map((division)=>(

                                <option

                                    key={division.id}

                                    value={division.id}

                                >

                                    {division.name}

                                </option>

                            ))
                        }


                    </select>







                    <input

                        className="
                        border
                        p-3
                        w-full
                        mt-4
                        "

                        placeholder="Position Title"

                        value={position.title}

                        onChange={(e)=>

                            setPosition({

                                ...position,

                                title:e.target.value

                            })

                        }

                    />







                    <textarea

                        className="
                        border
                        p-3
                        w-full
                        mt-4
                        "

                        rows={4}

                        placeholder="Position Description"

                        value={position.description}

                        onChange={(e)=>

                            setPosition({

                                ...position,

                                description:e.target.value

                            })

                        }

                    />







                    <button

                        onClick={createPosition}

                        className="
                        mt-5
                        bg-[#003B6F]
                        text-white
                        px-6
                        py-3
                        font-bold
                        "

                    >

                        Create Position

                    </button>



                </section>









                <section className="mt-12">


                    <h2

                        className="
                        text-3xl
                        font-bold
                        text-[#003B6F]
                        "

                    >

                        Department Structure

                    </h2>






                    <div className="mt-8 space-y-8">


                        {
                            divisions.map((division)=>(


                                <div

                                    key={division.id}

                                    className="
                                    border
                                    border-gray-200
                                    p-6
                                    "

                                >



                                    <h3

                                        className="
                                        text-2xl
                                        font-bold
                                        "

                                    >

                                        {division.name}

                                    </h3>







                                    <div className="mt-5 space-y-3">



                                        {
                                            division.positions &&
                                            division.positions.length > 0
                                            ?

                                            division.positions.map((position:any)=>(


                                                <div

                                                    key={position.id}

                                                    className="
                                                    bg-[#F5F8FB]
                                                    border
                                                    p-4
                                                    flex
                                                    justify-between
                                                    items-center
                                                    "

                                                >


                                                    <div>


                                                        <p className="font-bold">

                                                            {position.title}

                                                        </p>



                                                        <p className="text-sm text-gray-600">

                                                            {position.description}

                                                        </p>


                                                    </div>





                                                    <button

                                                        onClick={()=>
                                                            deletePosition(position.id)
                                                        }

                                                        className="
                                                        bg-red-600
                                                        text-white
                                                        px-4
                                                        py-2
                                                        "

                                                    >

                                                        Delete

                                                    </button>



                                                </div>


                                            ))


                                            :

                                            <p className="text-gray-500">

                                                No positions created.

                                            </p>


                                        }



                                    </div>



                                </div>



                            ))
                        }



                    </div>



                </section>




            </div>



        </main>


    );


}
