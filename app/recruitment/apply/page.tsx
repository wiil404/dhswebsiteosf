"use client";


import {useState} from "react";
import Breadcrumb from "@/components/Breadcrumb";
import {useRouter} from "next/navigation";



export default function ApplyPage(){


const router = useRouter();


const [loading,setLoading] = useState(false);


const [form,setForm] = useState({

    roblox_username:"",
    roblox_user_id:"",
    discord_username:"",
    email:"",
    division:"",
    experience:"",
    motivation:"",
    suitability:"",
    availability:"",
    agreement:false

});





function update(
    field:string,
    value:any
){

setForm({

    ...form,

    [field]:value

});

}








async function submitApplication(){



if(!form.agreement){

    alert(
        "Please confirm your information is accurate before submitting."
    );

    return;

}




setLoading(true);



const response = await fetch(

"/api/recruitment/apply",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(form)

}

);




const result = await response.json();





if(!response.ok){

alert(

result.error ||

"Unable to submit application"

);


setLoading(false);

return;

}





router.push(
"/recruitment/applications"
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


<Breadcrumb />







<div

className="
bg-white
shadow-2xl
border
border-gray-200
overflow-hidden
"

>





<div

className="
h-3
bg-[#F2C94C]
"

/>








<section

className="
bg-[#003B6F]
text-white
p-10
md:p-16
"

>



<p

className="
uppercase
tracking-[0.3em]
text-sm
font-bold
text-[#F2C94C]
"

>

Department of Homeland Security

</p>




<h1

className="
mt-5
text-5xl
md:text-6xl
font-black
"

>

Employment Application

</h1>




<p

className="
mt-6
text-xl
text-gray-200
max-w-4xl
"

>

Begin your application to serve within one of the Department of Homeland Security's operational divisions.

</p>




</section>









<section

className="
p-10
md:p-14
"

>






<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Applicant Information

</h2>





<div

className="
grid
md:grid-cols-2
gap-6
mt-8
"

>



<input

className="
border
p-4
"

placeholder="Roblox Username"

value={form.roblox_username}

onChange={
e=>update(
"roblox_username",
e.target.value
)
}

/>







<input

className="
border
p-4
"

placeholder="Roblox User ID"

value={form.roblox_user_id}

onChange={
e=>update(
"roblox_user_id",
e.target.value
)
}

/>







<input

className="
border
p-4
"

placeholder="Discord Username"

value={form.discord_username}

onChange={
e=>update(
"discord_username",
e.target.value
)
}

/>







<input

className="
border
p-4
"

placeholder="Email Address"

value={form.email}

onChange={
e=>update(
"email",
e.target.value
)
}

/>



</div>









<h2

className="
mt-12
text-3xl
font-bold
text-[#003B6F]
"

>

Division Selection

</h2>






<select

className="
border
p-4
w-full
mt-6
"

value={form.division}

onChange={
e=>update(
"division",
e.target.value
)
}

>


<option value="">

Select Division

</option>


<option>
Special Response Team
</option>


<option>
Law Enforcement Helicopter Taskforce
</option>


<option>
United States Secret Service
</option>


<option>
United States Customs and Border Protection
</option>


<option>
Public Affairs
</option>



</select>









<h2

className="
mt-12
text-3xl
font-bold
text-[#003B6F]
"

>

Application Questions

</h2>









<textarea

className="
border
p-4
w-full
mt-6
"

rows={5}

placeholder="Previous experience"

value={form.experience}

onChange={
e=>update(
"experience",
e.target.value
)
}

/>









<textarea

className="
border
p-4
w-full
mt-6
"

rows={5}

placeholder="Why do you want to join DHS?"

value={form.motivation}

onChange={
e=>update(
"motivation",
e.target.value
)
}

/>









<textarea

className="
border
p-4
w-full
mt-6
"

rows={5}

placeholder="Why are you suitable for this division?"

value={form.suitability}

onChange={
e=>update(
"suitability",
e.target.value
)
}

/>








<textarea

className="
border
p-4
w-full
mt-6
"

rows={3}

placeholder="Your availability"

value={form.availability}

onChange={
e=>update(
"availability",
e.target.value
)
}

/>








<label

className="
flex
items-center
gap-3
mt-8
"

>


<input

type="checkbox"

checked={form.agreement}

onChange={
e=>update(
"agreement",
e.target.checked
)
}

/>



<span>

I confirm that all information provided is accurate.

</span>


</label>








<button

onClick={submitApplication}

disabled={loading}

className="
mt-10
bg-[#003B6F]
text-white
px-10
py-4
font-black
text-lg
hover:bg-[#002B52]
transition
disabled:opacity-50
"

>

{

loading

?

"Submitting Application..."

:

"Submit Application →"

}


</button>






</section>







</div>







</main>

);


}