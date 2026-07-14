import { createClient } from "./supabase-server";


export type Role =
    | "Administrator"
    | "Editor"
    | "Public Affairs Officer"
    | "Viewer";





export async function getProfile(){

    const supabase =
        await createClient();



    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();



    if(!user){

        return null;

    }




    const {
        data:profile,
        error

    } = await supabase

    .from("profiles")

    .select("*")

    .eq(
        "id",
        user.id
    )

    .single();




    if(error || !profile){

        console.error(
            "PROFILE ERROR:",
            error
        );

        return null;

    }





    const {
        data:employee

    } = await supabase


    .from("employees")

    .select(`

        id,
        position_id,
        roblox_username,

        positions(
            id,
            title
        )

    `)

    .eq(
        "user_id",
        user.id
    )

    .maybeSingle();





    return {

        ...profile,

        employee

    };


}









export async function hasPermission(
    permission:string | string[]
){


    const profile =
        await getProfile();





    if(!profile){

        return false;

    }





    /*
        Administrator bypass
    */

    if(
        profile.role === "Administrator"
    ){

        return true;

    }





    /*
        Public Affairs / Editor news access
    */

    const requested =
        Array.isArray(permission)
        ?
        permission
        :
        [permission];





    if(
        requested.some(
            p => p.startsWith("news.")
        )
    ){

        if(
            profile.role === "Editor" ||
            profile.role === "Public Affairs Officer"
        ){

            return true;

        }

    }





    /*
        Database permission check
    */


    if(
        !profile.employee?.position_id
    ){

        return false;

    }






    const supabase =
        await createClient();






    const {

        data,

        error

    } = await supabase


    .from("position_permissions")


    .select(`

        permissions(
            name
        )

    `)


    .eq(
        "position_id",
        profile.employee.position_id
    );







    if(error){

        console.error(
            "PERMISSION ERROR:",
            error
        );

        return false;

    }







    return data?.some(

        (item:any)=>

            requested.includes(
                item.permissions?.name
            )

    ) || false;



}









/*
    News Permissions
*/



export async function canCreateNews(){

    return await hasPermission(
        "news.create"
    );

}





export async function canEditNews(){

    return await hasPermission(
        "news.edit"
    );

}





export async function canDeleteNews(){

    return await hasPermission(
        "news.delete"
    );

}





export async function canPublishNews(){

    return await hasPermission(
        "news.publish"
    );

}





/*
    Staff Management
*/



export async function canManageUsers(){

    return await hasPermission(
        "staff.manage"
    );

}





export async function canPromoteEmployees(){

    return await hasPermission(
        "EMPLOYEE_PROMOTE"
    );

}





export async function canDemoteEmployees(){

    return await hasPermission(
        "staff.demote"
    );

}





export async function canEditEmployees(){

    return await hasPermission(
        "EMPLOYEES_EDIT"
    );

}





export async function canManagePermissions(){

    return await hasPermission(
        "staff.permissions"
    );

}
