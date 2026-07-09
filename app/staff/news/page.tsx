import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { redirect } from "next/navigation";
import { requirePermission } from "../../lib/requirePermission";

import {
    getProfile,
    canCreateNews,
    canEditNews,
    canDeleteNews,
    canPublishNews
} from "../../lib/permissions";


import DeleteButton from "./DeleteButton";
import ToggleButton from "./ToggleButton";





export default async function StaffNewsPage(){


    const profile = await requirePermission(
        "news.edit"
    );



    if(!profile){

        redirect("/staff/login");

    }




    const createAllowed =
        await canCreateNews();



    const editAllowed =
        await canEditNews();



    const deleteAllowed =
        await canDeleteNews();



    const publishAllowed =
        await canPublishNews();







    const {
        data:articles,
        error
    } = await supabase

        .from("news")

        .select("*")

        .order(
            "date",
            {
                ascending:false
            }
        );








    return (

        <main className="max-w-6xl mx-auto px-6 py-12">



            <div className="flex justify-between items-center">


                <div>


                    <h1 className="text-4xl font-bold">

                        Manage News

                    </h1>



                    <p className="mt-2 text-gray-600">

                        Create, edit and manage DHS releases.

                    </p>




                    <p className="mt-2 text-sm text-gray-500">

                        Role: {profile.role}

                    </p>



                </div>





                {
                    createAllowed && (

                        <Link

                            href="/staff/news/create"

                            className="bg-[#003B6F] text-white px-5 py-3 rounded"

                        >

                            New Release

                        </Link>

                    )
                }



            </div>







            {
                error && (

                    <p className="text-red-600 mt-6">

                        {error.message}

                    </p>

                )
            }









            <div className="mt-10 space-y-6">


                {
                    articles?.map((article)=>(



                        <article

                            key={article.id}

                            className="border rounded-lg p-6"

                        >




                            <div className="flex justify-between">


                                <div>


                                    <h2 className="text-2xl font-bold">

                                        {article.title}

                                    </h2>



                                    <p className="text-sm text-gray-500 mt-2">

                                        {article.category} • {article.date}

                                    </p>



                                </div>




                                <span

                                    className={
                                        article.published

                                        ?

                                        "text-green-700"

                                        :

                                        "text-orange-600"
                                    }

                                >

                                    {
                                        article.published
                                        ?
                                        "Published"
                                        :
                                        "Draft"
                                    }


                                </span>



                            </div>







                            <p className="mt-4">

                                {article.summary}

                            </p>








                            <div className="flex gap-5 mt-6">





                                <Link

                                    href={`/news/${article.slug}`}

                                    className="underline"

                                >

                                    View

                                </Link>







                                {
                                    editAllowed && (

                                        <Link

                                            href={`/staff/news/edit/${article.id}`}

                                            className="underline"

                                        >

                                            Edit

                                        </Link>

                                    )
                                }








                                {
                                    publishAllowed && (

                                        <ToggleButton

                                            id={article.id}

                                            published={article.published}

                                        />

                                    )
                                }







                                {
                                    deleteAllowed && (

                                        <DeleteButton

                                            id={article.id}

                                        />

                                    )
                                }







                            </div>






                        </article>



                    ))
                }



            </div>






        </main>

    );

}