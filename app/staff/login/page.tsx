"use client";

import { useState } from "react";
import { supabaseBrowser } from "../../lib/supabase-browser";
import { useRouter } from "next/navigation";



export default function LoginPage(){


    const router = useRouter();


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);






    async function login(){


        setLoading(true);

        setError("");



        const {

            error

        } = await supabaseBrowser.auth.signInWithPassword({

            email,

            password

        });





        if(error){


            setError(
                error.message
            );


            setLoading(false);

            return;

        }





        router.push(
            "/staff/dashboard"
        );


    }









    return (


        <main

            className="
            relative
            min-h-[calc(100vh-160px)]
            py-20
            "

        >





            {/* BACKGROUND */}

            <div

                className="
                absolute
                inset-0
                -z-10
                bg-[#003B6F]
                overflow-hidden
                "

            >


                <div

                    className="
                    absolute
                    inset-0
                    opacity-10
                    bg-[linear-gradient(45deg,transparent_45%,white_46%,transparent_47%),linear-gradient(-45deg,transparent_45%,white_46%,transparent_47%)]
                    bg-[length:120px_120px]
                    "

                />


            </div>










            <section

                className="
                max-w-md
                mx-auto
                px-6
                "

            >





                <div

                    className="
                    bg-white
                    shadow-2xl
                    border
                    border-gray-200
                    "

                >



                    {/* GOLD BAR */}

                    <div

                        className="
                        h-2
                        bg-[#F2C94C]
                        "

                    />









                    <div

                        className="
                        p-8
                        md:p-10
                        "

                    >







                        <div

                            className="
                            text-center
                            "

                        >



                            <p

                                className="
                                uppercase
                                tracking-[0.2em]
                                text-xs
                                font-bold
                                text-[#003B6F]
                                "

                            >

                                Department of Homeland Security

                            </p>





                            <h1

                                className="
                                mt-4
                                text-4xl
                                font-bold
                                text-[#003B6F]
                                "

                            >

                                Staff Portal

                            </h1>





                            <p

                                className="
                                mt-3
                                text-gray-600
                                "

                            >

                                Authorised personnel access only.

                            </p>



                        </div>









                        {/* SECURITY NOTICE */}


                        <div

                            className="
                            mt-8
                            border-l-4
                            border-[#003B6F]
                            bg-gray-50
                            p-4
                            "

                        >


                            <p

                                className="
                                text-sm
                                text-gray-700
                                "

                            >

                                This system is restricted to approved DHS personnel. All activity may be monitored and recorded.

                            </p>


                        </div>









                        <div

                            className="
                            mt-8
                            "

                        >







                            <label

                                className="
                                text-sm
                                font-bold
                                text-gray-700
                                "

                            >

                                Email Address

                            </label>




                            <input

                                className="
                                mt-2
                                border
                                border-gray-300
                                p-3
                                w-full
                                focus:outline-none
                                focus:border-[#003B6F]
                                "

                                placeholder="name@example.com"

                                value={email}

                                onChange={(e)=>
                                    setEmail(e.target.value)
                                }

                            />








                            <label

                                className="
                                block
                                mt-5
                                text-sm
                                font-bold
                                text-gray-700
                                "

                            >

                                Password

                            </label>






                            <input

                                className="
                                mt-2
                                border
                                border-gray-300
                                p-3
                                w-full
                                focus:outline-none
                                focus:border-[#003B6F]
                                "

                                placeholder="Password"

                                type="password"

                                value={password}

                                onChange={(e)=>
                                    setPassword(e.target.value)
                                }

                            />









                            {

                                error && (

                                    <div

                                        className="
                                        mt-5
                                        bg-red-50
                                        border
                                        border-red-200
                                        p-4
                                        text-red-700
                                        text-sm
                                        "

                                    >

                                        {error}

                                    </div>

                                )

                            }









                            <button

                                onClick={login}

                                disabled={loading}

                                className="
                                mt-6
                                w-full
                                bg-[#003B6F]
                                text-white
                                py-3
                                font-bold
                                hover:bg-[#00284d]
                                transition
                                disabled:opacity-50
                                "

                            >

                                {

                                    loading

                                    ?

                                    "Authenticating..."

                                    :

                                    "Sign In"

                                }


                            </button>





                        </div>









                        <div

                            className="
                            mt-8
                            border-t
                            pt-5
                            text-center
                            text-xs
                            text-gray-500
                            "

                        >

                            <p>

                                OSFUSA Department of Homeland Security

                            </p>


                            <p className="mt-1">

                                Secure Staff Authentication System

                            </p>


                        </div>









                    </div>


                </div>



            </section>







        </main>


    );


}
