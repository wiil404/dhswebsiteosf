"use client";

import { useState } from "react";
import { supabase } from "../app/lib/supabase";


interface Attachment {

    name:string;

    url:string;

}



export default function FileUpload({

    attachments,

    setAttachments,

    featuredImage,

    setFeaturedImage

}:{

    attachments:Attachment[];

    setAttachments:React.Dispatch<
        React.SetStateAction<Attachment[]>
    >;


    featuredImage:string;

    setFeaturedImage:React.Dispatch<
        React.SetStateAction<string>
    >;


}){


    const [loading,setLoading]=useState(false);



    async function uploadFiles(
        e:React.ChangeEvent<HTMLInputElement>
    ){


        const files=e.target.files;


        if(!files) return;



        setLoading(true);



        for(const file of Array.from(files)){


            const filename =
            `${Date.now()}-${file.name}`;



            const {error}=await supabase
                .storage
                .from("news-files")
                .upload(
                    filename,
                    file
                );



            if(error){

                alert(error.message);

                continue;

            }



            const {data}=supabase
                .storage
                .from("news-files")
                .getPublicUrl(
                    filename
                );



            const url=data.publicUrl;



            // Images become featured image

            if(file.type.startsWith("image/")){


                if(setFeaturedImage){

                    setFeaturedImage(url);

                }


            }

            // Documents stay attachments

            else{


                setAttachments(prev=>[

                    ...prev,

                    {

                        name:file.name,

                        url

                    }

                ]);


            }


        }



        setLoading(false);

        e.target.value="";


    }




    function removeAttachment(url:string){


        setAttachments(prev=>

            prev.filter(
                file=>file.url!==url
            )

        );


    }




    return (

        <section className="mt-8">


            <h2 className="text-xl font-bold">
                Media & Attachments
            </h2>


            <p className="text-gray-600 mt-1">
                Images are displayed on the release. Documents appear as downloads.
            </p>



            <input

                type="file"

                multiple

                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"

                onChange={uploadFiles}

                disabled={loading}

                className="mt-4"

            />



            {
                loading && (

                    <p className="text-blue-600 mt-3">
                        Uploading...
                    </p>

                )
            }



            {
                featuredImage && (

                    <div className="mt-6">

                        <p className="font-semibold">
                            Featured Image
                        </p>


                        <img

                            src={featuredImage}

                            className="mt-3 rounded-lg max-h-96"

                            alt="Featured"

                        />


                    </div>

                )
            }



            {
                attachments.length > 0 && (

                    <div className="mt-6">

                        <p className="font-semibold">
                            Documents
                        </p>



                        <div className="space-y-3 mt-3">


                        {
                            attachments.map(file=>(


                                <div

                                    key={file.url}

                                    className="border rounded p-3 flex justify-between"

                                >

                                    <span>
                                        📄 {file.name}
                                    </span>


                                    <button

                                        type="button"

                                        onClick={()=>
                                            removeAttachment(file.url)
                                        }

                                        className="text-red-600 underline"

                                    >

                                        Remove

                                    </button>


                                </div>


                            ))
                        }


                        </div>


                    </div>

                )
            }


        </section>

    );


}