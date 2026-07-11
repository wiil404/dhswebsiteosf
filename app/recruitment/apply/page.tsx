"use client";


import {useState,useEffect} from "react";
import Breadcrumb from "@/components/Breadcrumb";
import {useRouter} from "next/navigation";



export default function ApplyPage(){


const router = useRouter();



const [loading,setLoading] = useState(false);

const [divisions,setDivisions] = useState<any[]>([]);

const [questions,setQuestions] = useState<any[]>([]);

const [answers,setAnswers] = useState<any>({});




const [form,setForm] = useState({

    roblox_username:"",
    roblox_user_id:"",
    discord_username:"",
    email:"",
    division:"",
    agreement:false

});









useEffect(()=>{


async function loadDivisions(){


const response = await fetch(
"/api/recruitment/divisions"
);


const data = await response.json();


setDivisions(data);


}



loadDivisions();


},[]);









async function loadQuestions(
divisionId:string
){


const response = await fetch(

`/api/recruitment/questions?division=${divisionId}`

);



const data = await response.json();



setQuestions(data);


setAnswers({});


}










function update(
field:string,
value:any
){


setForm({

...form,

[field]:value

});


}








function updateAnswer(

id:string,

value:string

){


setAnswers({

...answers,

[id]:value

});


}









async function submitApplication(){



if(!form.agreement){


alert(
"Please confirm your information is accurate before submitting."
);


return;


}





if(!form.division){


alert(
"Please select a division."
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

body:JSON.stringify({


...form,


answers


})

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

`/recruitment/applications?submitted=${result.application_number}`

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





<div className="
h-3
bg-[#F2C94C]
"/>









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

Apply to serve within the Department of Homeland Security. Questions will be tailored specifically to your selected division.

</p>



</section>









<section

className="
p-10
md:p-14
"

>







<h2 className="
text-3xl
font-bold
text-[#003B6F]
">

Applicant Information

</h2>








<div className="
grid
md:grid-cols-2
gap-6
mt-8
">




<input

className="border p-4"

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

className="border p-4"

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

className="border p-4"

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

className="border p-4"

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









<h2 className="
mt-12
text-3xl
font-bold
text-[#003B6F]
">

Select Division

</h2>






<select

className="
border
p-4
w-full
mt-6
"

value={form.division}

onChange={e=>{


const selected =
e.target.value;



const division =
divisions.find(
d=>d.id===selected
);



update(
"division",
selected
);



loadQuestions(
selected
);



}}

>


<option value="">

Select Division

</option>




{
divisions.map(
division=>(

<option

key={division.id}

value={division.id}

>

{division.name}

</option>

)

)

}



</select>









{

questions.length > 0 && (


<section className="mt-12">


<h2 className="
text-3xl
font-bold
text-[#003B6F]
">

Division Assessment

</h2>




<div className="
space-y-8
mt-8
">


{
questions.map(
(question)=>(


<div key={question.id}>


<label className="
block
font-bold
text-gray-800
mb-3
">

{question.question}

</label>



<textarea

className="
border
p-4
w-full
"

rows={5}

value={
answers[question.id] || ""
}

onChange={
e=>
updateAnswer(
question.id,
e.target.value
)
}

/>



</div>


)

)

}



</div>


</section>


)

}









<label

className="
flex
items-center
gap-3
mt-10
"

>


<input

type="checkbox"

checked={form.agreement}

onChange={
e=>
update(
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
