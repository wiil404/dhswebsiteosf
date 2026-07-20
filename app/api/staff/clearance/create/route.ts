import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { getUser } from "@/app/lib/auth";



export async function POST(
request: Request
){


try{


const user =
await getUser();



if(!user){


return NextResponse.json(

{
error:"Not authenticated"
},

{
status:401
}

);


}






const body =
await request.json();





const {

mode,

subject_name,

organisation,

subject_type,

roblox_username,

roblox_user_id,


clearance_level,


white_house,

capitol,

dhs,

airport,


blacklisted,

blacklist_reason,

blacklist_areas


} = body;









if(
mode === "individual" &&
!roblox_username
){


return NextResponse.json(

{
error:"Roblox username required"
},

{
status:400
}

);


}







if(
mode === "organisation" &&
!organisation
){


return NextResponse.json(

{
error:"Organisation name required"
},

{
status:400
}

);


}










/*
    Create Subject
*/



const {

data:subject,

error:subjectError

}

=
await supabaseAdmin

.from("security_subjects")

.insert({


organisation:
organisation || null,


subject_type,


roblox_username:
roblox_username || null,


roblox_user_id:
roblox_user_id || null,


created_at:
new Date()


})

.select()

.single();









if(subjectError){


console.error(subjectError);



return NextResponse.json(

{
error:subjectError.message
},

{
status:500
}

);


}









/*
    Create Clearance Records
*/


const areas = [

    {
        id:"white_house",
        level:white_house
    },

    {
        id:"capitol",
        level:capitol
    },

    {
        id:"dhs",
        level:dhs
    },

    {
        id:"airport",
        level:airport
    }

];



const clearanceRecords =
areas

.filter(
area => area.level
)

.map(
area => ({

    subject_id:subject.id,

    area_id:area.id,

    clearance_level:area.level,


    blacklisted:
    blacklisted ?? false,


    blacklist_reason:
    blacklist_reason || null,


    blacklist_areas:
    blacklist_areas || [],


    created_at:
    new Date()

})

);







const {

data:clearances,

error:clearanceError

}

=
await supabaseAdmin

.from("security_clearances")

.insert(
clearanceRecords
)

.select();







if(clearanceError){


console.error(clearanceError);



return NextResponse.json(

{
error:clearanceError.message
},

{
status:500
}

);


}

    


return NextResponse.json({

    success:true,

    clearances

});


}


catch(error:any){


console.error(error);



return NextResponse.json(

{
    error:error.message
},

{
    status:500
}

);


}


}
