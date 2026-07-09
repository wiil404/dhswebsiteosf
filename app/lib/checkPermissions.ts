import { createClient } from "./supabase-server";


export async function hasPermission(
    permission:string
){

    const supabase = await createClient();



    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();



    if(!user){

        return false;

    }



    // Administrators always have access

    const {
        data:profile
    } = await supabase

        .from("profiles")

        .select("role")

        .eq(
            "id",
            user.id
        )

        .single();



    if(profile?.role === "Administrator"){

        return true;

    }




    const {
        data
    } = await supabase

        .from("user_permissions")

        .select(`
            permissions(
                name
            )
        `)

        .eq(
            "user_id",
            user.id
        );




    return data?.some(
        (item:any)=>
            item.permissions?.name === permission
    ) || false;


}