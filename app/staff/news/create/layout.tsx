import { redirect } from "next/navigation";
import { getProfile, hasPermission } from "../../../lib/permissions";


export default async function Layout({
    children
}: {
    children: React.ReactNode
}) {


    const profile =
        await getProfile();



    if(!profile){

        redirect("/staff/login");

    }





    const permissionAllowed =
        await hasPermission(
            "news.create"
        );






    const roleAllowed =

        profile.role === "Administrator" ||

        profile.role === "Editor" ||

        profile.role === "Public Affairs Officer";







    if(
        !permissionAllowed &&
        !roleAllowed
    ){

        redirect("/staff/dashboard");

    }







    return (

        <>
            {children}
        </>

    );

}
