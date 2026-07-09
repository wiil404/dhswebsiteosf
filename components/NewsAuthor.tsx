import Image from "next/image";


export default function NewsAuthor({

    employee

}:{

    employee:any

}){


    if(!employee){

        return null;

    }



    return (

        <div
            className="
                flex
                items-center
                gap-5
                border-t
                pt-6
                mt-10
            "
        >


            <Image

                src={

                    `https://www.roblox.com/headshot-thumbnail/image?userId=${employee.roblox_user_id}&width=150&height=150&format=png`

                }

                width={90}

                height={90}

                alt={employee.roblox_username}

                className="
                    rounded-full
                    border
                "

            />





            <div>


                <h3
                    className="
                    text-xl
                    font-bold
                    text-[#003B6F]
                    "
                >

                    {employee.roblox_username}

                </h3>




                <p className="font-semibold">

                    {
                        employee.positions?.title ||
                        "Employee"
                    }

                </p>




                <p className="text-gray-600">

                    {
                        employee.email ||
                        "No DHS email assigned"
                    }

                </p>



            </div>



        </div>

    );

}