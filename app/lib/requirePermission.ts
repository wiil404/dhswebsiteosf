import { redirect } from "next/navigation";
import { hasPermission, getProfile } from "./permissions";


export async function requirePermission(
    permission: string | string[]
){

    const profile = await getProfile();



    if(!profile){

        redirect("/staff/login");

    }



export async function hasPermission(permission:string)



    if(!allowed){

        redirect("/staff/dashboard");

    }



    return profile;

}
