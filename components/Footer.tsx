export default function Footer(){

    return (

        <footer className="bg-[#003B6F] text-white mt-20">


            <div className="max-w-7xl mx-auto px-6 py-12">


                <div className="grid md:grid-cols-3 gap-10">


                    <div>

                        <h2 className="font-bold text-xl">

                            Department of Homeland Security

                        </h2>


                        <p className="mt-3 text-sm opacity-80">

                            Protecting the Nation Through Service,
                            Security, and Preparedness.

                        </p>


                    </div>





                    <div>


                        <h3 className="font-bold">

                            Quick Links

                        </h3>


                        <ul className="mt-3 space-y-2 text-sm">


                            <li>
                                News
                            </li>


                            <li>
                                Divisions
                            </li>


                            <li>
                                Recruitment
                            </li>


                            <li>
                                Documents
                            </li>


                        </ul>


                    </div>






                    <div>


                        <h3 className="font-bold">

                            Contact

                        </h3>


                        <p className="mt-3 text-sm">

                            Department Headquarters

                            <br />

                            Washington, D.C.

                        </p>


                    </div>



                </div>





                <div className="border-t border-white/30 mt-10 pt-6 text-sm">


                    © {new Date().getFullYear()} Department of Homeland Security


                </div>



            </div>


        </footer>

    );

}