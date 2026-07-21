import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/app/lib/supabase-admin";

import { getUser } from "@/app/lib/auth";





export async function POST(

request:Request,

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
error:"No clearance data provided"
},

{
status:400
}

);


}








/*
    Get current clearance records
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









const incomingAreaIds =
Object.keys(clearances);








/*
    Remove clearances that were deleted
*/


const deleteIds = existing

?.filter(

(item:any)=>

!incomingAreaIds.includes(
item.area_id
)

)

.map(

(item:any)=>
item.id

);






if(
deleteIds &&
deleteIds.length > 0
){


await supabaseAdmin

.from("security_clearances")

.delete()

.in(

"id",

deleteIds

);


}









/*
    Update / Insert clearance records
*/


for(
const areaId of incomingAreaIds
){



const clearance =
clearances[areaId];




if(
!clearance.level
){

continue;

}





const existingRecord =
existing?.find(

(item:any)=>

item.area_id === areaId

);








if(existingRecord){


await supabaseAdmin

.from("security_clearances")

.update({

clearance_level:

Number(
clearance.level
),


updated_at:

new Date()

})

.eq(

"id",

existingRecord.id

);



}

else{



await supabaseAdmin

.from("security_clearances")

.insert({

subject_id:id,


area_id:areaId,


clearance_level:

Number(
clearance.level
),


blacklisted:false,


created_at:

new Date(),


updated_at:

new Date()

});


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