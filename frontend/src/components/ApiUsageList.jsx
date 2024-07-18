// src/components/ApiUsageList.jsx
import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import ApiUsageFilters from './ApiUsageFilters';
import Pagination from './Pagination';
import ApiUsageChart from './ApiUsageChart';
import './ApiUsageList.css';

const ApiUsageList = () => {
  const [apiUsageLogs, setApiUsageLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);

  useEffect(() => {
    const fetchApiUsageLogs = async () => {
      setLoading(true);
      const logs = await ApiService.fetchApiUsageLogs();
      setApiUsageLogs(logs);
      setFilteredLogs(logs); // Initially set filtered logs to all logs
      setLoading(false);
    };
    fetchApiUsageLogs();
  }, []);

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="api-usage-container">
      <ApiUsageFilters apiUsageLogs={apiUsageLogs} setFilteredLogs={setFilteredLogs} />
      <ApiUsageChart apiUsageLogs={filteredLogs} />
      <Pagination
        logsPerPage={logsPerPage}
        totalLogs={filteredLogs.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {/* Render API usage logs */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="api-usage-list">
          {currentLogs.map((log) => (
            <li key={log.id}>
              {/* Display log details */}
              <p>User ID: {log.userId}</p>
              <p>Request Method: {log.requestMethod}</p>
              <p>Endpoint: {log.endpoint}</p>
              <p>Timestamp: {log.timestamp}</p>
              <p>Status: {log.status}</p>
              <p>Error Details: {log.errorDetails}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApiUsageList;
