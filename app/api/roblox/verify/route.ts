import { NextResponse } from "next/server";


const GROUP_ID = 1025445;


export async function POST(
    request:Request
){

    const {
        username
    } = await request.json();



    if(!username){

        return NextResponse.json(
            {
                error:"Username required"
            },
            {
                status:400
            }
        );

    }





    try{


        /*
            Convert username -> Roblox ID
        */

        const userResponse = await fetch(

            "https://users.roblox.com/v1/usernames/users",

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    usernames:[
                        username
                    ],

                    excludeBannedUsers:true

                })

            }

        );




        const userData =
        await userResponse.json();





        if(
            !userData.data ||
            userData.data.length === 0
        ){

            return NextResponse.json({

                valid:false,

                error:
                "Roblox account not found."

            });

        }





        const user =
        userData.data[0];





        /*
            Check group membership
        */


        const groupResponse =
        await fetch(

            `https://groups.roblox.com/v2/users/${user.id}/groups/roles`

        );




        const groups =
        await groupResponse.json();





        const member =
        groups.data?.some(
            (group:any)=>
                group.group.id === GROUP_ID
        );







        if(!member){


            return NextResponse.json({

                valid:false,

                error:
                "You must be a member of OSFUSA before applying."

            });


        }






        return NextResponse.json({

            valid:true,

            username:user.name,

            userId:String(user.id)

        });



    }

    catch(error){


        return NextResponse.json(

            {

                valid:false,

                error:
                "Unable to verify Roblox account."

            },

            {
                status:500
            }

        );


    }


}