"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from "../../../../../components/Editor";


export default function EditNewsPage() {

    const router = useRouter();
    const params = useParams();

    const id = String(params.id);


    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("Press Release");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(true);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        async function fetchArticle() {

            try {

                const response = await fetch(
                    `/api/news/get?id=${id}`
                );


                const data = await response.json();


                if (data.error) {

                    alert(data.error);
                    return;

                }


                setTitle(data.title ?? "");
                setSlug(data.slug ?? "");
                setCategory(data.category ?? "Press Release");
                setSummary(data.summary ?? "");
                setContent(data.content ?? "");
                setPublished(data.published ?? true);


            } catch (error) {

                console.error(error);

                alert("Failed to load article");

            }


            setLoading(false);

        }


        fetchArticle();


    }, [id]);




    async function saveArticle() {

        setLoading(true);


        try {


            const response = await fetch(
                "/api/news/update",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        id: id,

                        title: title,

                        slug: slug,

                        category: category,

                        summary: summary,

                        content: content,

                        published: published

                    })

                }
            );



            const result = await response.json();



            if (result.error) {

                alert(result.error);

                setLoading(false);

                return;

            }



            router.push("/staff/news");



        } catch (error) {

            console.error(error);

            alert("Failed to save article");

            setLoading(false);

        }

    }




    if (loading) {

        return (

            <main className="max-w-4xl mx-auto px-6 py-12">

                Loading...

            </main>

        );

    }




    return (

        <main className="max-w-4xl mx-auto px-6 py-12">


            <h1 className="text-4xl font-bold">
                Edit Press Release
            </h1>



            <input

                className="border p-3 w-full mt-6"

                placeholder="Title"

                value={title}

                onChange={(e) => setTitle(e.target.value)}

            />



            <input

                className="border p-3 w-full mt-4"

                placeholder="Slug"

                value={slug}

                onChange={(e) => setSlug(e.target.value)}

            />



            <select

                className="border p-3 w-full mt-4"

                value={category}

                onChange={(e) => setCategory(e.target.value)}

            >

                <option value="Press Release">
                    Press Release
                </option>

                <option value="Public Notice">
                    Public Notice
                </option>

                <option value="Statement">
                    Statement
                </option>


            </select>




            <textarea

                className="border p-3 w-full mt-4"

                placeholder="Summary"

                rows={3}

                value={summary}

                onChange={(e) => setSummary(e.target.value)}

            />




            <Editor
                value={content}
                onChange={setContent}
            />




            <div className="flex items-center gap-3 mt-4">


                <input

                    type="checkbox"

                    checked={published}

                    onChange={(e) => setPublished(e.target.checked)}

                />


                <p>
                    Publish Article
                </p>


            </div>




            <button

                onClick={saveArticle}

                disabled={loading}

                className="mt-6 bg-[#003B6F] text-white px-6 py-3 rounded"

            >

                Save Changes


            </button>



        </main>

    );

}