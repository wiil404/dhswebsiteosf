export const POLICY_MANAGEMENT_ROLES = [

    "Secretary of Homeland Security",

    "Deputy Secretary of Homeland Security",

    "Chief of Staff",

    "Under Secretary",

    "Secret Service Director",

    "CBP Commissioner",

    "Special Response Team Commander",

    "Under Secretary for Aviation Operations",

    "Senior Flight Officer",

    "Deputy Director",

    "Assistant Director",

    "Chief of Operations",

    "CBP Deputy Commissioner",

    "Special Agent in Charge (SRT)"

];



export function canManagePolicies(
    position:string | null | undefined
){

    if(!position){
        return false;
    }


    return POLICY_MANAGEMENT_ROLES.includes(position);

}
