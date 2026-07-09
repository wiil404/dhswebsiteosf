export function canCreate(role:string){

    return [
        "Administrator",
        "Press Officer"
    ].includes(role);

}



export function canEdit(role:string){

    return [
        "Administrator",
        "Press Officer",
        "Editor"
    ].includes(role);

}



export function canDelete(role:string){

    return role === "Administrator";

}



export function canPublish(role:string){

    return [
        "Administrator",
        "Press Officer"
    ].includes(role);

}