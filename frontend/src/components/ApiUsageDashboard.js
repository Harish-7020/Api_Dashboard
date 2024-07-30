// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Line, Pie, Bar } from 'react-chartjs-2';

// // Register required components
// Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

// const ApiUsageDashboard = ({ theme }) => {
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
//     <div className={`dashboard ${theme}`}>
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
//           {/* new line */}
//           <div className="chart-container">
//           <Pie data={getUserUsage(selectedUserId)} />
//         </div>
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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Line, Pie, Bar } from 'react-chartjs-2';

// // Register required components
// Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

// const ApiUsageDashboard = ({ theme }) => {
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
//     <div className={`dashboard ${theme}`}>
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
//           {/* new line */}
//           <div className="chart-container">
//           <Pie data={getUserUsage(selectedUserId)} />
//         </div>
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

//working code

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Line, Pie, Bar } from 'react-chartjs-2';

// // Register required components
// Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

// const ApiUsageDashboard = ({ theme }) => {
//   const [apiUsageData, setApiUsageData] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [requestCounts, setRequestCounts] = useState({
//     GET: 0,
//     POST: 0,
//     PUT: 0,
//     DELETE: 0,
//   });

//   //network traffic
//   const [networkTraffic, setNetworkTraffic] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/apiusage');
//         setApiUsageData(response.data);
//       } catch (error) {
//         console.error('Error fetching API usage data:', error);
//       }
//     };

//     const fetchRequestCounts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/apiusage/totals');
//         setRequestCounts(response.data);
//       } catch (error) {
//         console.error('Error fetching request counts:', error);
//       }
//     };

//     //network traffic

//   const fetchNetworkTraffic = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/apiusage/traffic');
//       setNetworkTraffic(response.data);
//     } catch (error) {
//       console.error('Error fetching network traffic data:', error);
//     }
//   };


//     fetchData();
//     fetchRequestCounts();
//     fetchNetworkTraffic();
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
//         borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(153,102,255,1)'],
//         borderWidth: 1,
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
//         borderWidth: 1,
//         fill: false,
//         tension: 0.5,
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

//   //network traffic

  // const getNetworkTrafficData = () => {
  //   return {
  //     labels: networkTraffic.map(item => item.timestamp),
  //     datasets: [{
  //       label: 'Network Traffic',
  //       data: networkTraffic.map(item => item.count),
  //       backgroundColor: 'rgba(255,159,64,0.6)',
  //       borderColor: 'rgba(255,159,64,1)',
  //       fill: false,
  //     }]
  //   };
  // };

//   const chartOptions = {
//     animation: {
//       duration: 1500,
//       easing: 'easeInOutElastic',
//       animateScale: true,
//       animateRotate: true,
//     },
//     plugins: {
//       tooltip: {
//         enabled: true,
//         mode: 'index',
//         intersect: false,
//         backgroundColor: 'rgba(0,0,0,0.8)',
//         titleColor: '#fff',
//         bodyColor: '#fff',
//         borderColor: 'rgba(0,0,0,0.3)',
//         borderWidth: 1,
//         caretSize: 5,
//         cornerRadius: 5,
//         xPadding: 10,
//         yPadding: 10,
//       },
//       legend: {
//         display: true,
//         labels: {
//           color: theme === 'dark' ? '#fff' : '#000',
//           font: {
//             family: 'Poppins, sans-serif',
//             size: 14,
//             weight: 'bold'
//           },
//           boxWidth: 20, 
//           padding: 15
//         },
//         position: 'top',
//         align: 'start',
//       }
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: theme === 'dark' ? '#fff' : '#000',
//           font: {
//             family: 'Poppins, sans-serif',
//             size: 12
//           }
//         },
//         grid: {
//           color: theme === 'dark' ? '#444' : '#ddd'
//         }
//       },
//       y: {
//         ticks: {
//           color: theme === 'dark' ? '#fff' : '#000',
//           font: {
//             family: 'Poppins, sans-serif',
//             size: 12
//           }
//         },
//         grid: {
//           color: theme === 'dark' ? '#444' : '#ddd'
//         }
//       }
//     }
//   };
//   return (
//     <div className={`dashboard ${theme}`}>
//       <div>
//         <h2>Request Counts</h2>
//         <div className="request-counts-grid">
//           <div className="request-count">
//             <h3>GET</h3>
//             <p>{requestCounts.GET}</p>
//           </div>
//           <div className="request-count">
//             <h3>POST</h3>
//             <p>{requestCounts.POST}</p>
//           </div>
//           <div className="request-count">
//             <h3>PUT</h3>
//             <p>{requestCounts.PUT}</p>
//           </div>
//           <div className="request-count">
//             <h3>DELETE</h3>
//             <p>{requestCounts.DELETE}</p>
//           </div>
//         </div>
//       </div>
//       <div>
//         <h2>Network Traffic Over Time</h2>
//         <Line data={getNetworkTrafficData()} />
//       </div>
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
//           <div className="chart-container">
//           <Pie data={getUserUsage(selectedUserId)} />
//           </div>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { FaFileCsv } from 'react-icons/fa'; // Import CSV icon

