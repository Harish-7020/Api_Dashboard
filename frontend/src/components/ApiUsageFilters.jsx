// src/components/ApiUsageFilters.jsx
import React from 'react';

const ApiUsageFilters = ({ apiUsageLogs, setFilteredLogs }) => {
  const handleFilter = (event) => {
    const filterKeyword = event.target.value.toLowerCase();
    const filteredLogs = apiUsageLogs.filter((log) =>
      log.endpoint.toLowerCase().includes(filterKeyword)
    );
    setFilteredLogs(filteredLogs);
  };

  return (
    <div>
      <input type="text" placeholder="Filter by endpoint..." onChange={handleFilter} />
    </div>
  );
};

export default ApiUsageFilters;
