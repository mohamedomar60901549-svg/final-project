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
  ResponsiveContainer,
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";


function Reports() {


const [stats,setStats] = useState({

    total_users:0,

    total_donors:0,

    total_patients:0

});


const [requests,setRequests] = useState([]);

const [users,setUsers] = useState([]);

const [availableDonors,setAvailableDonors] = useState(0);


const [lastUpdated,setLastUpdated] =
useState(
    new Date().toLocaleString()
);



const token =
localStorage.getItem("token");



const headers = {

"Content-Type":"application/json",

Authorization:
`Bearer ${token}`

};






// =======================================
// LOAD REPORT DATA
// =======================================


const loadData = async()=>{


try{


const statsRes =
await fetch(

"http://127.0.0.1:5000/api/auth/stats",

{
headers
}

);


const statsData =
await statsRes.json();


setStats(statsData);







const requestRes =
await fetch(

"http://127.0.0.1:5000/api/blood-requests/",

{
headers
}

);


const requestData =
await requestRes.json();


setRequests(

Array.isArray(requestData)
?
requestData
:
[]

);








const usersRes =
await fetch(

"http://127.0.0.1:5000/api/auth/users",

{
headers
}

);



const usersData =
await usersRes.json();



setUsers(

Array.isArray(usersData)
?
usersData
:
[]

);








const donorRes =
await fetch(

"http://127.0.0.1:5000/api/auth/donors",

{
headers
}

);



const donorData =
await donorRes.json();



const donors =
Array.isArray(donorData)
?
donorData
:
[];




setAvailableDonors(

donors.filter(

(donor)=>

donor.availability
&&
donor.availability.toLowerCase()
==="available"

).length

);






setLastUpdated(
new Date().toLocaleString()
);



}
catch(error){

console.error(error);

}


};





useEffect(()=>{

loadData();

},[]);





// =======================================
// SAFE DATA
// =======================================


const safeRequests =
Array.isArray(requests)
?
requests
:
[];




const safeUsers =
Array.isArray(users)
?
users
:
[];





const completed =
safeRequests.filter(

(req)=>
req.status==="Completed"

).length;





const pending =
safeRequests.filter(

(req)=>
req.status==="Pending"

).length;





const successRate =
safeRequests.length===0
?
0
:
Math.round(

(completed /
safeRequests.length)
*
100

);





const userChart=[

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





const requestChart=[

{
name:"Completed",
value:completed
},

{
name:"Pending",
value:pending
}

];





const groups={};


safeUsers.forEach((user)=>{


if(user.blood_group){


groups[user.blood_group]
=
(groups[user.blood_group]||0)+1;


}


});




const bloodChart =
Object.keys(groups).map(

(group)=>({

name:group,

value:groups[group]

})

);




const COLORS=[

"#ef4444",

"#3b82f6",

"#10b981",

"#f59e0b"

];

// =======================================
// EXPORT PDF
// =======================================


const exportPDF = ()=>{


const doc = new jsPDF();



doc.setFontSize(20);

doc.text(
"LifeLink Blood Donation System",
14,
18
);



doc.setFontSize(15);

doc.text(
"System Analytics Report",
14,
28
);



doc.setFontSize(11);

doc.text(
`Generated: ${new Date().toLocaleString()}`,
14,
38
);




autoTable(doc,{

startY:48,

head:[

[
"Statistic",
"Value"
]

],


body:[

[
"Total Users",
stats.total_users
],

[
"Total Donors",
stats.total_donors
],

[
"Available Donors",
availableDonors
],

[
"Total Patients",
stats.total_patients
],

[
"Blood Requests",
safeRequests.length
],

[
"Completed Requests",
completed
],

[
"Pending Requests",
pending
]


]


});





autoTable(doc,{

startY:
doc.lastAutoTable.finalY + 15,


head:[

[
"Name",
"Email",
"Blood Group",
"Location",
"Availability"
]

],


body:

safeUsers.map(user=>[

user.full_name,

user.email,

user.blood_group || "-",

user.location || "-",

user.availability || "-"

])


});




doc.save(
"LifeLink_Report.pdf"
);


};







// =======================================
// EXPORT EXCEL
// =======================================


const exportExcel = ()=>{


const workbook =
XLSX.utils.book_new();



const summary=[

{
Statistic:"Total Users",
Value:stats.total_users
},

{
Statistic:"Total Donors",
Value:stats.total_donors
},

{
Statistic:"Available Donors",
Value:availableDonors
},

{
Statistic:"Total Patients",
Value:stats.total_patients
},

{
Statistic:"Blood Requests",
Value:safeRequests.length
},

{
Statistic:"Completed",
Value:completed
},

{
Statistic:"Pending",
Value:pending
},

{
Statistic:"Generated",
Value:new Date().toLocaleString()
}

];




XLSX.utils.book_append_sheet(

workbook,

XLSX.utils.json_to_sheet(summary),

"Summary"

);




XLSX.utils.book_append_sheet(

workbook,

XLSX.utils.json_to_sheet(safeUsers),

"Users"

);




XLSX.utils.book_append_sheet(

workbook,

XLSX.utils.json_to_sheet(safeRequests),

"Requests"

);





XLSX.writeFile(

workbook,

"LifeLink_Report.xlsx"

);


};






return (

<div className="space-y-8">





{/* ================= HEADER ================= */}


<div className="
bg-gradient-to-r
from-red-700
to-red-500
text-white
rounded-2xl
p-8
shadow-xl
">


<div className="
flex
flex-col
md:flex-row
justify-between
gap-5
">


<div>


<h1 className="
text-4xl
font-bold
">

📊 System Reports

</h1>


<p className="
mt-2
text-red-100
">

LifeLink Blood Donation Analytics Dashboard

</p>



<p className="
text-sm
mt-3
">

Last Updated:
{lastUpdated}

</p>


</div>




<div className="
flex
gap-3
flex-wrap
">


<button

onClick={loadData}

className="
bg-white
text-red-600
px-5
py-2
rounded-lg
font-semibold
hover:bg-gray-100
"

>

🔄 Refresh

</button>



<button

onClick={exportPDF}

className="
bg-green-600
px-5
py-2
rounded-lg
hover:bg-green-700
"

>

📄 PDF

</button>




<button

onClick={exportExcel}

className="
bg-blue-600
px-5
py-2
rounded-lg
hover:bg-blue-700
"

>

📊 Excel

</button>



</div>


</div>


</div>







{/* ================= ANALYTICS OVERVIEW ================= */}



<div className="
grid
md:grid-cols-4
gap-6
">



<AnalyticsCard

title="System Status"

value="🟢 Active"

text="Running normally"

/>




<AnalyticsCard

title="Success Rate"

value={`${successRate}%`}

text="Requests completed"

/>



<AnalyticsCard

title="Available Donors"

value={availableDonors}

text="Ready donors"

/>



<AnalyticsCard

title="Blood Groups"

value={bloodChart.length}

text="Registered groups"

/>



</div>







{/* ================= SUMMARY CARDS ================= */}



<div className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-6
">


<StatCard

title="Total Users"

value={stats.total_users}

icon="👥"

/>



<StatCard

title="Total Donors"

value={stats.total_donors}

icon="🩸"

/>



<StatCard

title="Patients"

value={stats.total_patients}

icon="🏥"

/>



<StatCard

title="Blood Requests"

value={safeRequests.length}

icon="📄"

/>



<StatCard

title="Completed"

value={completed}

icon="✅"

/>



<StatCard

title="Pending"

value={pending}

icon="⏳"

/>


</div>





{/* ================= CHARTS ================= */}



<div className="
grid
lg:grid-cols-2
gap-6
">



<div className="
bg-white
rounded-xl
shadow-lg
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

User Distribution

</h2>



<ResponsiveContainer
width="100%"
height={320}
>


<PieChart>


<Pie

data={userChart}

dataKey="value"

outerRadius={110}

label

>


{
userChart.map(
(entry,index)=>(


<Cell

key={index}

fill={
COLORS[index %
COLORS.length]
}

/>


)

)

}


</Pie>



<Tooltip />


</PieChart>


</ResponsiveContainer>


</div>





<div className="
bg-white
rounded-xl
shadow-lg
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

Request Status

</h2>



<ResponsiveContainer

width="100%"

height={320}

>


<BarChart

data={requestChart}

>


<XAxis dataKey="name"/>

<YAxis allowDecimals={false}/>

<Tooltip/>


<Bar

dataKey="value"

fill="#dc2626"

/>


</BarChart>


</ResponsiveContainer>


</div>


</div>

{/* ================= BLOOD GROUP CHART ================= */}


<div className="
bg-white
rounded-xl
shadow-lg
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

🩸 Blood Group Distribution

</h2>



<ResponsiveContainer

width="100%"

height={320}

>


<BarChart

data={bloodChart}

>


<XAxis

dataKey="name"

/>


<YAxis

allowDecimals={false}

/>


<Tooltip />


<Bar

dataKey="value"

fill="#dc2626"

/>


</BarChart>


</ResponsiveContainer>


</div>









{/* ================= RECENT ACTIVITY ================= */}



<div className="
grid
lg:grid-cols-2
gap-6
">






{/* REQUESTS */}



<div className="
bg-white
rounded-xl
shadow-lg
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

🩸 Recent Blood Requests

</h2>





{

safeRequests.length === 0 ?


(

<p className="text-gray-500">

No requests available

</p>


)

:

(

safeRequests
.slice(0,5)
.map((request)=>(



<div

key={request.id}

className="
flex
justify-between
items-center
border-b
py-3
"

>


<div>


<p className="
font-semibold
">

{request.blood_group}

Blood Request

</p>



<p className="
text-sm
text-gray-500
">

{request.location || "Unknown location"}

</p>


</div>




<span

className={`

px-3
py-1
rounded-full
text-xs

${
request.status==="Completed"

?

"bg-green-100 text-green-700"

:

"bg-yellow-100 text-yellow-700"

}

`}

>

{request.status}

</span>




</div>


))

)


}



</div>








{/* USERS */}




<div className="
bg-white
rounded-xl
shadow-lg
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

👥 Latest Users

</h2>





{

safeUsers.length === 0 ?


(

<p className="
text-gray-500
">

No users found

</p>

)


:


(

safeUsers

.slice(-5)

.reverse()

.map((user)=>(



<div

key={user.id}

className="
flex
items-center
gap-4
border-b
py-3
"

>



<div

className="
w-12
h-12
rounded-full
bg-red-600
text-white
flex
items-center
justify-center
font-bold
text-xl
"

>

{

user.full_name
?.charAt(0)

}


</div>





<div>


<p className="
font-semibold
">

{user.full_name}

</p>



<p className="
text-sm
text-gray-500
">

{user.role}

</p>


</div>




</div>


))


)


}





</div>



</div>








{/* ================= FOOTER ================= */}



<div className="
bg-white
rounded-xl
shadow-lg
p-6
text-center
">


<p className="
text-gray-600
font-semibold
">

🩸 LifeLink Blood Donation Management System

</p>



<p className="
text-sm
text-gray-500
mt-2
">

Report generated:
{lastUpdated}

</p>


</div>





</div>

);

}







// =================================================
// ANALYTICS CARD
// =================================================



function AnalyticsCard({

title,

value,

text

}){


return (

<div className="
bg-white
rounded-xl
shadow-lg
p-6
border-l-4
border-red-600
hover:shadow-xl
transition
">


<p className="
text-gray-500
text-sm
">

{title}

</p>


<h2 className="
text-3xl
font-bold
mt-3
">

{value}

</h2>


<p className="
text-sm
text-gray-500
mt-2
">

{text}

</p>



</div>

);


}








// =================================================
// STAT CARD
// =================================================


function StatCard({

title,

value,

icon

}){


return (

<div className="
bg-white
rounded-xl
shadow-lg
p-6
flex
items-center
justify-between
hover:scale-105
transition
duration-300
">


<div>


<p className="
text-gray-500
text-sm
">

{title}

</p>



<h2 className="
text-4xl
font-bold
mt-2
">

{value}

</h2>


</div>




<div className="
w-16
h-16
rounded-full
bg-red-600
text-white
flex
items-center
justify-center
text-3xl
">

{icon}

</div>



</div>


);


}




export default Reports;