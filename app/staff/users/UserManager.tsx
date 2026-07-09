"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AddUser from "./AddUser";


const roles = [
    "Administrator",
    "Editor",
    "Public Affairs Officer",
    "Viewer"
];



export default function UserManager(){


    const [users,setUsers] = useState<any[]>([]);

    const [loading,setLoading] = useState(true);

    const [editing,setEditing] = useState<string | null>(null);

    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [role,setRole] = useState("");





    async function loadUsers(){

        setLoading(true);

        try{

            const response = await fetch(
                "/api/staff/users",
                {
                    cache:"no-store"
                }
            );


            const data = await response.json();


            console.log(
                "USERS API RESPONSE:",
                data
            );


            if(Array.isArray(data)){

                setUsers(data);

            }
            else if(Array.isArray(data.users)){

                setUsers(data.users);

            }
            else if(Array.isArray(data.data)){

                setUsers(data.data);

            }
            else{

                console.error(
                    "Unexpected users response:",
                    data
                );

                setUsers([]);

            }


        }
        catch(error){

            console.error(
                "LOAD USERS ERROR:",
                error
            );

            setUsers([]);

        }
        finally{

            setLoading(false);

        }

    }





    useEffect(()=>{

        loadUsers();

    },[]);






    function startEdit(user:any){

        setEditing(user.id);

        setEmail(user.email);

        setPassword("");

        setRole(user.role);

    }






    async function saveUser(id:string){


        const response = await fetch(
            "/api/staff/users/edit",
            {

                method:"PATCH",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    id,

                    email,

                    password,

                    role

                })

            }
        );



        const data = await response.json();



        if(data.error){

            alert(data.error);

            return;

        }



        setEditing(null);

        loadUsers();


    }







    async function deleteUser(id:string){


        if(!confirm(
            "Are you sure you want to delete this staff account?"
        )){

            return;

        }



        const response = await fetch(
            "/api/staff/users/delete",
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



        const data = await response.json();



        if(data.error){

            alert(data.error);

            return;

        }



        loadUsers();


    }







    if(loading){

        return (

            <p>
                Loading staff...
            </p>

        );

    }







    return (

        <div className="mt-10 space-y-5">


            <AddUser refresh={loadUsers}/>





            {
                Array.isArray(users) && users.map((user)=>(


                    <div

                        key={user.id}

                        className="border rounded-lg p-6"

                    >



                        {
                            editing === user.id ? (


                                <div className="space-y-3">


                                    <input

                                        className="border p-2 w-full"

                                        value={email}

                                        onChange={(e)=>
                                            setEmail(e.target.value)
                                        }

                                        placeholder="Email"

                                    />



                                    <input

                                        className="border p-2 w-full"

                                        value={password}

                                        onChange={(e)=>
                                            setPassword(e.target.value)
                                        }

                                        placeholder="New password (optional)"

                                    />



                                    <select

                                        className="border p-2"

                                        value={role}

                                        onChange={(e)=>
                                            setRole(e.target.value)
                                        }

                                    >

                                        {
                                            roles.map(r=>(

                                                <option key={r}>

                                                    {r}

                                                </option>

                                            ))
                                        }

                                    </select>




                                    <div className="flex gap-3">


                                        <button

                                            onClick={()=>
                                                saveUser(user.id)
                                            }

                                            className="bg-green-600 text-white px-4 py-2 rounded"

                                        >

                                            Save

                                        </button>



                                        <button

                                            onClick={()=>
                                                setEditing(null)
                                            }

                                            className="border px-4 py-2 rounded"

                                        >

                                            Cancel

                                        </button>


                                    </div>


                                </div>


                            ) : (



                                <div className="flex justify-between items-center">


                                    <div>


                                        <p className="font-bold text-lg">

                                            {
                                                user.employees?.roblox_username ||
                                                "Unlinked Employee"
                                            }

                                        </p>



                                        <p className="text-sm text-gray-600">

                                            Roblox ID:

                                            {" "}

                                            {
                                                user.employees?.roblox_user_id ||
                                                "Not linked"
                                            }

                                        </p>



                                        <p className="text-sm text-gray-600">

                                            DHS Email:

                                            {" "}

                                            {
                                                user.employees?.email ||
                                                "Not assigned"
                                            }

                                        </p>



                                        <p className="text-sm text-gray-600">

                                            Login:

                                            {" "}

                                            {user.email}

                                        </p>



                                        <p className="text-sm text-gray-500">

                                            Role:

                                            {" "}

                                            {user.role}

                                        </p>



                                        <p className="text-sm text-gray-500">

                                            Added by:

                                            {" "}

                                            {user.added_by || "Unknown"}

                                        </p>


                                    </div>






                                    <div className="flex gap-3">


                                        <button

                                            onClick={()=>
                                                startEdit(user)
                                            }

                                            className="border px-4 py-2 rounded"

                                        >

                                            Edit

                                        </button>





                                        <Link

                                            href={`/staff/users/${user.id}`}

                                            className="border px-4 py-2 rounded"

                                        >

                                            Permissions

                                        </Link>





                                        <button

                                            onClick={()=>
                                                deleteUser(user.id)
                                            }

                                            className="bg-red-600 text-white px-4 py-2 rounded"

                                        >

                                            Delete

                                        </button>



                                    </div>



                                </div>


                            )
                        }


                    </div>


                ))
            }


        </div>

    );


}