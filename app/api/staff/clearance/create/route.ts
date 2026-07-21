import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { getUser } from "@/app/lib/auth";




export async function POST(

request:Request

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

organisation,

subject_type,


roblox_username,

roblox_user_id,


clearances,


blacklisted,

blacklist_areas,

blacklist_reason


} = body;










if(
mode === "individual"
&&
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
mode === "organisation"
&&
!organisation
){


return NextResponse.json(

{
error:"Organisation required"
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
    Get Security Areas
*/


const {

data:areas,

error:areaError

}

=
await supabaseAdmin

.from("security_areas")

.select(
"id,name"
);






if(areaError || !areas){


return NextResponse.json(

{
error:"Unable to load security areas"
},

{
status:500
}

);

}









/*
    Convert clearance names into area IDs
*/


const areaMap:any = {};



areas.forEach(

(area:any)=>{


const name =
area.name.toLowerCase();



if(name.includes("airport")){

areaMap.airport = area.id;

}


if(name.includes("white house")){

areaMap.white_house = area.id;

}


if(name.includes("capitol")){

areaMap.capitol = area.id;

}


if(name.includes("dhs")){

areaMap.dhs = area.id;

}



}

);









/*
    Create clearance rows
*/



const clearanceRows:any[] = [];






Object.entries(clearances || {})

.forEach(

([key,value]:any)=>{


if(!value)
return;



if(!areaMap[key])
return;




clearanceRows.push({

subject_id:
subject.id,


area_id:
areaMap[key],



clearance_level:
Number(value),



blacklisted:
blacklisted || false,


blacklist_reason:
blacklist_reason || null,


blacklist_areas:
blacklist_areas || [],


created_at:
new Date(),

updated_at:
new Date()


});


}

);








if(clearanceRows.length === 0){


return NextResponse.json(

{
error:"At least one facility clearance is required"
},

{
status:400
}

);


}









const {

data:clearancesCreated,

error:clearanceError

}

=
await supabaseAdmin

.from("security_clearances")

.insert(
clearanceRows
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


subject_id:
subject.id,


clearances:
clearancesCreated


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
