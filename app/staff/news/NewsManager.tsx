"use client";


import { useState } from "react";
import Link from "next/link";
import ToggleButton from "./ToggleButton";
import DeleteButton from "./DeleteButton";


export default function NewsManager({
    articles
}:{
    articles:any[]
}){


    const [search,setSearch] = useState("");

    const [filter,setFilter] = useState("All");



    const filtered = articles.filter((article)=>{


        const matchesSearch =
            article.title
            .toLowerCase()
            .includes(search.toLowerCase());


        const matchesFilter =
            filter === "All"
            ||
            (filter==="Published" && article.published)
            ||
            (filter==="Draft" && !article.published);



        return matchesSearch && matchesFilter;


    });




    return (

        <div>


            <div className="flex gap-4 mb-8">


                <input

                    className="border p-3 flex-1 rounded"

                    placeholder="Search releases..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />



                <select

                    className="border p-3 rounded"

                    value={filter}

                    onChange={(e)=>setFilter(e.target.value)}

                >

                    <option>
                        All
                    </option>

                    <option>
                        Published
                    </option>

                    <option>
                        Draft
                    </option>


                </select>


            </div>




            <div className="space-y-6">


                {
                    filtered.map((article)=>(


                    <article

                        key={article.id}

                        className="border rounded-lg p-6"

                    >


                        <div className="flex justify-between">


                            <div>


                                <h2 className="text-2xl font-bold">
                                    {article.title}
                                </h2>


                                <p className="text-gray-500 mt-2">
                                    {article.category}
                                    {" • "}
                                    {article.date}
                                </p>


                            </div>



                            <span

                                className={
                                    article.published
                                    ?
                                    "text-green-600 font-bold"
                                    :
                                    "text-orange-600 font-bold"
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




                        <div className="flex gap-5 mt-6 items-center">


                            <Link
                                href={`/news/${article.slug}`}
                                className="underline"
                            >
                                View
                            </Link>



                            <Link

                                href={`/staff/news/edit/${article.id}`}

                                className="underline"

                            >

                                Edit

                            </Link>



                            <ToggleButton

                                id={article.id}

                                published={article.published}

                            />



                            <DeleteButton
                                id={article.id}
                            />


                        </div>



                    </article>


                    ))
                }


            </div>


        </div>

    );

}