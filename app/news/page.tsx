import Link from "next/link";
import { supabaseAdmin } from "../lib/supabase-admin";

export const dynamic = "force-dynamic";



export default async function NewsPage(){



    const {
        data:news,
        error
    } = await supabaseAdmin

        .from("news")

        .select(`
            *,
            employees(
                roblox_username,
                email,
                positions(
                    title
                ),
                divisions(
                    name
                )
            )
        `)

        .eq(
            "published",
            true
        )

        .order(
            "date",
            {
                ascending:false
            }
        );





    if(error){

        console.error(
            "NEWS ERROR:",
            error
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
                md:p-14
                "

            >




                <div

                    className="
                    border-b
                    border-gray-200
                    pb-10
                    "

                >


                    <p

                        className="
                        uppercase
                        tracking-[0.2em]
                        text-sm
                        font-bold
                        text-[#003B6F]
                        "

                    >

                        Department of Homeland Security

                    </p>





                    <h1

                        className="
                        mt-4
                        text-5xl
                        font-bold
                        text-[#003B6F]
                        "

                    >

                        News & Press Releases

                    </h1>





                    <p

                        className="
                        mt-5
                        text-lg
                        text-gray-600
                        max-w-3xl
                        "

                    >

                        Official statements, announcements, and public information releases from the Department of Homeland Security.

                    </p>


                </div>









                <div

                    className="
                    mt-12
                    space-y-8
                    "

                >



                {
                    news && news.length > 0

                    ?

                    news.map((item)=>(


                        <article

                            key={item.id}

                            className="
                            relative
                            border
                            border-gray-200
                            bg-white
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







                            <div

                                className="
                                p-8
                                "

                            >





                                <div

                                    className="
                                    flex
                                    justify-between
                                    items-start
                                    gap-5
                                    "

                                >



                                    <div>


                                        <span

                                            className="
                                            inline-block
                                            bg-[#003B6F]
                                            text-white
                                            px-3
                                            py-1
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wide
                                            "

                                        >

                                            {item.category || "News"}

                                        </span>





                                        <h2

                                            className="
                                            mt-4
                                            text-3xl
                                            font-bold
                                            text-gray-900
                                            leading-tight
                                            "

                                        >

                                            {item.title}

                                        </h2>



                                    </div>





                                    <p

                                        className="
                                        text-sm
                                        text-gray-500
                                        whitespace-nowrap
                                        "

                                    >

                                    {
                                        new Date(
                                            item.date || item.created_at
                                        )
                                        .toLocaleDateString()
                                    }


                                    </p>




                                </div>








                                <p

                                    className="
                                    mt-5
                                    text-gray-600
                                    text-lg
                                    leading-relaxed
                                    "

                                >

                                    {item.summary}

                                </p>








                                <div

                                    className="
                                    mt-8
                                    flex
                                    justify-between
                                    items-end
                                    "

                                >



                                    <Link

                                        href={`/news/${item.slug}`}

                                        className="
                                        inline-flex
                                        bg-[#003B6F]
                                        text-white
                                        px-6
                                        py-3
                                        font-bold
                                        hover:bg-[#00284d]
                                        transition
                                        "

                                    >

                                        Read Full Release →

                                    </Link>








                                    <div

                                        className="
                                        text-right
                                        border-l
                                        pl-5
                                        "

                                    >


                                        <p

                                            className="
                                            text-xs
                                            uppercase
                                            tracking-wider
                                            text-gray-500
                                            "

                                        >

                                            Issued by

                                        </p>




                                        <p

                                            className="
                                            font-bold
                                            text-[#003B6F]
                                            "

                                        >

                                            {
                                                item.employees?.roblox_username ||
                                                "DHS Staff"
                                            }

                                        </p>





                                        <p

                                            className="
                                            text-sm
                                            text-gray-600
                                            "

                                        >

                                            {
                                                item.employees?.positions?.title ||
                                                "Staff Member"
                                            }

                                        </p>





                                        {
                                            item.employees?.divisions?.name && (

                                                <p

                                                    className="
                                                    text-xs
                                                    text-gray-500
                                                    "

                                                >

                                                    {
                                                        item.employees.divisions.name
                                                    }

                                                </p>

                                            )
                                        }



                                    </div>




                                </div>







                            </div>





                        </article>


                    ))

                    :


                    <div

                        className="
                        text-center
                        py-16
                        text-gray-500
                        "

                    >

                        No news articles available.

                    </div>


                }



                </div>




            </div>




        </main>


    );


}
