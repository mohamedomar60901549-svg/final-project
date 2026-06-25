import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function Reports() {


  const [stats, setStats] = useState({

    total_users: 0,
    total_donors: 0,
    total_patients: 0

  });


  const [requests, setRequests] = useState([]);

  const [users, setUsers] = useState([]);



  useEffect(() => {


    fetch("http://127.0.0.1:5000/api/auth/stats")
      .then(res => res.json())
      .then(data => setStats(data));



    fetch("http://127.0.0.1:5000/api/blood-requests/")
      .then(res => res.json())
      .then(data => setRequests(data));



    fetch("http://127.0.0.1:5000/api/auth/users")
      .then(res => res.json())
      .then(data => setUsers(data));


  }, []);




  const completed = requests.filter(
    req => req.status === "Completed"
  ).length;


  const pending = requests.filter(
    req => req.status === "Pending"
  ).length;




  // USERS DISTRIBUTION

  const userChart = [

    {
      name:"Donors",
      value:stats.total_donors
    },

    {
      name:"Patients",
      value:stats.total_patients
    },

    {
      name:"Admins",
      value:
      stats.total_users -
      stats.total_donors -
      stats.total_patients
    }

  ];





  // REQUEST STATUS

  const requestChart = [

    {
      name:"Completed",
      value:completed
    },

    {
      name:"Pending",
      value:pending
    }

  ];





  // BLOOD GROUPS


  const groups={};


  users.forEach(user=>{

    if(user.blood_group){

      groups[user.blood_group] =
      (groups[user.blood_group] || 0)+1;

    }

  });



  const bloodChart =
  Object.keys(groups).map(group=>({

    name:group,
    value:groups[group]

  }));





  return (

<div>


<h1 className="text-3xl font-bold mb-6">
Reports 📊
</h1>




<div className="grid md:grid-cols-3 gap-6">


<Card title="Total Users 👥" value={stats.total_users}/>


<Card 
title="Donors 🩸"
value={stats.total_donors}
/>


<Card
title="Patients 🏥"
value={stats.total_patients}
/>


<Card
title="Blood Requests"
value={requests.length}
/>


<Card
title="Completed ✅"
value={completed}
/>


<Card
title="Pending ⏳"
value={pending}
/>



</div>





<div className="grid md:grid-cols-2 gap-6 mt-8">


<div className="bg-white shadow rounded-lg p-6">


<h2 className="text-xl font-bold mb-4">
Users Distribution
</h2>


<ResponsiveContainer width="100%" height={300}>


<PieChart>

<Pie
data={userChart}
dataKey="value"
nameKey="name"
outerRadius={100}
label
>


{
userChart.map((item,index)=>(

<Cell key={index}/>

))
}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>






<div className="bg-white shadow rounded-lg p-6">


<h2 className="text-xl font-bold mb-4">
Blood Request Status
</h2>



<ResponsiveContainer width="100%" height={300}>


<BarChart data={requestChart}>


<XAxis dataKey="name"/>

<YAxis allowDecimals={false}/>


<Tooltip/>


<Bar 
dataKey="value"
/>


</BarChart>


</ResponsiveContainer>



</div>



</div>







<div className="bg-white shadow rounded-lg p-6 mt-8">


<h2 className="text-xl font-bold mb-4">
Blood Group Statistics 🩸
</h2>



<ResponsiveContainer width="100%" height={300}>


<BarChart data={bloodChart}>


<XAxis dataKey="name"/>

<YAxis allowDecimals={false}/>


<Tooltip/>


<Bar dataKey="value"/>


</BarChart>


</ResponsiveContainer>



</div>




</div>

  );

}




function Card({title,value}){


return (

<div className="bg-white shadow rounded-lg p-6">


<h2 className="text-gray-500">
{title}
</h2>


<p className="text-3xl font-bold">
{value}
</p>


</div>

);


}



export default Reports;