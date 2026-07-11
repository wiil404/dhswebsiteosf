"use client";


import {useSearchParams} from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";



export default function ApplicationSubmittedPage(){


    const searchParams =
        useSearchParams();



    const number =
        searchParams.get("number");






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




                <div

                    className="
                    h-3
                    bg-[#F2C94C]
                    "

                />








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
                        mt-5
                        text-5xl
                        font-black
                        "

                    >

                        Application Submitted

                    </h1>






                    <p

                        className="
                        mt-5
                        text-xl
                        text-gray-200
                        "

                    >

                        Your application has been successfully received by the Department of Homeland Security.

                    </p>




                </section>









                <section

                    className="
                    p-10
                    md:p-14
                    "

                >




                    <div

                        className="
                        bg-gray-50
                        border
                        border-gray-200
                        p-8
                        "

                    >



                        <h2

                            className="
                            text-2xl
                            font-bold
                            text-[#003B6F]
                            "

                        >

                            Your Application Number

                        </h2>






                        <p

                            className="
                            mt-5
                            text-4xl
                            font-black
                            tracking-widest
                            text-gray-900
                            "

                        >

                            {number || "Unavailable"}

                        </p>





                        <p

                            className="
                            mt-5
                            text-gray-600
                            "

                        >

                            Please save this application number. You will need it to check your application status in the future.

                        </p>




                    </div>









                    <div

                        className="
                        mt-10
                        flex
                        gap-5
                        flex-wrap
                        "

                    >





                        <Link

                            href={`/recruitment/applications?number=${number}`}

                            className="
                            bg-[#003B6F]
                            text-white
                            px-8
                            py-4
                            font-bold
                            hover:bg-[#002B52]
                            transition
                            "

                        >

                            View Application Status →

                        </Link>






                        <Link

                            href="/"

                            className="
                            border
                            border-[#003B6F]
                            text-[#003B6F]
                            px-8
                            py-4
                            font-bold
                            hover:bg-gray-100
                            transition
                            "

                        >

                            Return Home

                        </Link>





                    </div>







                </section>





            </div>






        </main>

    );


}