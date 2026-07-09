"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function Navbar(){

    const [menuOpen, setMenuOpen] = useState(false);



    return (

        <header className="w-full bg-[#003B6F] text-white">


            <div className="px-10">


                <div className="relative h-40 flex items-center justify-between">



                    {/* Secretary */}

                    <Link

                        href="/secretary"

                        className="
                            font-bold
                            text-lg
                            tracking-wide
                            hover:underline
                        "

                    >

                        SECRETARY CHEDVN

                    </Link>








                    {/* Logo */}

                    <Link

                        href="/"

                        className="
                            absolute
                            left-1/2
                            -translate-x-1/2
                        "

                    >

                        <Image

                          src="/hero/DHSLogo.png"

                          alt="Department of Homeland Security"

                          width={220}

                          height={120}

                          priority

                          className="
                              object-contain
                              w-[220px]
                              h-auto
                          "

                      />


                    </Link>








                    {/* Two line menu button */}

                    <button

                        onClick={()=>setMenuOpen(true)}

                        className="
                            flex
                            flex-col
                            gap-2
                            ml-auto
                        "

                        aria-label="Open menu"

                    >

                        <span 
                            className="
                                block 
                                w-10 
                                h-[3px] 
                                bg-white
                            "
                        />

                        <span 
                            className="
                                block 
                                w-10 
                                h-[3px] 
                                bg-white
                            "
                        />


                    </button>



                </div>


            </div>









            {/* Sidebar Overlay */}


            {
                menuOpen && (


                    <div

                        className="
                            fixed
                            inset-0
                            bg-black/40
                            z-40
                        "

                        onClick={()=>setMenuOpen(false)}

                    />

                )
            }








            {/* Sidebar */}


            <aside

                className={`
                    fixed
                    top-0
                    right-0
                    h-full
                    w-96
                    bg-white
                    text-[#003B6F]
                    z-50
                    shadow-xl
                    transform
                    transition-transform
                    duration-300
                    ${
                        menuOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                    }
                `}

            >



                <div className="p-8">



                    <button

                        onClick={()=>setMenuOpen(false)}

                        className="
                            text-3xl
                            mb-10
                        "

                    >

                        ×

                    </button>







                    <nav className="flex flex-col gap-6 text-xl font-semibold">


                        <Link href="/">
                            Home
                        </Link>


                        <Link href="/about">
                            About DHS
                        </Link>


                        <Link href="/divisions">
                            Our Mission
                        </Link>


                        <Link href="/news">
                            News
                        </Link>


                        <Link href="/documents">
                            Resources
                        </Link>


                        <Link href="/recruitment">
                            Careers
                        </Link>


                        <Link href="/staff/dashboard">
                            Staff Portal
                        </Link>


                    </nav>



                </div>



            </aside>




        </header>

    );

}