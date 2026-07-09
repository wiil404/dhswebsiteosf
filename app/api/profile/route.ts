import { NextResponse } from "next/server";
import { getProfile } from "../../lib/permissions";


export async function GET(){

    const profile = await getProfile();


    if(!profile){

        return NextResponse.json(
            {
                error:"Not authenticated"
            },
            {
                status:401
            }
        );

    }



    return NextResponse.json(profile);

}