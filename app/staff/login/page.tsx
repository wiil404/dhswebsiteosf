"use client";

import { useState } from "react";
import { supabaseBrowser } from "../../lib/supabase-browser";
import { useRouter } from "next/navigation";


export default function LoginPage(){

    const router = useRouter();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");


    async function login(){

        const {error} = await supabaseBrowser.auth.signInWithPassword({
            email,
            password
        });


        if(error){
            setError(error.message);
            return;
        }


        router.push("/staff/dashboard");

    }


    return (

        <main className="max-w-md mx-auto px-6 py-12">

            <h1 className="text-3xl font-bold">
                DHS Staff Portal
            </h1>


            <p className="mt-2 text-gray-600">
                Authorised personnel only.
            </p>


            <input
                className="border p-3 w-full mt-6"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
            />


            <input
                className="border p-3 w-full mt-4"
                placeholder="Password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
            />


            <button
                onClick={login}
                className="mt-6 bg-[#003B6F] text-white px-5 py-3"
            >
                Login
            </button>


            {error && (
                <p className="text-red-600 mt-4">
                    {error}
                </p>
            )}

        </main>

    );
}