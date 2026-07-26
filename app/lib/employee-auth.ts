import { cookies } from "next/headers";
import { supabaseAdmin } from "./supabase-admin";


export async function getEmployeeSession(){


    const cookieStore = await cookies();


    const sessionId =
        cookieStore.get("employee_session")?.value;



    if(!sessionId){

        return null;

    }




    const {

        data:session

    } = await supabaseAdmin

        .from("employee_sessions")

        .select(`

            *,

            employees(

    id,

    roblox_username,

    roblox_user_id,

    employee_number,

    status,

    division_id,

    position_id,

    hire_date,

    appointment_date,

    created_at,

    termination_date,

    email,

    display_name,


    divisions(
        name
    ),


    positions(
        title
    )

)

        `)

        .eq(
            "id",
            sessionId
        )

        .single();





    if(!session){

        return null;

    }




    return session;

}
