"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Employees(){

    const [employees,setEmployees] = useState<any[]>([]);
    const [loading,setLoading] = useState(true);


    useEffect(()=>{

        async function load(){

            const response = await fetch(
                "/api/staff/employees",
                {
                    cache:"no-store"
                }
            );

            const data = await response.json();

            setEmployees(data);

            setLoading(false);

        }


        load();

    },[]);



    if(loading){

        return (

            <main className="p-12">
                Loading employees...
            </main>

        );

    }



    return (

        <main className="
        max-w-7xl
        mx-auto
        px-6
        py-12
        ">


            <div className="
            flex
            justify-between
            items-center
            ">

                <h1 className="
                text-4xl
                font-bold
                text-[#003B6F]
                ">

                    Employee Directory

                </h1>


                <Link

                href="/staff/employees/create"

                className="
                bg-[#003B6F]
                text-white
                px-5
                py-3
                rounded
                "

                >

                    Add Employee

                </Link>


            </div>



            <div className="
            mt-10
            grid
            md:grid-cols-3
            gap-6
            ">


            {
                employees.map(employee=>(


                    <Link

                    key={employee.id}

                    href={`/staff/employees/${employee.id}`}

                    className="
                    border
                    rounded-lg
                    p-6
                    hover:shadow-lg
                    "

                    >


                        <h2 className="
                        text-xl
                        font-bold
                        ">

                            {employee.roblox_username}

                        </h2>



                        <p className="text-gray-600 mt-2">

                            {employee.positions?.title || "No Position"}

                        </p>



                        <p className="text-gray-600">

                            {employee.divisions?.name || "No Division"}

                        </p>



                        <p className="mt-3 font-semibold">

                            Status: {employee.status}

                        </p>


                        <p className="
                        text-sm
                        text-gray-500
                        mt-2
                        ">

                            Roblox ID: {employee.roblox_user_id}

                        </p>


                    </Link>


                ))
            }


            </div>


        </main>

    );

}