import { redirect } from "next/navigation";
import { hasPermission, getProfile } from "./permissions";


export async function requirePermission(
    permission: string | string[]
){

    const profile =
        await getProfile();



    if(!profile){

        redirect("/staff/login");

    }



    const allowed =
        await hasPermission(permission);



    if(!allowed){

        redirect("/staff/dashboard");

    }



    return profile;

}
