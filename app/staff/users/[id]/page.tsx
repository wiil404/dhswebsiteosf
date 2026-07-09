"use client";

import {
    useEffect,
    useState
} from "react";

import {
    useParams,
    useRouter
} from "next/navigation";



export default function UserPermissions(){


    const params = useParams();

    const router = useRouter();

    const id = params.id as string;



    const [dhsEmail,setDhsEmail] = useState("");

    const [robloxAvatar,setRobloxAvatar] = useState("");

    const [permissions,setPermissions] = useState<string[]>([]);

    const [available,setAvailable] = useState<any[]>([]);

    const [user,setUser] = useState<any>(null);

    const [loading,setLoading] = useState(true);

    const [saving,setSaving] = useState(false);

    const [emailSaving,setEmailSaving] = useState(false);

    const [message,setMessage] = useState("");







    useEffect(()=>{

        load();

    },[]);








    async function load(){


        try {


            const userResponse = await fetch(
                `/api/staff/users/${id}`
            );


            if(userResponse.ok){

                const userData =
                    await userResponse.json();


                setUser(userData);



                setDhsEmail(
                    userData.employees?.email || ""
                );



                if(
                    userData.employees?.roblox_user_id
                ){

                    loadAvatar(
                        userData.employees.roblox_user_id
                    );

                }

            }







            const currentResponse = await fetch(
                `/api/staff/permissions?id=${id}`
            );


            const currentData =
                await currentResponse.json();







            const allResponse = await fetch(
                "/api/staff/permissions/all"
            );


            const allData =
                await allResponse.json();






            setPermissions(

                currentData.map(
                    (x:any)=>
                        x.permission_id
                )

            );



            setAvailable(allData);



        } catch(error){


            console.error(
                "LOAD ERROR:",
                error
            );


        } finally {


            setLoading(false);


        }


    }







    async function loadAvatar(
        robloxId:string
    ){


        try{


            const response =
                await fetch(
                    `/api/roblox/avatar?id=${robloxId}`
                );


            const data =
                await response.json();



            setRobloxAvatar(
                data.data?.[0]?.imageUrl || ""
            );


        }
        catch(error){

            console.error(
                "AVATAR ERROR:",
                error
            );

        }


    }








    async function saveEmail(){


        setEmailSaving(true);


        try{


            const response =
                await fetch(
                    `/api/staff/users/${id}/email`,
                    {

                        method:"PATCH",

                        headers:{
                            "Content-Type":
                            "application/json"
                        },

                        body:JSON.stringify({

                            email:dhsEmail

                        })

                    }
                );



            if(!response.ok){

                throw new Error(
                    "Failed updating email"
                );

            }



            setMessage(
                "DHS email updated successfully."
            );


        }
        catch(error:any){


            setMessage(
                error.message
            );


        }
        finally{

            setEmailSaving(false);

        }


    }









    function toggle(permissionId:string){


        setPermissions(prev=>


            prev.includes(permissionId)

            ?

            prev.filter(
                x=>x !== permissionId
            )

            :

            [
                ...prev,
                permissionId
            ]

        );


    }









    async function save(){

        setSaving(true);

        setMessage("");

        try {


            const response = await fetch(
                "/api/staff/permissions",
                {

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify({

                        user_id:id,

                        permissions

                    })

                }
            );



            if(!response.ok){

                throw new Error(
                    await response.text()
                );

            }



            setMessage(
                "Permissions saved successfully."
            );



        }
        catch(error:any){


            setMessage(
                error.message
            );


        }
        finally{


            setSaving(false);


        }

    }









    if(loading){


        return (

            <main className="max-w-5xl mx-auto px-6 py-12">

                <h1 className="text-2xl font-bold">

                    Loading permissions...

                </h1>

            </main>

        );

    }








    return (


        <main className="max-w-5xl mx-auto px-6 py-12">





            <div className="border-b pb-6">


                <h1 className="text-4xl font-bold">

                    Manage Staff Account

                </h1>



                <p className="text-gray-600 mt-2">

                    Manage identity, DHS email and system permissions.

                </p>





                {
                    user && user.employees && (

                        <div className="
                            mt-6
                            bg-gray-50
                            border
                            rounded-lg
                            p-6
                            flex
                            gap-6
                            items-center
                        ">


                            {
                                robloxAvatar && (

                                    <img

                                        src={robloxAvatar}

                                        className="
                                            w-24
                                            h-24
                                            rounded-full
                                            border
                                        "

                                    />

                                )
                            }



                            <div>


                                <h2 className="text-2xl font-bold">

                                    {
                                        user.employees.roblox_username
                                    }

                                </h2>



                                <p>

                                    Roblox ID:

                                    {" "}

                                    {
                                        user.employees.roblox_user_id
                                    }

                                </p>




                                <p className="mt-2">

                                    Position:

                                    {" "}

                                    {
                                        user.employees.positions?.title ||
                                        "Unassigned"
                                    }

                                </p>




                                <p>

                                    Division:

                                    {" "}

                                    {
                                        user.employees.divisions?.name ||
                                        "Unassigned"
                                    }

                                </p>




                                <p className="mt-2 text-gray-600">

                                    Account Login:

                                    {" "}

                                    {user.email}

                                </p>



                                <p className="text-gray-600">

                                    DHS Email:

                                    {" "}

                                    {
                                        user.employees?.email ||
                                        "Not assigned"
                                    }

                                </p>


                            </div>


                        </div>

                    )
                }



            </div>






            {/* DHS EMAIL */}


            <section className="mt-8">


                <h2 className="text-xl font-bold">

                    DHS Email Address

                </h2>



                <div className="flex gap-4 mt-4">


                    <input

                        className="
                            border
                            p-3
                            flex-1
                        "

                        placeholder="name@dhs.gov"

                        value={dhsEmail}

                        onChange={
                            e=>
                            setDhsEmail(
                                e.target.value
                            )
                        }

                    />



                    <button

                        onClick={saveEmail}

                        disabled={emailSaving}

                        className="
                            bg-[#003B6F]
                            text-white
                            px-6
                            rounded
                        "

                    >

                        {
                            emailSaving
                            ?
                            "Saving..."
                            :
                            "Save Email"
                        }

                    </button>


                </div>


            </section>









            <div className="mt-10">


                <h2 className="text-xl font-bold mb-4">

                    Available Permissions

                </h2>





                <div className="grid md:grid-cols-2 gap-4">





                {
                    available.map(permission=>(


                        <label

                            key={permission.id}

                            className={`

                                border rounded-lg p-5 cursor-pointer

                                ${
                                    permissions.includes(permission.id)

                                    ?

                                    "border-[#003B6F] bg-blue-50"

                                    :

                                    "hover:bg-gray-50"

                                }

                            `}

                        >


                            <div className="flex gap-4">


                                <input

                                    type="checkbox"

                                    checked={
                                        permissions.includes(
                                            permission.id
                                        )
                                    }

                                    onChange={()=>
                                        toggle(permission.id)
                                    }

                                />



                                <div>

                                    <p className="font-bold">

                                        {permission.name}

                                    </p>


                                    <p className="text-sm text-gray-600">

                                        {
                                            permission.description
                                        }

                                    </p>


                                </div>


                            </div>


                        </label>


                    ))
                }



                </div>


            </div>








            <div className="mt-8 flex gap-5">


                <button

                    onClick={save}

                    disabled={saving}

                    className="
                        bg-[#003B6F]
                        text-white
                        px-6
                        py-3
                        rounded
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





                <button

                    onClick={()=>
                        router.back()
                    }

                    className="
                        border
                        px-6
                        py-3
                        rounded
                    "

                >

                    Cancel

                </button>




                {
                    message && (

                        <p className="font-medium">

                            {message}

                        </p>

                    )
                }


            </div>






        </main>


    );


}