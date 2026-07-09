import { NextResponse } from "next/server";


export async function GET(
    request: Request
){

    const { searchParams } =
        new URL(request.url);


    const userId =
        searchParams.get("userId");



    if(!userId){

        return NextResponse.json(
            {
                error:"Missing Roblox User ID"
            },
            {
                status:400
            }
        );

    }





    try{


        const response =
            await fetch(
                `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=true`,
                {
                    cache:"no-store"
                }
            );



        const data =
            await response.json();




        return NextResponse.json({

            imageUrl:
                data?.data?.[0]?.imageUrl || null

        });



    }
    catch(error){


        console.error(
            "ROBLOX AVATAR ERROR:",
            error
        );



        return NextResponse.json({

            imageUrl:null

        });


    }


}