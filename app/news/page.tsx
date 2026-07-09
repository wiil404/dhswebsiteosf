import Link from "next/link";
import { supabase } from "../lib/supabase";


export default async function NewsPage() {

    const { data: news, error } = await supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("date", {
            ascending: false
        });


    if (error) {
        console.error(error);
    }


    return (
        <main className="max-w-6xl mx-auto px-6 py-12">

            <h1 className="text-4xl font-bold mb-8">
                News & Press Releases
            </h1>


            <div className="space-y-6">

                {news && news.length > 0 ? (

                    news.map((item) => (

                        <article
                            key={item.id}
                            className="border rounded-lg p-6"
                        >

                            <p className="text-sm text-gray-500">
                                {item.category} • {item.date}
                            </p>


                            <h2 className="text-2xl font-semibold mt-2">
                                {item.title}
                            </h2>


                            <p className="mt-3 text-gray-700">
                                {item.summary}
                            </p>


                            <Link
                                href={`/news/${item.slug}`}
                                className="inline-block mt-5 font-semibold hover:underline"
                            >
                                Read More →
                            </Link>


                        </article>

                    ))

                ) : (

                    <p>
                        No news articles available.
                    </p>

                )}

            </div>

        </main>
    );
}