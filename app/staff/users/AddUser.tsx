"use client";

import { useEffect, useState } from "react";


export default function AddUser({

    refresh

}:{

    refresh:()=>void;

}){


    const [open,setOpen] = useState(false);


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [role,setRole] = useState(
        "Viewer"
    );


    const [employeeId,setEmployeeId] = useState("");

    const [employees,setEmployees] = useState<any[]>([]);


    const [loading,setLoading] = useState(false);






    useEffect(()=>{


        async function loadEmployees(){


            const response = await fetch(
                "/api/staff/employees"
            );


            if(response.ok){


                const data =
                    await response.json();


                setEmployees(data);


            }


        }


        loadEmployees();


    },[]);









    async function createUser(){


        setLoading(true);



        try{


            const response =
                await fetch(
                    "/api/staff/users/create",
                    {

                        method:"POST",

                        headers:{

                            "Content-Type":
                            "application/json"

                        },


                        body:JSON.stringify({

                            email,

                            password,

                            role,

                            employee_id:
                            employeeId || null

                        })

                    }
                );






            const data =
                await response.json();





            if(data.error){


                alert(data.error);

                setLoading(false);

                return;


            }






            setEmail("");

            setPassword("");

            setRole("Viewer");

            setEmployeeId("");

            setOpen(false);



            refresh();



        }
        catch(error){


            console.error(
                "CREATE USER ERROR:",
                error
            );


            alert(
                "Failed creating user"
            );


        }
        finally{


            setLoading(false);


        }


    }









    return (

        <div className="mb-8">


            <button

                onClick={()=>
                    setOpen(!open)
                }

                className="
                    bg-[#003B6F]
                    text-white
                    px-6
                    py-3
                    rounded-lg
                "

            >

                {
                    open
                    ?
                    "Cancel"
                    :
                    "Create Staff Account"
                }

            </button>







            {
                open && (


                    <div className="
                        mt-6
                        border
                        rounded-lg
                        p-6
                        space-y-4
                    ">


                        <h2 className="text-2xl font-bold">

                            Create Staff Login

                        </h2>







                        <input

                            className="
                                border
                                p-3
                                w-full
                            "

                            placeholder="DHS Email"

                            value={email}

                            onChange={(e)=>
                                setEmail(
                                    e.target.value
                                )
                            }

                        />







                        <input

                            className="
                                border
                                p-3
                                w-full
                            "

                            placeholder="Temporary Password"

                            type="password"

                            value={password}

                            onChange={(e)=>
                                setPassword(
                                    e.target.value
                                )
                            }

                        />








                        <select

                            className="
                                border
                                p-3
                                w-full
                            "

                            value={role}

                            onChange={(e)=>
                                setRole(
                                    e.target.value
                                )
                            }

                        >

                            <option>
                                Administrator
                            </option>


                            <option>
                                Editor
                            </option>


                            <option>
                                Public Affairs Officer
                            </option>


                            <option>
                                Viewer
                            </option>


                        </select>









                        <select

                            className="
                                border
                                p-3
                                w-full
                            "

                            value={employeeId}

                            onChange={(e)=>
                                setEmployeeId(
                                    e.target.value
                                )
                            }

                        >


                            <option value="">

                                Link Employee (Optional)

                            </option>



                            {
                                employees.map(
                                    employee=>(

                                    <option

                                        key={
                                            employee.id
                                        }

                                        value={
                                            employee.id
                                        }

                                    >

                                        {
                                            employee.roblox_username
                                        }

                                        {" - "}

                                        {
                                            employee.positions?.title ||
                                            "No Position"
                                        }

                                    </option>

                                ))
                            }


                        </select>








                        <button

                            onClick={createUser}

                            disabled={loading}

                            className="
                                bg-green-600
                                text-white
                                px-6
                                py-3
                                rounded-lg
                            "

                        >

                            {
                                loading
                                ?
                                "Creating..."
                                :
                                "Create Account"
                            }


                        </button>




                    </div>


                )
            }


        </div>

    );

}