import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './css/ApiUsageList.css';
import './css/Pagination.css';
import './App.css';

const ApiUsageDashboard = () => {
  const [apiUsageData, setApiUsageData] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api-usage');
      const data = response.data;
      setApiUsageData(data);

      const chartData = {
        labels: data.map(entry => new Date(entry.timestamp).toLocaleDateString()),
        datasets: [
          {
            label: 'API Calls',
            data: data.map(entry => entry.count),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching API usage data', error);
    }
  };

  return (
    <div className="App">
      <div className="chart-container">
        <Line data={chartData} />
      </div>
      <ApiUsageList data={apiUsageData} />
    </div>
  );
};

const ApiUsageList = ({ data }) => (
  <div className="api-usage-list">
    <h2>API Usage Logs</h2>
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Request Method</th>
          <th>Endpoint</th>
          <th>Timestamp</th>
          <th>Status</th>
          <th>Error Details</th>
        </tr>
      </thead>
      <tbody>
        {data.map((log, index) => (
          <tr key={index}>
            <td>{log.userId}</td>
            <td>{log.requestMethod}</td>
            <td>{log.endpoint}</td>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.status}</td>
            <td>{log.errorDetails || 'None'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Pagination totalItems={data.length} itemsPerPage={10} />
  </div>
);

const Pagination = ({ totalItems, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pagination">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default ApiUsageDashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Table } from 'react-bootstrap';

// const ApiUsageDashboard = () => {
//   const [apiUsage, setApiUsage] = useState([]);

//   useEffect(() => {
//     const fetchApiUsage = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/apiusage');
//         console.log('API response:', response.data); // Debugging log
//         setApiUsage(response.data);
//       } catch (error) {
//         console.error('Error fetching API usage:', error);
//       }
//     };

//     fetchApiUsage();
//   }, []);

//   return (
//     <Container>
//       <h1>API Usage Dashboard</h1>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Request Method</th>
//             <th>Endpoint</th>
//             <th>Timestamp</th>
//             <th>Status</th>
//             <th>Error Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {apiUsage.map((usage) => (
//             <tr key={usage.id}>
//               <td>{usage.userId}</td>
//               <td>{usage.requestMethod}</td>
//               <td>{usage.endpoint}</td>
//               <td>{new Date(usage.timestamp).toLocaleString()}</td>
//               <td>{usage.status}</td>
//               <td>{usage.errorDetails || 'No Error'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default ApiUsageDashboard;


