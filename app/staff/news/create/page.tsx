"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Editor from "../../../../components/Editor";
import FileUpload from "../../../../components/FileUpload";


export default function CreateNews(){

    const router = useRouter();


    const [title,setTitle] = useState("");
    const [slug,setSlug] = useState("");
    const [category,setCategory] = useState("Press Release");
    const [summary,setSummary] = useState("");
    const [content,setContent] = useState("");

    const [published,setPublished] = useState(true);

    const [featured,setFeatured] = useState(false);


    const [attachments,setAttachments] = useState<
        {
            name:string;
            url:string;
        }[]
    >([]);


    const [featuredImage,setFeaturedImage] = useState("");

    const [loading,setLoading] = useState(false);

    const [checkingPermission,setCheckingPermission] = useState(true);





    useEffect(()=>{


        async function checkPermission(){


            const response = await fetch(
                "/api/profile"
            );



            if(!response.ok){

                router.push("/staff/login");

                return;

            }



            const profile = await response.json();



            if(
                profile.role === "Administrator" ||
                profile.role === "Editor" ||
                profile.role === "Public Affairs Officer"
            ){

                setCheckingPermission(false);

            }
            else{

                router.push("/staff/news");

            }


        }



        checkPermission();


    },[]);








    function generateSlug(value:string){


        return value

            .toLowerCase()

            .trim()

            .replace(
                /[^a-z0-9]+/g,
                "-"
            )

            .replace(
                /^-+|-+$/g,
                "" 
            );


    }








    async function createArticle(){


        setLoading(true);



        try{


            const response = await fetch(
                "/api/news/create",
                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json"

                    },


                    body:JSON.stringify({

                        title,

                        slug,

                        category,

                        summary,

                        content,

                        published,

                        featured,

                        attachments,

                        featuredImage

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




            router.push("/staff/news");


        }
        catch(error){


            console.error(
                "CREATE ERROR:",
                error
            );


            alert(
                "Something went wrong creating the article"
            );


            setLoading(false);


        }


    }







    if(checkingPermission){


        return (

            <main className="max-w-4xl mx-auto px-6 py-12">

                <h1 className="text-2xl font-bold">

                    Checking permissions...

                </h1>

            </main>

        );

    }







    return (

        <main className="max-w-4xl mx-auto px-6 py-12">


            <h1 className="text-4xl font-bold text-[#003B6F]">

                Create Press Release

            </h1>





            <input

                className="border p-3 w-full mt-6 rounded"

                placeholder="Title"

                value={title}

                onChange={(e)=>{


                    const value=e.target.value;


                    setTitle(value);


                    setSlug(
                        generateSlug(value)
                    );


                }}

            />







            <input

                className="border p-3 w-full mt-4 rounded"

                placeholder="Slug"

                value={slug}

                onChange={(e)=>
                    setSlug(e.target.value)
                }

            />







            <select

                className="border p-3 w-full mt-4 rounded"

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

                className="border p-3 w-full mt-4 rounded"

                placeholder="Summary"

                rows={3}

                value={summary}

                onChange={(e)=>
                    setSummary(e.target.value)
                }

            />







            <Editor

                value={content}

                onChange={setContent}

            />







            <FileUpload

                attachments={attachments}

                setAttachments={setAttachments}

                featuredImage={featuredImage}

                setFeaturedImage={setFeaturedImage}

            />









            <div className="mt-6 space-y-3 border rounded-lg p-5 bg-gray-50">


                <label className="flex items-center gap-3">


                    <input

                        type="checkbox"

                        checked={published}

                        onChange={(e)=>
                            setPublished(e.target.checked)
                        }

                    />


                    <span className="font-semibold">

                        Publish immediately

                    </span>


                </label>






                <label

                    className={`
                        flex
                        items-center
                        gap-3
                        ${
                            !published
                            ?
                            "opacity-50"
                            :
                            ""
                        }
                    `}

                >


                    <input

                        type="checkbox"

                        disabled={!published}

                        checked={featured}

                        onChange={(e)=>
                            setFeatured(e.target.checked)
                        }

                    />



                    <span className="font-semibold">

                        Feature on homepage statement block

                    </span>



                </label>





                {
                    featured && published && (

                        <p className="text-sm text-[#003B6F]">

                            This release will appear as the main featured statement on the DHS homepage.

                        </p>

                    )
                }


            </div>







            <button

                onClick={createArticle}

                disabled={loading}

                className="
                    mt-6
                    bg-[#003B6F]
                    text-white
                    px-6
                    py-3
                    rounded
                    font-semibold
                    hover:bg-[#00284d]
                "

            >

                {
                    loading
                    ?
                    "Saving..."
                    :
                    published
                    ?
                    "Publish Release"
                    :
                    "Save as Draft"
                }


            </button>





        </main>

    );

}