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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';

// Register required components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

const ApiUsageDashboard = ({ theme }) => {
  const [apiUsageData, setApiUsageData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [requestCounts, setRequestCounts] = useState({
    GET: 0,
    POST: 0,
    PUT: 0,
    DELETE: 0,
  });

  //network traffic
  const [networkTraffic, setNetworkTraffic] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/apiusage');
        setApiUsageData(response.data);
      } catch (error) {
        console.error('Error fetching API usage data:', error);
      }
    };

    const fetchRequestCounts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/apiusage/totals');
        setRequestCounts(response.data);
      } catch (error) {
        console.error('Error fetching request counts:', error);
      }
    };

    //network traffic

  const fetchNetworkTraffic = async () => {
    try {
      const response = await axios.get('http://localhost:3000/apiusage/traffic');
      setNetworkTraffic(response.data);
    } catch (error) {
      console.error('Error fetching network traffic data:', error);
    }
  };


    fetchData();
    fetchRequestCounts();
    fetchNetworkTraffic();
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
        borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(153,102,255,1)'],
        borderWidth: 1,
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
        borderWidth: 1,
        fill: false,
        tension: 0.5,
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

  //network traffic

  const getNetworkTrafficData = () => {
    return {
      labels: networkTraffic.map(item => item.timestamp),
      datasets: [{
        label: 'Network Traffic',
        data: networkTraffic.map(item => item.count),
        backgroundColor: 'rgba(255,159,64,0.6)',
        borderColor: 'rgba(255,159,64,1)',
        fill: false,
      }]
    };
  };

  const chartOptions = {
    animation: {
      duration: 1500,
      easing: 'easeInOutElastic',
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        caretSize: 5,
        cornerRadius: 5,
        xPadding: 10,
        yPadding: 10,
      },
      legend: {
        display: true,
        labels: {
          color: theme === 'dark' ? '#fff' : '#000',
          font: {
            family: 'Poppins, sans-serif',
            size: 14,
            weight: 'bold'
          },
          boxWidth: 20, 
          padding: 15
        },
        position: 'top',
        align: 'start',
      }
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
          font: {
            family: 'Poppins, sans-serif',
            size: 12
          }
        },
        grid: {
          color: theme === 'dark' ? '#444' : '#ddd'
        }
      },
      y: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
          font: {
            family: 'Poppins, sans-serif',
            size: 12
          }
        },
        grid: {
          color: theme === 'dark' ? '#444' : '#ddd'
        }
      }
    }
  };
  return (
    <div className={`dashboard ${theme}`}>
      <div>
        <h2>Request Counts</h2>
        <div className="request-counts-grid">
          <div className="request-count">
            <h3>GET</h3>
            <p>{requestCounts.GET}</p>
          </div>
          <div className="request-count">
            <h3>POST</h3>
            <p>{requestCounts.POST}</p>
          </div>
          <div className="request-count">
            <h3>PUT</h3>
            <p>{requestCounts.PUT}</p>
          </div>
          <div className="request-count">
            <h3>DELETE</h3>
            <p>{requestCounts.DELETE}</p>
          </div>
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
