import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";


export async function GET(
    request:Request,
    {
        params
    }:{
        params:{
            id:string
        }
    }
){

    const {data,error}=await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id",params.id)
        .single();


    if(error){

        return NextResponse.json(
            {
                error:error.message
            },
            {
                status:500
            }
        );

    }


    return NextResponse.json(data);

}