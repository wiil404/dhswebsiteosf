import { redirect } from "next/navigation";
import { getProfile } from "../../../lib/permissions";
import { canCreate } from "../../../lib/roles";


export default async function Layout({
    children
}: {
    children: React.ReactNode
}) {


    const profile = await getProfile();



    if(!profile){

        redirect("/staff/login");

    }



    if(!canCreate(profile.role)){

        redirect("/staff/dashboard");

    }



    return (
        <>
            {children}
        </>
    );

}