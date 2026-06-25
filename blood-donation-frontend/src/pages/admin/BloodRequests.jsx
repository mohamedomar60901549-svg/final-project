import { useEffect, useState } from "react";


function BloodRequests() {


  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);



  const fetchRequests = () => {


    fetch("http://127.0.0.1:5000/api/blood-requests/")

      .then(res => res.json())

      .then(data => {

        setRequests(data);

        setLoading(false);

      });


  };




  useEffect(() => {

    fetchRequests();

  }, []);






  const updateStatus = async (id) => {


    const confirmUpdate = window.confirm(
      "Mark this blood request as completed?"
    );


    if(!confirmUpdate) return;



    await fetch(
      `http://127.0.0.1:5000/api/blood-requests/${id}`,
      {

        method:"PUT",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          status:"Completed"

        })

      }
    );



    fetchRequests();


  };






  return (


<div>



<h1 className="text-3xl font-bold mb-6">
Blood Requests 🩸
</h1>





<div className="bg-white shadow rounded-lg p-6 overflow-x-auto">



{
loading ?

<p className="text-center">
Loading requests...
</p>


:

requests.length === 0 ?

<p className="text-center text-gray-500">
No blood requests available.
</p>


:


<table className="w-full text-sm">


<thead>


<tr className="border-b bg-gray-100">


<th className="p-3">
ID
</th>


<th>
Patient
</th>


<th>
Blood Group
</th>


<th>
Hospital
</th>


<th>
Location
</th>


<th>
Units
</th>


<th>
Status
</th>


<th>
Action
</th>


</tr>


</thead>





<tbody>


{

requests.map(req => (


<tr
key={req.id}
className="border-b text-center hover:bg-gray-50"
>



<td className="p-3">
{req.id}
</td>



<td>
{req.patient_name}
</td>



<td className="font-bold text-red-600">
{req.blood_group}
</td>



<td>
{req.hospital}
</td>



<td>
{req.location}
</td>



<td>
{req.units_needed}
</td>





<td>


<span

className={

req.status === "Completed"

?

"bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold"

:

"bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold"

}

>


{req.status}


</span>



</td>






<td>


{

req.status !== "Completed"

?


<button

onClick={()=>updateStatus(req.id)}

className="
bg-green-600
hover:bg-green-700
text-white
px-4
py-2
rounded
"


>

Complete

</button>


:


<span className="text-green-600 font-bold">

✓ Completed

</span>


}



</td>






</tr>


))


}



</tbody>



</table>


}



</div>



</div>


  );


}


export default BloodRequests;