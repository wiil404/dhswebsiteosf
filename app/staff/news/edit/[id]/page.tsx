"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from "../../../../../components/Editor";


export default function EditNewsPage() {


    const router = useRouter();
    const params = useParams();

    const id = String(params.id);



    const [title,setTitle] = useState("");
    const [slug,setSlug] = useState("");
    const [category,setCategory] = useState("Press Release");
    const [summary,setSummary] = useState("");
    const [content,setContent] = useState("");
    const [published,setPublished] = useState(true);

    const [loading,setLoading] = useState(true);







    useEffect(()=>{


        async function fetchArticle(){


            try{


                const response = await fetch(
                    `/api/news/get?id=${id}`
                );



                const data = await response.json();




                if(data.error){

                    alert(data.error);

                    return;

                }



                setTitle(data.title ?? "");

                setSlug(data.slug ?? "");

                setCategory(
                    data.category ?? "Press Release"
                );

                setSummary(
                    data.summary ?? ""
                );

                setContent(
                    data.content ?? ""
                );

                setPublished(
                    data.published ?? true
                );


            }
            catch(error){


                console.error(error);

                alert(
                    "Failed to load article"
                );


            }



            setLoading(false);


        }



        fetchArticle();


    },[id]);









    async function saveArticle(){


        setLoading(true);



        try{


            const response = await fetch(

                "/api/news/update",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },


                    body:JSON.stringify({

                        id,

                        title,

                        slug,

                        category,

                        summary,

                        content,

                        published

                    })


                }

            );





            const result =
                await response.json();





            if(result.error){


                alert(result.error);

                setLoading(false);

                return;


            }





            router.push(
                "/staff/news"
            );



        }
        catch(error){


            console.error(error);


            alert(
                "Failed to save article"
            );


            setLoading(false);


        }


    }









    if(loading){


        return (

            <main className="
            relative
            min-h-screen
            py-16
            ">


                <Background />


                <section className="
                relative
                max-w-4xl
                mx-auto
                px-6
                ">


                    <div className="
                    bg-white
                    shadow-2xl
                    p-10
                    ">

                        Loading...

                    </div>


                </section>


            </main>

        );


    }









    return (


        <main

            className="
            relative
            min-h-screen
            py-16
            "

        >


            <Background />






            <section

                className="
                relative
                max-w-5xl
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



                    {/* GOLD DHS BAR */}

                    <div

                        className="
                        h-2
                        bg-[#F2C94C]
                        "

                    />







                    <div

                        className="
                        p-8
                        md:p-12
                        "

                    >





                        <header

                            className="
                            border-b
                            pb-8
                            "

                        >


                            <p className="
                            uppercase
                            tracking-widest
                            text-sm
                            font-bold
                            text-[#003B6F]
                            ">

                                Internal DHS Staff Portal

                            </p>




                            <h1 className="
                            mt-4
                            text-4xl
                            md:text-5xl
                            font-bold
                            text-[#003B6F]
                            ">

                                Edit Press Release

                            </h1>



                            <p className="
                            mt-3
                            text-gray-600
                            ">

                                Update and manage official Department of Homeland Security publications.

                            </p>


                        </header>









                        <div className="mt-8 space-y-5">





                            <input

                                className="
                                w-full
                                border
                                p-4
                                rounded
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#003B6F]
                                "

                                placeholder="Title"

                                value={title}

                                onChange={(e)=>
                                    setTitle(e.target.value)
                                }

                            />







                            <input

                                className="
                                w-full
                                border
                                p-4
                                rounded
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#003B6F]
                                "

                                placeholder="Slug"

                                value={slug}

                                onChange={(e)=>
                                    setSlug(e.target.value)
                                }

                            />







                            <select

                                className="
                                w-full
                                border
                                p-4
                                rounded
                                "

                                value={category}

                                onChange={(e)=>
                                    setCategory(e.target.value)
                                }

                            >


                                <option>
                                    Press Release
                                </option>


                                <option>
                                    Public Notice
                                </option>


                                <option>
                                    Statement
                                </option>


                            </select>







                            <textarea

                                className="
                                w-full
                                border
                                p-4
                                rounded
                                "

                                placeholder="Summary"

                                rows={4}

                                value={summary}

                                onChange={(e)=>
                                    setSummary(e.target.value)
                                }

                            />








                            <Editor

                                value={content}

                                onChange={setContent}

                            />







                            <div className="
                            bg-gray-50
                            border
                            p-5
                            rounded
                            flex
                            items-center
                            gap-3
                            ">


                                <input

                                    type="checkbox"

                                    checked={published}

                                    onChange={(e)=>
                                        setPublished(
                                            e.target.checked
                                        )
                                    }

                                />


                                <span className="
                                font-semibold
                                ">

                                    Publish Article

                                </span>


                            </div>








                            <button

                                onClick={saveArticle}

                                disabled={loading}

                                className="
                                mt-4
                                bg-[#003B6F]
                                text-white
                                px-8
                                py-3
                                rounded
                                font-bold
                                hover:bg-[#00284d]
                                transition
                                "

                            >

                                Save Changes


                            </button>





                        </div>



                    </div>



                </div>



            </section>



        </main>


    );


}








function Background(){


    return (

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

    );


}
