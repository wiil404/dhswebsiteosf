"use client";

import {
    useState,
    useEffect
} from "react";

import {
    useRouter
} from "next/navigation";

import Breadcrumb from "@/components/Breadcrumb";



export default function ApplyPage(){


const router = useRouter();




const [loading,setLoading] =
useState(false);


const [questionLoading,setQuestionLoading] =
useState(false);


const [robloxChecking,setRobloxChecking] =
useState(false);


const [robloxVerified,setRobloxVerified] =
useState(false);


const [robloxError,setRobloxError] =
useState("");



const [divisions,setDivisions] =
useState<any[]>([]);


const [questions,setQuestions] =
useState<any[]>([]);


const [answers,setAnswers] =
useState<any>({});


const [errors,setErrors] =
useState<any>({});






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


try{


const response =
await fetch(
"/api/recruitment/divisions"
);



const data =
await response.json();



setDivisions(
data || []
);



}

catch(error){

console.error(
"Division loading error",
error
);

}


}



loadDivisions();



},[]);










async function verifyRoblox(){



if(
!form.roblox_username.trim()
){

return;

}



setRobloxChecking(true);

setRobloxError("");

setRobloxVerified(false);




try{


const response =
await fetch(

"/api/roblox/verify",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

username:
form.roblox_username

})

}

);





const result =
await response.json();





if(
!result.valid
){

setRobloxError(
result.error ||
"Roblox verification failed."
);



setForm({

...form,

roblox_user_id:""

});



return;


}






setForm({

...form,

roblox_username:
result.username,

roblox_user_id:
result.userId

});





setRobloxVerified(true);



}

catch(error){


console.error(error);


setRobloxError(
"Unable to verify Roblox account."
);


}

finally{


setRobloxChecking(false);


}



}









function update(
field:string,
value:any
){


setForm({

...form,

[field]:value

});



setErrors({

...errors,

[field]:false

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



setErrors({

...errors,

[`question_${id}`]:false

});


}









async function loadQuestions(
divisionId:string
){


if(!divisionId){

setQuestions([]);

setAnswers({});

return;

}



setQuestionLoading(true);



try{


const response =
await fetch(

`/api/recruitment/questions?division=${divisionId}`

);



const data =
await response.json();





if(response.ok){


setQuestions(
data || []
);


setAnswers({});


}

else{


setQuestions([]);


}



}

catch(error){


console.error(
error
);


setQuestions([]);


}

finally{


setQuestionLoading(false);


}



}

async function submitApplication(){


if(!robloxVerified){


alert(
"Please verify your Roblox account before submitting."
);


return;


}





let newErrors:any = {};





if(!form.roblox_username.trim())
newErrors.roblox_username = true;



if(!form.discord_username.trim())
newErrors.discord_username = true;



if(!form.email.trim())
newErrors.email = true;




if(!form.division)
newErrors.division = true;





if(
form.division &&
questions.length === 0
){

newErrors.questions = true;

}







for(
const question of questions
){


if(
!answers[question.id] ||
answers[question.id].trim() === ""
){


newErrors[
`question_${question.id}`
] = true;


}


}






if(!form.agreement)
newErrors.agreement = true;







setErrors(
newErrors
);







if(
Object.keys(newErrors).length > 0
){



if(newErrors.questions){


alert(
"This division is not accepting applications currently."
);


}

else{


alert(
"Please complete all required fields."
);


}



return;


}








setLoading(true);






try{



const response =
await fetch(

"/api/recruitment/apply",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

...form,

answers

})


}

);







const result =
await response.json();







if(!response.ok){


alert(

result.error ||
"Unable to submit application."

);


setLoading(false);


return;


}







router.push(

`/recruitment/applications/submitted?number=${result.application_number}`

);





}

catch(error){


console.error(
"APPLICATION ERROR",
error
);


alert(
"Something went wrong."
);



setLoading(false);


}



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

Apply to serve within the Department of Homeland Security. Assessment questions will change depending on your selected division.

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

className={`border p-4 ${
errors.roblox_username
?
"border-red-500"
:
"border-gray-300"
}`}

placeholder="Roblox Username"

value={
form.roblox_username
}

onChange={

e=>{

update(
"roblox_username",
e.target.value
);


setRobloxVerified(false);


}

}

onBlur={
verifyRoblox
}

/>







<input

className="
border
p-4
bg-gray-100
"

placeholder="Roblox User ID"

value={
form.roblox_user_id
}

readOnly

/>








<input

className={`border p-4 ${
errors.discord_username
?
"border-red-500"
:
"border-gray-300"
}`}

placeholder="Discord Username"

value={
form.discord_username
}

onChange={

e=>

update(
"discord_username",
e.target.value
)

}

/>








<input

className={`border p-4 ${
errors.email
?
"border-red-500"
:
"border-gray-300"
}`}

placeholder="Email Address"

value={
form.email
}

onChange={

e=>

update(
"email",
e.target.value
)

}

/>





</div>








{
robloxChecking && (

<p

className="
mt-4
text-blue-600
font-bold
"

>

Checking Roblox membership...

</p>

)

}






{
robloxVerified && (

<p

className="
mt-4
text-green-600
font-bold
"

>

✓ Roblox account verified as OSFUSA member.

</p>

)

}






{
robloxError && (

<p

className="
mt-4
text-red-600
font-bold
"

>

{robloxError}

</p>

)

}







<h2

className="
mt-12
text-3xl
font-bold
text-[#003B6F]
"

>

Select Division

</h2>


<select

className={`border p-4 w-full mt-6 ${
errors.division
?
"border-red-500"
:
"border-gray-300"
}`}

value={form.division}

onChange={e=>{


update(
"division",
e.target.value
);



loadQuestions(
e.target.value
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


<h2

className="
text-3xl
font-bold
text-[#003B6F]
"

>

Division Assessment

</h2>





{

questionLoading && (

<p className="mt-5 text-gray-600">

Loading assessment questions...

</p>

)

}







<div

className="
space-y-8
mt-8
"

>


{

questions.map(

(question)=>(


<div

key={question.id}

>


<label

className="
block
font-bold
text-gray-800
mb-3
"

>

{question.question}

</label>







<textarea

className={`border p-4 w-full ${
errors[`question_${question.id}`]
?
"border-red-500"
:
"border-gray-300"
}`}

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

className={

errors.agreement

?

"outline outline-2 outline-red-500"

:

""

}

checked={
form.agreement
}

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

onClick={
submitApplication
}

disabled={
loading ||
!robloxVerified
}

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

!robloxVerified

?

"Verify Roblox Account First"

:

"Submit Application →"

}



</button>









</section>






</div>






</main>


);



}
