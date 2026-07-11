"use client";


import {useState} from "react";
import Breadcrumb from "@/components/Breadcrumb";



export default function ApplicationsPage(){


    const [applicationNumber,setApplicationNumber] = useState("");

    const [application,setApplication] = useState<any>(null);

    const [loading,setLoading] = useState(false);

    const [error,setError] = useState("");





    async function searchApplication(){


        if(!applicationNumber){

            setError(
                "Please enter your application number."
            );

            return;

        }



        setLoading(true);

        setError("");





        const response = await fetch(

            `/api/recruitment/applications?number=${applicationNumber}`

        );



        const data = await response.json();





        if(!response.ok){


            setError(
                data.error ||
                "Application not found."
            );


            setApplication(null);

            setLoading(false);

            return;

        }




        setApplication(data);

        setLoading(false);


    }









    return (

        <main

            className="
            max-w-5xl
            mx-auto
            px-6
            py-16
            "

        >


            <Breadcrumb />





            <div

                className="
                bg-white
                shadow-2xl
                border
                border-gray-200
                overflow-hidden
                "

            >


                <div className="
                h-3
                bg-[#F2C94C]
                "/>






                <section

                    className="
                    bg-[#003B6F]
                    text-white
                    p-10
                    md:p-14
                    "

                >


                    <p

                        className="
                        uppercase
                        tracking-[0.3em]
                        text-sm
                        font-bold
                        text-[#F2C94C]
                        "

                    >

                        Department of Homeland Security

                    </p>




                    <h1

                        className="
                        mt-4
                        text-5xl
                        font-black
                        "

                    >

                        Application Status

                    </h1>




                    <p

                        className="
                        mt-5
                        text-lg
                        text-gray-200
                        "

                    >

                        Check the current progress of your DHS recruitment application.

                    </p>



                </section>









                <section

                    className="
                    p-10
                    md:p-14
                    "

                >





                    <h2

                        className="
                        text-3xl
                        font-bold
                        text-[#003B6F]
                        "

                    >

                        Lookup Application

                    </h2>






                    <input

                        className="
                        border
                        p-4
                        w-full
                        mt-6
                        "

                        placeholder="Application Number"

                        value={applicationNumber}

                        onChange={
                            e=>
                            setApplicationNumber(
                                e.target.value
                            )
                        }

                    />






                    <button

                        onClick={searchApplication}

                        disabled={loading}

                        className="
                        mt-5
                        bg-[#003B6F]
                        text-white
                        px-8
                        py-4
                        font-bold
                        hover:bg-[#002B52]
                        transition
                        "

                    >

                    {
                        loading
                        ?
                        "Searching..."
                        :
                        "View Application Status →"
                    }


                    </button>








                    {
                        error && (

                            <p

                                className="
                                mt-6
                                text-red-600
                                font-bold
                                "

                            >

                                {error}

                            </p>

                        )
                    }









                    {
                        application && (


                            <div

                                className="
                                mt-10
                                border
                                border-gray-200
                                bg-gray-50
                                p-8
                                "

                            >


                                <h3

                                    className="
                                    text-2xl
                                    font-bold
                                    text-[#003B6F]
                                    "

                                >

                                    Application Details

                                </h3>




                                <p className="mt-5">

                                    <strong>
                                        Division:
                                    </strong>

                                    {" "}

                                    {
                                        application.divisions?.name ||
                                        "Pending"
                                    }

                                </p>






                                <p className="mt-3">

                                    <strong>
                                        Status:
                                    </strong>

                                    {" "}

                                    {
                                        application.status
                                    }

                                </p>






                                <p className="mt-3">

                                    <strong>
                                        Submitted:
                                    </strong>

                                    {" "}

                                    {
                                        new Date(
                                            application.created_at
                                        )
                                        .toLocaleDateString()
                                    }

                                </p>




                            </div>


                        )
                    }







                </section>






            </div>





        </main>

    );


}