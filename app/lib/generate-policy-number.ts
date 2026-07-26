export function generatePolicyNumber(){

    const year = new Date()
    .getFullYear();


    const random =
    Math.floor(
        Math.random() * 9000
    ) + 1000;



    return `DHS-POL-${year}-${random}`;

}
