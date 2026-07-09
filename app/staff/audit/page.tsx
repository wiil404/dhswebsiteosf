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


        switch(severity){


            case "CRITICAL":

                return "bg-red-100 text-red-700";


            case "WARNING":

                return "bg-orange-100 text-orange-700";


            default:

                return "bg-blue-100 text-blue-700";


        }


    }









    const filteredLogs = logs.filter(log=>{


        const category = getCategory(log.action);

        const severity = log.severity || "INFO";



        const matchesCategory =

            filter === "ALL"

            ||

            category === filter;





        const matchesSeverity =

            severityFilter === "ALL"

            ||

            severity === severityFilter;





        const searchText = (

            log.description +

            log.user_email +

            log.target_type +

            log.action

        )

        .toLowerCase();





        return (

            matchesCategory &&

            matchesSeverity &&

            searchText.includes(
                search.toLowerCase()
            )

        );


    });









    if(loading){

        return (

            <main className="max-w-6xl mx-auto px-6 py-12">

                Loading audit logs...

            </main>

        );

    }








    return (

        <main className="max-w-6xl mx-auto px-6 py-12">



            <h1 className="text-4xl font-bold">

                DHS Audit Logs

            </h1>



            <p className="text-gray-600 mt-2">

                Internal monitoring of staff and system activity.

            </p>








            <div className="mt-8 flex flex-col md:flex-row gap-4">


                <input

                    className="border rounded p-3 flex-1"

                    placeholder="Search activity..."

                    value={search}

                    onChange={(e)=>
                        setSearch(e.target.value)
                    }

                />




                <select

                    className="border rounded p-3"

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

                    className="border rounded p-3"

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









            <div className="mt-10 space-y-5">



                {
                    filteredLogs.map(log=>(


                        <div

                            key={log.id}

                            className="border rounded-lg p-6 shadow-sm"

                        >



                            <div className="flex justify-between">



                                <div>


                                    <h2 className="text-xl font-bold">

                                        {getActionName(log.action)}

                                    </h2>



                                    <p className="text-sm text-gray-500">

                                        {log.target_type || "System"}

                                    </p>


                                </div>





                                <div className="flex flex-col items-end gap-2">


                                    <span className="bg-gray-100 px-3 py-1 rounded text-sm font-semibold">

                                        {getCategory(log.action)}

                                    </span>



                                    <span

                                        className={`px-3 py-1 rounded text-sm font-semibold ${getSeverityStyle(log.severity || "INFO")}`}

                                    >

                                        {log.severity || "INFO"}

                                    </span>


                                </div>



                            </div>







                            <div className="mt-5">

                                <p>
                                    {log.description || "No description provided"}
                                </p>


                                {
                                    log.target_type === "Staff" &&
                                    log.details?.staff_email && (

                                        <p className="text-sm text-gray-500 mt-2">

                                            Staff Account:
                                            {" "}
                                            {log.details.staff_email}

                                        </p>

                                    )
                                }

                            </div>








                            <div className="mt-5 text-sm text-gray-600">


                                <p>

                                    <strong>Performed by:</strong>{" "}

                                    {log.user_email || "System"}

                                </p>


                                <p>

                                    <strong>Date:</strong>{" "}

                                    {new Date(
                                        log.created_at
                                    ).toLocaleString()}

                                </p>


                            </div>









                            {
                                log.details &&

                                Object.keys(log.details).length > 0 && (

                                <button

                                    onClick={()=>{

                                        setExpanded(
                                            expanded === log.id
                                            ? null
                                            : log.id
                                        );

                                    }}

                                    className="mt-5 text-sm underline"

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

                                    <pre className="mt-4 bg-gray-100 rounded p-4 text-sm overflow-x-auto">

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




        </main>

    );


}