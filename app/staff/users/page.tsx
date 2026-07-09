import { redirect } from "next/navigation";
import { requirePermission } from "../../lib/requirePermission";
import UserManager from "./UserManager";


export default async function StaffUsersPage(){


    const profile = await requirePermission(
        "staff.manage"
    );



    if(!profile){

        redirect("/staff/login");

    }



    if(profile.role !== "Administrator"){

        redirect("/staff/news");

    }



    return (

        <main className="max-w-6xl mx-auto px-6 py-12">


            <h1 className="text-4xl font-bold">

                Staff Management

            </h1>



            <p className="mt-2 text-gray-600">

                Manage DHS staff accounts and permissions.

            </p>



            <UserManager />


        </main>

    );

}