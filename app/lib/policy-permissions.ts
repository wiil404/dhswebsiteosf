export const POLICY_CREATORS = [

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


export const POLICY_APPROVERS = [

"Secretary of Homeland Security",
"Deputy Secretary of Homeland Security",
"Chief of Staff",
"Under Secretary"

];



export function canCreatePolicy(
position:string | null
){

if(!position){
    return false;
}

return POLICY_CREATORS.includes(position);

}




export function canApprovePolicy(
position:string | null
){

if(!position){
    return false;
}

return POLICY_APPROVERS.includes(position);

}



export function canManageAllPolicies(
position:string | null
){

if(!position){
    return false;
}

return POLICY_APPROVERS.includes(position);

}