// Register required components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

const ApiUsageDashboard = ({ theme }) => {
  const [apiUsageData, setApiUsageData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [requestCounts, setRequestCounts] = useState({ GET: 0, POST: 0, PUT: 0, DELETE: 0 });
  const [networkTraffic, setNetworkTraffic] = useState([]);
  const [filter, setFilter] = useState({ method: '', status: '', date: '', endpoint: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apiUsageResponse, requestCountsResponse, networkTrafficResponse] = await Promise.all([
          axios.get('http://localhost:3000/apiusage'),
          axios.get('http://localhost:3000/apiusage/totals'),
          axios.get('http://localhost:3000/apiusage/traffic')
        ]);
        setApiUsageData(apiUsageResponse.data);
        setRequestCounts(requestCountsResponse.data);
        setNetworkTraffic(networkTrafficResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const getUsers = () => [...new Set(apiUsageData.map((usage) => usage.userId))];

  const getUserUsage = (userId) => {
    const userUsage = apiUsageData.filter((usage) => usage.userId === userId);
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

  const getNetworkTrafficData = () => ({
    labels: networkTraffic.map((item) => item.timestamp),
    datasets: [{
      label: 'Network Traffic',
      data: networkTraffic.map((item) => item.count),
      backgroundColor: 'rgba(255,159,64,0.6)',
      borderColor: 'rgba(255,159,64,1)',
      fill: false,
    }]
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = apiUsageData.filter((usage) => (
    (filter.method ? usage.requestMethod === filter.method : true) &&
    (filter.status ? usage.status === filter.status : true) &&
    (filter.date ? new Date(usage.timestamp).toLocaleDateString() === filter.date : true) &&
    (filter.endpoint ? usage.endpoint === filter.endpoint : true)
  ));

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className={`dashboard ${theme}`}>
      <div>
        <h2>Request Counts</h2>
        <div className="request-counts-grid">
          {Object.keys(requestCounts).map((method) => (
            <div
              className="request-count"
              key={method}
              style={{
                backgroundColor: {
                  GET: '#4CAF50',
                  POST: '#2196F3',
                  PUT: '#FFC107',
                  DELETE: '#F44336'
                }[method] || '#fff',
                color: '#fff'
              }}
            >
              <h3>{method}</h3>
              <p>{requestCounts[method]}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Network Traffic Over Time</h2>
        <Line data={getNetworkTrafficData()} />
      </div>

      <div>
        <h2>User IDs</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {getUsers().map((userId) => (
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
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

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>Filter Options</h2>
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          {['method', 'status', 'date', 'endpoint'].map((name) => (
            <select
              key={name}
              name={name}
              value={filter[name]}
              onChange={handleFilterChange}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#B3C8CF',
                color: '#333',
                fontSize: '16px',
                width: '150px',
                height: '40px',
                marginRight: '10px'
              }}
            >
              <option value="">All {name.charAt(0).toUpperCase() + name.slice(1)}</option>
              {name === 'method' && ['GET', 'POST', 'PUT', 'DELETE'].map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
              {name === 'status' && ['success', 'error'].map((status) => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
              {name === 'date' && [...new Set(apiUsageData.map((usage) => new Date(usage.timestamp).toLocaleDateString()))].map((date) => (
                <option key={date} value={date}>{date}</option>
              ))}
              {name === 'endpoint' && [...new Set(apiUsageData.map((usage) => usage.endpoint))].map((endpoint) => (
                <option key={endpoint} value={endpoint}>{endpoint}</option>
              ))}
            </select>
          ))}
        </div>
      </div>

      <div>
        <h2>Filtered Data</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Request Method</th>
              <th>Endpoint</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Error Details</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.requestMethod}</td>
                <td>{item.endpoint}</td>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
                <td>{item.status}</td>
                <td>{item.errorDetails || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
              style={{ margin: '0 5px' }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CSVLink
          data={filteredData}
          filename="api_usage_data.csv"
          className="export-csv"
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          <FaFileCsv style={{ marginRight: '5px' }} /> Export Data as CSV File
        </CSVLink>
      </div>
    </div>
  );
};

export default ApiUsageDashboard;



