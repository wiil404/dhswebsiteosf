import {NextResponse} from "next/server";
import {supabaseAdmin} from "../../../../../lib/supabase-admin";



export async function PATCH(
request:Request,
context:{
params:Promise<{
id:string
}>
}

){


const {
id

}=await context.params;



const {
email

}=await request.json();





const {
data:profile

}=await supabaseAdmin

.from("profiles")

.select(
"employee_id"
)

.eq(
"id",
id
)

.single();





if(!profile?.employee_id){

return NextResponse.json(
{
error:"User has no employee record"
},
{
status:400
}
);

}







const {
error

}=await supabaseAdmin

.from("employees")

.update({

email

})

.eq(
"id",
profile.employee_id
);





if(error){

return NextResponse.json(
{
error:error.message
},
{
status:500
}
);

}





return NextResponse.json({

success:true

});


}