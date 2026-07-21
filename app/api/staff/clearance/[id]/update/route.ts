import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { getUser } from "@/app/lib/auth";





export async function POST(

request: Request,

{

params

}:{

params:Promise<{
    id:string
}>

}

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






const {id} =
await params;





const body =
await request.json();




const {

clearances

} = body;






if(!clearances){


return NextResponse.json(

{
error:"Missing clearance data"
},

{
status:400
}

);


}









/*
    Get existing records
*/


const {

data:existing,

error:existingError

}

=
await supabaseAdmin

.from("security_clearances")

.select(`

id,

area_id

`)

.eq(

"subject_id",

id

);







if(existingError){


return NextResponse.json(

{
error:existingError.message
},

{
status:500
}

);


}









/*
    Get White House ID
*/


const {

data:whiteHouseArea

}

=
await supabaseAdmin

.from("security_areas")

.select("id")

.ilike(

"name",

"%White House%"

)

.single();









const whiteHouseId =
whiteHouseArea?.id;









/*
    Delete removed areas
*/


const incomingAreas =
Object.keys(clearances);






const removeIds = existing

?.filter(

(record:any)=>

!incomingAreas.includes(
record.area_id
)

)

.map(

(record:any)=>

record.id

);







if(
removeIds &&
removeIds.length
){


await supabaseAdmin

.from("security_clearances")

.delete()

.in(

"id",

removeIds

);


}









/*
    Update / Insert
*/



for(
const areaId of incomingAreas
){



const data =
clearances[areaId];






if(
!data.level
){

continue;

}








const isWhiteHouse =
areaId === whiteHouseId;








const payload = {


clearance_level:

Number(
data.level
),



/*
    White House only
*/


peoc_access:

isWhiteHouse

?

data.peoc_access ?? false

:

false,




white_house_lanyard:

isWhiteHouse

?

data.white_house_lanyard ?? false

:

false,




lanyard_required:

isWhiteHouse

?

data.lanyard_required ?? false

:

false,






blacklisted:

data.blacklisted ?? false,




blacklist_reason:

data.blacklist_reason || null,




expires_at:

data.expires_at || null,




notes:

data.notes || null,




override_department:

data.override_department ?? false,




updated_at:

new Date()


};








const existingRecord =
existing?.find(

(record:any)=>

record.area_id === areaId

);







if(existingRecord){



const {

error

}

=
await supabaseAdmin

.from("security_clearances")

.update(

payload

)

.eq(

"id",

existingRecord.id

);





if(error){

throw error;

}



}

else{





const {

error

}

=
await supabaseAdmin

.from("security_clearances")

.insert({

subject_id:id,


area_id:areaId,


...payload,


created_at:new Date()

});





if(error){

throw error;

}



}



}









return NextResponse.json({

success:true

});






}

catch(error:any){


console.error(

"UPDATE CLEARANCE ERROR:",

error

);




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
