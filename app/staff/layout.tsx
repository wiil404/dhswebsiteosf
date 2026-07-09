import Link from "next/link";


export default function StaffLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    return (

        <div>


            <nav className="bg-[#003B6F] text-white px-6 py-4">


                <div className="max-w-6xl mx-auto flex gap-6 items-center">


                    <Link
                        href="/staff/dashboard"
                        className="font-bold"
                    >
                        DHS Staff Portal
                    </Link>



                    <Link
                        href="/staff/news"
                        className="hover:underline"
                    >
                        News Management
                    </Link>



                    <Link
                        href="/staff/users"
                        className="hover:underline"
                    >
                        Staff Management
                    </Link>



                </div>


            </nav>



            {children}


        </div>

    );

}