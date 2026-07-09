import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
    Source_Sans_3,
    Oswald
} from "next/font/google";


const sourceSans = Source_Sans_3({

    subsets:["latin"],

    weight:[
        "400",
        "500",
        "600",
        "700",
        "800"
    ]

});


const oswald = Oswald({

    subsets:["latin"],

    weight:[
        "400",
        "500",
        "600",
        "700"
    ]

});



export const metadata = {

    title: "Homeland Security",

    description:
        "Official public information portal for the OSFUSA Department of Homeland Security",

};



export default function RootLayout({

    children,

}: {

    children: React.ReactNode;

}) {


return (

<html lang="en">


<body

className={`
${sourceSans.className}
bg-[#003B6F]
text-gray-900
relative
overflow-x-hidden
`}

>


{/* DHS STYLE BACKGROUND */}

<div

className="
fixed
inset-0
-z-20
bg-[#003B6F]
"

>


{/* Soft hero-style fade */}

<div

className="
absolute
top-0
left-0
right-0
h-[500px]
bg-gradient-to-b
from-[#003B6F]
via-[#003B6F]/90
to-transparent
"

/>



{/* Faint diagonal technical lines */}

<div

className="
absolute
inset-0
opacity-[0.045]
bg-[linear-gradient(135deg,transparent_48%,rgba(255,255,255,0.35)_49%,transparent_50%)]
bg-[length:180px_180px]
"

/>



{/* Secondary diagonal layer */}

<div

className="
absolute
inset-0
opacity-[0.025]
bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.25)_49%,transparent_50%)]
bg-[length:260px_260px]
"

/>



{/* Subtle centre glow */}

<div

className="
absolute
top-[30%]
left-1/2
-translate-x-1/2
w-[900px]
h-[900px]
rounded-full
bg-white
opacity-[0.015]
blur-3xl
"

/>



</div>





<Navbar />


<main>

{children}

</main>


<Footer />


</body>


</html>

);

}