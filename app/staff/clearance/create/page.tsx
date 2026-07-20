import ClearanceCreateForm from "./ClearanceCreateForm";


export default function CreateClearancePage(){


return (

<main className="
max-w-5xl
mx-auto
px-6
py-16
">


<div className="
bg-white
shadow-xl
border
p-10
">


<h1 className="
text-4xl
font-bold
text-[#003B6F]
">

Create Security Clearance

</h1>



<p className="
mt-3
text-gray-600
">

Create clearance for individuals, organisations, agencies or authorised guests.

</p>





<ClearanceCreateForm />


</div>


</main>

);


}
