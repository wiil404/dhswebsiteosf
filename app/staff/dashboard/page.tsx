import Link from "next/link";
import { redirect } from "next/navigation";

import { getUser } from "../../lib/auth";

import {
    getProfile,
    canCreateNews,
    canManageUsers,
    canEditNews,
    canDeleteNews,
    hasPermission
} from "../../lib/permissions";

import { supabaseAdmin } from "../../lib/supabase-admin";

import { logout } from "../actions/logout";



export default async function Dashboard(){


    const user = await getUser();


    if(!user){

        redirect("/staff/login");

    }



    const profile = await getProfile();



    if(!profile){

        redirect("/staff/login");

    }





    /*
        Get employee information
    */


    const {

        data:employee

    } = await supabaseAdmin

        .from("employees")

        .select(`
            roblox_username,
            roblox_user_id,
            email,

            positions(
                title
            ),

            divisions(
                name
            )

        `)

        .eq(
            "user_id",
            user.id
        )

        .single();








    const createNews =
        await canCreateNews();



    const editNews =
        await canEditNews();



    const deleteNews =
        await canDeleteNews();



    const manageUsers =
        await canManageUsers();



    const viewAudit =
        await hasPermission(
            "audit.view"
        );



    const manageOrganisation =
        profile.role === "Administrator";







    return (

        <main className="max-w-6xl mx-auto px-6 py-12">



            <div className="
                flex
                justify-between
                items-center
                border-b
                pb-8
            ">


                <div>


                    <h1 className="
                        text-4xl
                        font-bold
                        text-[#003B6F]
                    ">

                        DHS Staff Dashboard

                    </h1>



                    <p className="mt-2 text-gray-600">

                        Welcome back, {employee?.roblox_username || profile.email}

                    </p>


                </div>





                <form action={logout}>


                    <button

                        className="
                            bg-red-600
                            text-white
                            px-5
                            py-2
                            rounded
                            font-semibold
                            hover:bg-red-700
                        "

                    >

                        Logout

                    </button>


                </form>


            </div>









            {/* Staff Profile */}


            <div className="
                mt-8
                border
                rounded-lg
                p-6
                bg-gray-50
                flex
                items-center
                gap-5
            ">



                <div className="
                    w-16
                    h-16
                    rounded-full
                    bg-[#003B6F]
                    text-white
                    flex
                    items-center
                    justify-center
                    text-2xl
                    font-bold
                ">


                    {
                        employee?.roblox_username
                        ?.charAt(0)
                        ||
                        profile.email.charAt(0)
                    }


                </div>





                <div>


                    <h2 className="text-xl font-bold">


                        {
                            employee?.roblox_username ||
                            profile.email
                        }


                    </h2>




                    <p className="text-gray-600">


                        {
                            employee?.positions?.[0]?.title ||
                            "Staff Member"
                        }


                    </p>




                    <p className="text-sm text-gray-500">


                        {
                            employee?.divisions?.[0]?.name ||
                            "Department of Homeland Security"
                        }


                    </p>




                    <p className="text-sm text-gray-500 mt-1">

                        Role: {profile.role}

                    </p>


                </div>



            </div>









            <div className="mt-10 grid md:grid-cols-2 gap-6">






                {
                    createNews && (

                        <PortalCard

                            href="/staff/news/create"

                            title="Create Press Release"

                            description="Publish new DHS statements, notices and releases."

                        />

                    )
                }







                {
                    (
                        editNews ||
                        deleteNews
                    ) && (

                        <PortalCard

                            href="/staff/news"

                            title="Manage News Releases"

                            description="Edit, publish and manage existing releases."

                        />

                    )
                }







                {
                    manageUsers && (

                        <PortalCard

                            href="/staff/users"

                            title="Staff Management"

                            description="Manage staff accounts, roles and permissions."

                        />

                    )
                }







                {
                    manageOrganisation && (

                        <PortalCard

                            href="/staff/organisation"

                            title="Organisation Management"

                            description="Manage divisions, positions and department structure."

                        />

                    )
                }







                {
                    manageUsers && (

                        <PortalCard

                            href="/staff/employees"

                            title="Employee Directory"

                            description="View and manage DHS personnel records."

                        />

                    )
                }








                <PortalCard

                    href="/news"

                    title="Public News Portal"

                    description="View published DHS releases."

                />







                {
                    viewAudit && (

                        <PortalCard

                            href="/staff/audit"

                            title="Audit Logs"

                            description="Review staff actions and system activity."

                        />

                    )
                }





            </div>



        </main>

    );


}









function PortalCard({

    href,
    title,
    description

}:{

    href:string;
    title:string;
    description:string;

}){


    return (

        <Link

            href={href}

            className="
                border
                rounded-lg
                p-6
                hover:bg-gray-50
                transition
                shadow-sm
            "

        >


            <h2 className="
                text-xl
                font-bold
                text-[#003B6F]
            ">

                {title}

            </h2>



            <p className="mt-2 text-gray-600">

                {description}

            </p>



        </Link>

    );


}