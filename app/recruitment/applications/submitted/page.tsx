import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";



export default async function ApplicationSubmittedPage({

    searchParams

}:{

    searchParams: Promise<{
        number?: string
    }>

}){


    const {
        number

    } = await searchParams;





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
                        md:text-6xl
                        font-black
                        "

                    >

                        Application Submitted

                    </h1>






                    <p

                        className="
                        mt-6
                        text-xl
                        text-gray-200
                        max-w-3xl
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
                            text-3xl
                            font-bold
                            text-[#003B6F]
                            "

                        >

                            Your Application Number

                        </h2>






                        <div

                            className="
                            mt-6
                            bg-white
                            border
                            border-gray-300
                            p-6
                            "

                        >



                            <p

                                className="
                                text-4xl
                                md:text-5xl
                                font-black
                                tracking-widest
                                text-gray-900
                                "

                            >

                                {number || "Unavailable"}

                            </p>



                        </div>






                        <p

                            className="
                            mt-6
                            text-gray-600
                            text-lg
                            "

                        >

                            Please save this application number. You will need it to view your application status in the future.

                        </p>




                    </div>









                    <div

                        className="
                        mt-10
                        flex
                        flex-wrap
                        gap-5
                        "

                    >




                        <Link

                            href={
                                number
                                ?
                                `/recruitment/applications?number=${number}`
                                :
                                "/recruitment/applications"
                            }

                            className="
                            inline-flex
                            items-center
                            justify-center
                            bg-[#003B6F]
                            text-white
                            px-8
                            py-4
                            font-bold
                            text-lg
                            shadow-lg
                            hover:bg-[#002B52]
                            transition
                            "

                        >

                            View Application Status →

                        </Link>







                        <Link

                            href="/"

                            className="
                            inline-flex
                            items-center
                            justify-content-center
                            border-2
                            border-[#003B6F]
                            text-[#003B6F]
                            px-8
                            py-4
                            font-bold
                            text-lg
                            hover:bg-gray-100
                            transition
                            "

                        >

                            Return Home

                        </Link>




                    </div>








                    <div

                        className="
                        mt-12
                        border-l-4
                        border-[#F2C94C]
                        bg-gray-50
                        p-6
                        "

                    >



                        <h3

                            className="
                            font-bold
                            text-[#003B6F]
                            text-xl
                            "

                        >

                            What happens next?

                        </h3>





                        <p

                            className="
                            mt-3
                            text-gray-700
                            "

                        >

                            Your application will now be reviewed by authorised Department personnel. If your application progresses, a member of the relevant division may contact you through the details provided.

                        </p>




                    </div>







                </section>





            </div>





        </main>

    );


}
