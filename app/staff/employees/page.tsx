"use client";

import { useEffect, useState } from "react";
import Link from "next/link";



export default function Employees(){


    const [employees,setEmployees] = useState<any[]>([]);

    const [loading,setLoading] = useState(true);







    useEffect(()=>{


        async function load(){


            try{


                const response = await fetch(

                    "/api/staff/employees",

                    {

                        cache:"no-store"

                    }

                );



                const data = await response.json();



                setEmployees(data);



            }
            catch(error){


                console.error(
                    "EMPLOYEE LOAD ERROR:",
                    error
                );


            }
            finally{


                setLoading(false);


            }


        }




        load();



    },[]);









    if(loading){


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
                        text-xl
                        font-bold
                        text-[#003B6F]
                        "

                    >

                        Loading employee directory...

                    </h1>


                </div>


            </main>

        );


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





                {/* HEADER */}


                <div

                    className="
                    flex
                    justify-between
                    items-center
                    border-b
                    border-gray-200
                    pb-8
                    "

                >



                    <div>


                        <h1

                            className="
                            text-4xl
                            font-bold
                            text-[#003B6F]
                            "

                        >

                            Employee Directory

                        </h1>




                        <p className="mt-3 text-gray-600">

                            View and manage DHS personnel records.

                        </p>



                    </div>








                    <Link

                        href="/staff/employees/create"

                        className="
                        bg-[#003B6F]
                        text-white
                        px-6
                        py-3
                        font-bold
                        hover:bg-[#00284d]
                        transition
                        "

                    >

                        Add Employee

                    </Link>




                </div>









                {/* EMPLOYEE CARDS */}



                <div

                    className="
                    mt-10
                    grid
                    md:grid-cols-3
                    gap-6
                    "

                >




                    {
                        employees.map((employee)=>(



                            <Link


                                key={employee.id}


                                href={`/staff/employees/${employee.id}`}


                                className="
                                relative
                                bg-white
                                border
                                border-gray-200
                                p-6
                                shadow-sm
                                hover:shadow-xl
                                transition
                                "

                            >





                                <div

                                    className="
                                    absolute
                                    left-0
                                    top-0
                                    bottom-0
                                    w-1
                                    bg-[#003B6F]
                                    "

                                />









                                <h2

                                    className="
                                    text-xl
                                    font-bold
                                    text-[#003B6F]
                                    "

                                >

                                    {employee.roblox_username}

                                </h2>









                                <div className="mt-4">


                                    <p className="font-semibold text-gray-900">

                                        {
                                            employee.positions?.title ||
                                            "No Position"
                                        }

                                    </p>





                                    <p className="text-gray-600">

                                        {
                                            employee.divisions?.name ||
                                            "No Division"
                                        }

                                    </p>



                                </div>









                                <div

                                    className="
                                    mt-5
                                    "

                                >



                                    {
                                        employee.status === "Active"

                                        ?

                                        <span

                                            className="
                                            inline-block
                                            bg-green-100
                                            text-green-700
                                            px-3
                                            py-1
                                            text-sm
                                            font-bold
                                            "

                                        >

                                            Active

                                        </span>


                                        :

                                        <span

                                            className="
                                            inline-block
                                            bg-gray-100
                                            text-gray-700
                                            px-3
                                            py-1
                                            text-sm
                                            font-bold
                                            "

                                        >

                                            {employee.status}

                                        </span>

                                    }



                                </div>









                                <div

                                    className="
                                    mt-6
                                    pt-4
                                    border-t
                                    border-gray-100
                                    "

                                >



                                    <p className="text-xs uppercase text-gray-500">

                                        Roblox ID

                                    </p>



                                    <p className="text-sm font-semibold text-gray-700">

                                        {employee.roblox_user_id}

                                    </p>



                                </div>






                            </Link>



                        ))
                    }




                </div>







                {
                    employees.length === 0 && (


                        <div

                            className="
                            mt-10
                            text-center
                            text-gray-500
                            "

                        >

                            No employees found.

                        </div>


                    )
                }







            </div>




        </main>


    );


}
