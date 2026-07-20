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
        id:"fb97a785-4080-41e6-9557-e817b2573387",
        level:white_house
    },

    {
        id:"f03d9324-d5e6-4938-b9a3-4509f07720d6",
        level:capitol
    },

    {
        id:"084d43c2-ab2b-4b5e-8853-5ccee736aa13",
        level:dhs
    },

    {
        id:"d09b1145-4c9d-490f-8780-03dbaa39593f",
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
