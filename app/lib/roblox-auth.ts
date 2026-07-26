export function getRobloxLoginURL(){

    const params = new URLSearchParams({

        client_id:
        process.env.ROBLOX_CLIENT_ID!,

        response_type:"code",

        redirect_uri:
        process.env.ROBLOX_REDIRECT_URI!,

        scope:"openid profile"

    });


    return (

        "https://apis.roblox.com/oauth/v1/authorize?"

        +

        params.toString()

    );

}