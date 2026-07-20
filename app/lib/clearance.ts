import { createClient } from "./supabase-server";



export type ClearanceArea =
    | "Airport Restricted Areas"
    | "White House Grounds"
    | "United States Capitol"
    | "DHS Restricted Areas";



export type ClearanceLevel =
    1 | 2 | 3 | 4;







/*
====================================================
 CURRENT USER
====================================================
*/


async function getCurrentProfile(){


    const supabase =
        await createClient();



    const {
        data:{
            user
        }

    } = await supabase.auth.getUser();




    if(!user){

        return null;

    }





    const {

        data:profile

    } = await supabase


    .from("profiles")

    .select("*")

    .eq(
        "id",
        user.id
    )

    .single();




    return profile || null;


}









/*
====================================================
 WHO CAN MANAGE CLEARANCES
====================================================
*/


export async function canManageClearance(){


    const profile =
        await getCurrentProfile();



    if(!profile){

        return false;

    }





    const allowedRoles = [

        "Administrator",

        "Secretary of Homeland Security",

        "Deputy Secretary of Homeland Security",

        "Chief of Staff",

        "Secret Service Director",

        "SRT Commander",

        "CBP Commissioner"

    ];





    return allowedRoles.includes(
        profile.role
    );


}









/*
====================================================
 GET SUBJECT
====================================================
*/


export async function getSecuritySubject(

id:string

){


    const supabase =
        await createClient();



    const {

        data:subject

    } = await supabase


    .from("security_subjects")

    .select(`

        *,

        security_organisations(
            id,
            name
        )

    `)


    .eq(
        "id",
        id
    )

    .single();





    return subject || null;


}









/*
====================================================
 BLACKLIST CHECK
====================================================
*/


export async function isBlacklisted(

subjectId:string,

area:ClearanceArea

){


    const supabase =
        await createClient();



    const {

        data:blacklist

    } = await supabase


    .from("security_blacklists")

    .select("*")


    .eq(
        "subject_id",
        subjectId
    )

    .maybeSingle();





    if(!blacklist){

        return false;

    }




    if(
        blacklist.global_blacklist
    ){

        return true;

    }







    switch(area){


        case "Airport Restricted Areas":

            return blacklist.airport;



        case "White House Grounds":

            return blacklist.white_house;



        case "United States Capitol":

            return blacklist.capitol;



        case "DHS Restricted Areas":

            return blacklist.dhs;



        default:

            return false;


    }


}









/*
====================================================
 EFFECTIVE CLEARANCE
====================================================
*/


export async function getSubjectClearance(

subjectId:string,

areaName:ClearanceArea

){


    const supabase =
        await createClient();





    /*
        Find area
    */


    const {

        data:area

    } = await supabase


    .from("security_areas")

    .select("*")


    .eq(
        "name",
        areaName
    )


    .single();






    if(!area){

        return null;

    }









    /*
        Blacklist overrides everything
    */


    const blocked =
        await isBlacklisted(
            subjectId,
            areaName
        );





    if(blocked){


        return {


            clearance_level:null,


            blacklisted:true,


            peoc_access:false,


            white_house_lanyard:false


        };


    }









    /*
        Individual override
    */


    const {

        data:override

    } = await supabase


    .from("security_clearances")


    .select("*")


    .eq(
        "subject_id",
        subjectId
    )


    .eq(
        "area_id",
        area.id
    )


    .maybeSingle();






    if(override){


        if(

            override.expires_at &&

            new Date(
                override.expires_at
            ) < new Date()

        ){

            return {

                clearance_level:null,

                expired:true,

                peoc_access:false,

                white_house_lanyard:false

            };

        }






        return {


            clearance_level:
            override.clearance_level,


            peoc_access:
            override.peoc_access,


            white_house_lanyard:
            override.white_house_lanyard,


            blacklisted:false


        };


    }









    /*
        Organisation inheritance
    */


    const {

        data:subject

    } = await supabase


    .from("security_subjects")


    .select(`

        organisation_id

    `)


    .eq(
        "id",
        subjectId
    )


    .single();







    if(!subject?.organisation_id){


        return null;


    }








    const {

        data:organisationClearance

    } = await supabase


    .from("organisation_clearances")


    .select("*")


    .eq(

        "organisation_id",

        subject.organisation_id

    )


    .eq(

        "area_id",

        area.id

    )


    .maybeSingle();








    if(!organisationClearance){


        return {


            clearance_level:null,


            peoc_access:false,


            white_house_lanyard:false,


            blacklisted:false


        };


    }








    return {


        clearance_level:

        organisationClearance.clearance_level,


        peoc_access:

        organisationClearance.peoc_access,


        white_house_lanyard:

        organisationClearance.white_house_lanyard,


        blacklisted:false


    };


}









/*
====================================================
 AUDIT LOG
====================================================
*/


export async function createClearanceAudit({


subjectId,


action,


area,


oldValue,


newValue,


reason


}:{

subjectId:string;

action:string;

area?:string;

oldValue?:string;

newValue?:string;

reason?:string;


}){


    const supabase =
        await createClient();





    const {

        data:{
            user
        }

    } = await supabase.auth.getUser();







    await supabase


    .from("security_clearance_audit")


    .insert({


        subject_id:
        subjectId,


        changed_by:
        user?.id,


        action,


        area,


        old_value:
        oldValue,


        new_value:
        newValue,


        reason


    });


}
