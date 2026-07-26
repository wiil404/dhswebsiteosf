export function getRobloxLoginURL(){

    const clientId = process.env.ROBLOX_CLIENT_ID;

    const redirectUri = process.env.ROBLOX_REDIRECT_URI;


    if(!clientId || !redirectUri){

        return "#";

    }


    const params = new URLSearchParams({

        client_id: clientId,

        response_type: "code",

        redirect_uri: redirectUri,

        scope: "profile",

    });


    return `https://apis.roblox.com/oauth/v1/authorize?${params.toString()}`;

}
