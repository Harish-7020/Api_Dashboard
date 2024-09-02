import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { FaFileCsv } from 'react-icons/fa'; 
import './styles.css';

import { useSpring} from 'react-spring';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

const ApiUsageDashboard = ({ theme }) => {
  const [apiUsageData, setApiUsageData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [requestCounts, setRequestCounts] = useState({ GET: 0, POST: 0, PUT: 0, DELETE: 0 });
  const [networkTraffic, setNetworkTraffic] = useState([]);
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkUsage: { rx: 0, tx: 0 }
  });
  const [filter, setFilter] = useState({ method: '', status: '', date: '', endpoint: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apiUsageResponse, requestCountsResponse, networkTrafficResponse, systemMetricsResponse] = await Promise.all([
          axios.get('http://localhost:3000/apiusage'),
          axios.get('http://localhost:3000/apiusage/totals'),
          axios.get('http://localhost:3000/apiusage/traffic'),
          axios.get('http://localhost:3000/monitoring')
        ]);
        setApiUsageData(apiUsageResponse.data);
        setRequestCounts(requestCountsResponse.data);
        setNetworkTraffic(networkTrafficResponse.data);
        setSystemMetrics(systemMetricsResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 10000); // Fetch data every 10 sec
    return () => clearInterval(intervalId);
  }, []);

  const cpuSpring = useSpring({ value: systemMetrics.cpuUsage || 0, from: { value: 0 }, config: { duration: 1000 } });
  const memorySpring = useSpring({ value: systemMetrics.memoryUsage || 0, from: { value: 0 }, config: { duration: 1000 } });
  const diskSpring = useSpring({ value: systemMetrics.diskUsage || 0, from: { value: 0 }, config: { duration: 1000 } });
  const rxSpring = useSpring({ value: systemMetrics.networkUsage.rx || 0, from: { value: 0 }, config: { duration: 1000 } });
  const txSpring = useSpring({ value: systemMetrics.networkUsage.tx || 0, from: { value: 0 }, config: { duration: 1000 } });

  // Function to safely extract numeric values from objects
  const getNumericValue = (value) => {
    if (typeof value === 'object'  && value !== null) {
      // Log the object to understand its structure
      // console.log('Object received for value:', value);
      return parseFloat(value.value || 0); 
    }
    return parseFloat(value || 0);
  };

  const formatValue = (value) => getNumericValue(value).toFixed(2);
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
      <h2>System Metrics</h2>
      <div className="system-metrics-grid">
        <div className="metric-box">
          <h3>CPU Usage</h3>
          <CircularProgressbar
            value={formatValue(systemMetrics.cpuUsage)}
            text={`${formatValue(systemMetrics.cpuUsage)}%`}
            styles={buildStyles({
              pathColor: `rgba(62, 152, 199, ${formatValue(systemMetrics.cpuUsage) / 100})`,
              textColor: '#000000',
              trailColor: '#06D001',
            })}
          />
        </div>
        <div className="metric-box">
          <h3>Memory Usage</h3>
          <CircularProgressbar
            value={formatValue(systemMetrics.memoryUsage)}
            text={`${formatValue(systemMetrics.memoryUsage)} MB`}
            styles={buildStyles({
              pathColor: `rgba(62, 152, 199, ${formatValue(systemMetrics.memoryUsage) / 1024})`,
              textColor: '#000000',
              trailColor: '#06D001',
            })}
          />
        </div>
        <div className="metric-box">
          <h3>Disk Usage</h3>
          <CircularProgressbar
            value={formatValue(systemMetrics.diskUsage)}
            text={`${formatValue(systemMetrics.diskUsage)} MB`}
            styles={buildStyles({
              pathColor: `rgba(62, 152, 199, ${formatValue(systemMetrics.diskUsage) / 1024})`,
              textColor: '#000000',
              trailColor: '#06D001',
            })}
          />
        </div>
        <div className="metric-box">
          <h3>Network Rx</h3>
          <CircularProgressbar
            value={formatValue(systemMetrics.networkUsage.rx)}
            text={`${formatValue(systemMetrics.networkUsage.rx)} MB`}
            styles={buildStyles({
              pathColor: `rgba(249, 7, 22, ${formatValue(systemMetrics.networkUsage.rx) / 1024})`,
              textColor: '#000000',
              trailColor: '#06D001',
            })}
          />
        </div>
        <div className="metric-box">
          <h3>Network Tx</h3>
          <CircularProgressbar
            value={formatValue(systemMetrics.networkUsage.tx)}
            text={`${formatValue(systemMetrics.networkUsage.tx)} MB`}
            styles={buildStyles({
              pathColor: `rgba(249, 7, 22, ${formatValue(systemMetrics.networkUsage.tx) / 1024})`,
              textColor: '#000000',
              trailColor: '#06D001',
            })}
          />
        </div>
      </div>
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



