import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';

// Register required components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

const ApiUsageDashboard = ({ theme }) => {
  const [apiUsageData, setApiUsageData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/apiusage');
        setApiUsageData(response.data);
      } catch (error) {
        console.error('Error fetching API usage data:', error);
      }
    };

    fetchData();
  }, []);

  const getUsers = () => {
    const users = [...new Set(apiUsageData.map(usage => usage.userId))];
    return users;
  };

  const getUserUsage = (userId) => {
    const userUsage = apiUsageData.filter(usage => usage.userId === userId);
    const methods = userUsage.reduce((acc, usage) => {
      acc[usage.requestMethod] = (acc[usage.requestMethod] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(methods),
      datasets: [{
        label: 'Request Methods',
        data: Object.values(methods),
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)', 'rgba(153,102,255,0.6)'],
      }]
    };
  };

  const getUsageOverTime = () => {
    const usageOverTime = apiUsageData.reduce((acc, usage) => {
      const date = new Date(usage.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(usageOverTime),
      datasets: [{
        label: 'Requests Over Time',
        data: Object.values(usageOverTime),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      }]
    };
  };

  const getEndpointUsage = () => {
    const endpoints = apiUsageData.reduce((acc, usage) => {
      acc[usage.endpoint] = (acc[usage.endpoint] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(endpoints),
      datasets: [{
        label: 'Endpoint Usage',
        data: Object.values(endpoints),
        backgroundColor: 'rgba(54,162,235,0.6)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
      }]
    };
  };

  return (
    <div className={`dashboard ${theme}`}>
      <div>
        <h2>User IDs</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {getUsers().map(userId => (
              <tr key={userId} onClick={() => setSelectedUserId(userId)}>
                <td>{userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUserId && (
        <div>
          <h2>Usage for User ID: {selectedUserId}</h2>
          {/* new line */}
          <div className="chart-container">
          <Pie data={getUserUsage(selectedUserId)} />
        </div>
        </div>
      )}
      <div>
        <h2>Requests Over Time</h2>
        <Line data={getUsageOverTime()} />
      </div>
      <div>
        <h2>Endpoint Usage</h2>
        <Bar data={getEndpointUsage()} />
      </div>
    </div>
  );
};

export default ApiUsageDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
// import { Line, Pie } from 'react-chartjs-2';

// // Register required components
// Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

// const ApiUsageDashboard = () => {
//   const [apiUsageData, setApiUsageData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/apiusage');
//         setApiUsageData(response.data);
//       } catch (error) {
//         console.error('Error fetching API usage data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const getUsageByMethod = () => {
//     const methods = apiUsageData.reduce((acc, usage) => {
//       acc[usage.requestMethod] = (acc[usage.requestMethod] || 0) + 1;
//       return acc;
//     }, {});

//     return {
//       labels: Object.keys(methods),
//       datasets: [{
//         label: 'Request Methods',
//         data: Object.values(methods),
//         backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)', 'rgba(153,102,255,0.6)'],
//       }]
//     };
//   };

//   const getUsageOverTime = () => {
//     const usageOverTime = apiUsageData.reduce((acc, usage) => {
//       const date = new Date(usage.timestamp).toLocaleDateString();
//       acc[date] = (acc[date] || 0) + 1;
//       return acc;
//     }, {});

//     return {
//       labels: Object.keys(usageOverTime),
//       datasets: [{
//         label: 'Requests Over Time',
//         data: Object.values(usageOverTime),
//         backgroundColor: 'rgba(75,192,192,0.6)',
//         borderColor: 'rgba(75,192,192,1)',
//         fill: false,
//       }]
//     };
//   };

//   return (
//     <div>
//       <h1>API Usage Dashboard</h1>
//       <div>
//         <h2>Requests by Method</h2>
//         <Pie data={getUsageByMethod()} />
//       </div>
//       <div>
//         <h2>Requests Over Time</h2>
//         <Line data={getUsageOverTime()} />
//       </div>
//     </div>
//   );
// };

// export default ApiUsageDashboard;




//////////////////////////////////////////second/////////////////////////////////////////////////



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Line, Pie, Bar } from 'react-chartjs-2';

// // Register required components
// Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

// const ApiUsageDashboard = () => {
//   const [apiUsageData, setApiUsageData] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/apiusage');
//         setApiUsageData(response.data);
//       } catch (error) {
//         console.error('Error fetching API usage data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const getUsers = () => {
//     const users = [...new Set(apiUsageData.map(usage => usage.userId))];
//     return users;
//   };

//   const getUserUsage = (userId) => {
//     const userUsage = apiUsageData.filter(usage => usage.userId === userId);
//     const methods = userUsage.reduce((acc, usage) => {
//       acc[usage.requestMethod] = (acc[usage.requestMethod] || 0) + 1;
//       return acc;
//     }, {});

//     return {
//       labels: Object.keys(methods),
//       datasets: [{
//         label: 'Request Methods',
//         data: Object.values(methods),
//         backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)', 'rgba(153,102,255,0.6)'],
//       }]
//     };
//   };

//   const getUsageOverTime = () => {
//     const usageOverTime = apiUsageData.reduce((acc, usage) => {
//       const date = new Date(usage.timestamp).toLocaleDateString();
//       acc[date] = (acc[date] || 0) + 1;
//       return acc;
//     }, {});

//     return {
//       labels: Object.keys(usageOverTime),
//       datasets: [{
//         label: 'Requests Over Time',
//         data: Object.values(usageOverTime),
//         backgroundColor: 'rgba(75,192,192,0.6)',
//         borderColor: 'rgba(75,192,192,1)',
//         fill: false,
//       }]
//     };
//   };

//   const getEndpointUsage = () => {
//     const endpoints = apiUsageData.reduce((acc, usage) => {
//       acc[usage.endpoint] = (acc[usage.endpoint] || 0) + 1;
//       return acc;
//     }, {});

//     return {
//       labels: Object.keys(endpoints),
//       datasets: [{
//         label: 'Endpoint Usage',
//         data: Object.values(endpoints),
//         backgroundColor: 'rgba(54,162,235,0.6)',
//         borderColor: 'rgba(54,162,235,1)',
//         borderWidth: 1,
//       }]
//     };
//   };

//   return (
//     <div>
//       <h1>API Usage Dashboard</h1>
//       <div>
//         <h2>User IDs</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>User ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {getUsers().map(userId => (
//               <tr key={userId} onClick={() => setSelectedUserId(userId)}>
//                 <td>{userId}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {selectedUserId && (
//         <div>
//           <h2>Usage for User ID: {selectedUserId}</h2>
//           <Pie data={getUserUsage(selectedUserId)} />
//         </div>
//       )}
//       <div>
//         <h2>Requests Over Time</h2>
//         <Line data={getUsageOverTime()} />
//       </div>
//       <div>
//         <h2>Endpoint Usage</h2>
//         <Bar data={getEndpointUsage()} />
//       </div>
//     </div>
//   );
// };

// export default ApiUsageDashboard;


