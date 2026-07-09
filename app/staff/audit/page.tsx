"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function AuditPage(){


    const router = useRouter();


    const [logs,setLogs] = useState<any[]>([]);

    const [loading,setLoading] = useState(true);

    const [search,setSearch] = useState("");

    const [filter,setFilter] = useState("ALL");

    const [severityFilter,setSeverityFilter] = useState("ALL");

    const [expanded,setExpanded] = useState<string | null>(null);








    async function loadLogs(){


        const response = await fetch(
            "/api/staff/audit"
        );



        if(response.status === 403){

            router.push("/staff/dashboard");

            return;

        }





        const data = await response.json();


        setLogs(data);

        setLoading(false);


    }







    useEffect(()=>{

        loadLogs();

    },[]);








    function getActionName(action:string){


        const names:any = {


            NEWS_CREATED:
                "News Article Created",

            NEWS_UPDATED:
                "News Article Updated",

            NEWS_PUBLISHED:
                "News Article Published",

            NEWS_UNPUBLISHED:
                "News Article Unpublished",

            NEWS_DELETED:
                "News Article Deleted",

            STAFF_CREATED:
                "Staff Account Created",

            STAFF_UPDATED:
                "Staff Account Updated",

            STAFF_DELETED:
                "Staff Account Deleted"


        };


        return names[action] || action;


    }









    function getCategory(action:string){


        if(action.startsWith("NEWS")){

            return "NEWS";

        }


        if(action.startsWith("STAFF")){

            return "STAFF";

        }


        return "SYSTEM";


    }









    function getSeverityStyle(severity:string){


        if(severity === "CRITICAL"){

            return "bg-red-100 text-red-700";

        }


        if(severity === "WARNING"){

            return "bg-orange-100 text-orange-700";

        }


        return "bg-blue-100 text-blue-700";


    }









    function getSeverityBorder(severity:string){


        if(severity === "CRITICAL"){

            return "bg-red-600";

        }


        if(severity === "WARNING"){

            return "bg-orange-500";

        }


        return "bg-[#003B6F]";


    }









    const filteredLogs = logs.filter((log)=>{


        const category =
            getCategory(log.action);



        const severity =
            log.severity || "INFO";





        const matchesCategory =

            filter === "ALL"

            ||

            category === filter;







        const matchesSeverity =

            severityFilter === "ALL"

            ||

            severity === severityFilter;








        const text = (

            log.description +

            log.user_email +

            log.target_type +

            log.action

        )
        .toLowerCase();







        return (

            matchesCategory &&

            matchesSeverity &&

            text.includes(
                search.toLowerCase()
            )

        );


    });









    if(loading){


        return (

            <main

                className="
                max-w-7xl
                mx-auto
                px-6
                py-16
                "

            >

                <div

                    className="
                    bg-white
                    shadow-xl
                    border
                    p-10
                    "

                >

                    <h1

                        className="
                        text-xl
                        font-bold
                        text-[#003B6F]
                        "

                    >

                        Loading audit logs...

                    </h1>


                </div>


            </main>

        );


    }









    return (

        <main

            className="
            max-w-7xl
            mx-auto
            px-6
            py-16
            "

        >




            <div

                className="
                bg-white
                shadow-xl
                border
                border-gray-200
                p-10
                md:p-12
                "

            >






                <div

                    className="
                    border-b
                    pb-8
                    "

                >


                    <h1

                        className="
                        text-4xl
                        font-bold
                        text-[#003B6F]
                        "

                    >

                        DHS Audit Logs

                    </h1>



                    <p className="mt-3 text-gray-600">

                        Internal monitoring of staff and system activity.

                    </p>


                </div>









                {/* FILTERS */}



                <div

                    className="
                    mt-8
                    grid
                    md:grid-cols-3
                    gap-4
                    "

                >



                    <input

                        className="
                        border
                        p-3
                        "

                        placeholder="Search activity..."

                        value={search}

                        onChange={(e)=>
                            setSearch(e.target.value)
                        }

                    />






                    <select

                        className="
                        border
                        p-3
                        "

                        value={filter}

                        onChange={(e)=>
                            setFilter(e.target.value)
                        }

                    >

                        <option value="ALL">
                            All Activity
                        </option>

                        <option value="NEWS">
                            News Activity
                        </option>

                        <option value="STAFF">
                            Staff Activity
                        </option>

                        <option value="SYSTEM">
                            System Activity
                        </option>


                    </select>







                    <select

                        className="
                        border
                        p-3
                        "

                        value={severityFilter}

                        onChange={(e)=>
                            setSeverityFilter(e.target.value)
                        }

                    >

                        <option value="ALL">
                            All Severity
                        </option>

                        <option value="INFO">
                            INFO
                        </option>

                        <option value="WARNING">
                            WARNING
                        </option>

                        <option value="CRITICAL">
                            CRITICAL
                        </option>


                    </select>



                </div>









                <div

                    className="
                    mt-10
                    space-y-6
                    "

                >





                    {
                        filteredLogs.map((log)=>(


                            <div

                                key={log.id}

                                className="
                                relative
                                border
                                border-gray-200
                                p-7
                                shadow-sm
                                "

                            >



                                <div

                                    className={`
                                    absolute
                                    left-0
                                    top-0
                                    bottom-0
                                    w-1
                                    ${getSeverityBorder(log.severity || "INFO")}
                                    `}

                                />






                                <div

                                    className="
                                    flex
                                    justify-between
                                    gap-5
                                    "

                                >



                                    <div>


                                        <h2

                                            className="
                                            text-xl
                                            font-bold
                                            "

                                        >

                                            {getActionName(log.action)}

                                        </h2>



                                        <p className="text-sm text-gray-500 mt-1">

                                            {log.target_type || "System"}

                                        </p>


                                    </div>






                                    <div className="flex gap-2">


                                        <span className="bg-gray-100 px-3 py-1 text-sm font-bold">

                                            {getCategory(log.action)}

                                        </span>



                                        <span

                                            className={`
                                            px-3
                                            py-1
                                            text-sm
                                            font-bold
                                            ${getSeverityStyle(log.severity || "INFO")}
                                            `}

                                        >

                                            {log.severity || "INFO"}

                                        </span>


                                    </div>


                                </div>








                                <p className="mt-5 text-gray-700">

                                    {log.description || "No description provided"}

                                </p>








                                <div className="mt-5 text-sm text-gray-600">


                                    <p>

                                        <strong>Performed by:</strong>{" "}

                                        {log.user_email || "System"}

                                    </p>



                                    <p>

                                        <strong>Date:</strong>{" "}

                                        {
                                            new Date(
                                                log.created_at
                                            )
                                            .toLocaleString()
                                        }

                                    </p>


                                </div>








                                {
                                    log.details &&

                                    Object.keys(log.details).length > 0 && (


                                        <button

                                            onClick={()=>{


                                                if(expanded === log.id){

                                                    setExpanded(null);

                                                }
                                                else{

                                                    setExpanded(log.id);

                                                }


                                            }}

                                            className="
                                            mt-5
                                            text-[#003B6F]
                                            font-bold
                                            "

                                        >

                                            {
                                                expanded === log.id

                                                ?

                                                "Hide Details"

                                                :

                                                "View Details"

                                            }


                                        </button>


                                    )
                                }








                                {
                                    expanded === log.id && (


                                        <pre

                                            className="
                                            mt-5
                                            bg-[#F5F8FB]
                                            border
                                            p-5
                                            text-sm
                                            overflow-x-auto
                                            "

                                        >

                                            {
                                                JSON.stringify(
                                                    log.details,
                                                    null,
                                                    2
                                                )
                                            }


                                        </pre>


                                    )
                                }







                            </div>



                        ))
                    }





                </div>






            </div>






        </main>

    );


}
