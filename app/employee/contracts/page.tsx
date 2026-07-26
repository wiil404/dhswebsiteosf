<section>


<h2 className="
text-3xl
font-black
text-[#003B6F]
">

Employee Acceptance

</h2>





<div className="
border
bg-[#F5F8FB]
p-8
mt-6
">


<p className="
text-gray-700
leading-relaxed
">

By signing this agreement, I acknowledge that I have read,
understood, and agree to comply with all provisions contained
within this Department of Homeland Security employment contract.

</p>






{

!contract.employee_signed && (

<form

action={async()=>{

await signEmployeeContract(
contract.id
);

}}

className="mt-8"

>


<button

type="submit"

className="
bg-[#003B6F]
text-white
px-8
py-4
font-black
text-lg
hover:bg-[#005AA7]
transition
"

>

Sign Contract

</button>


</form>

)

}







{

contract.employee_signed && (

<div className="
mt-6
bg-green-100
border
border-green-400
p-5
font-bold
text-green-800
">


<p>

You have signed this agreement.

</p>




<div className="
mt-4
space-y-2
text-sm
font-normal
">



<p>

<strong>
Signed By:
</strong>

{" "}

{contract.employee_signature_name || "Unknown"}

</p>





<p>

<strong>
Roblox ID:
</strong>

{" "}

{contract.employee_signature_id || "Unknown"}

</p>





<p>

<strong>
Signed Date:
</strong>

{" "}

{

contract.employee_signature_date

?

new Date(
contract.employee_signature_date
).toLocaleString(
"en-GB"
)

:

"Unknown"

}

</p>





</div>




</div>

)

}





</div>


</section>
