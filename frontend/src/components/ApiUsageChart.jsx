// src/components/ApiUsageChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ApiUsageChart = ({ apiUsageLogs }) => {
  const data = {
    labels: apiUsageLogs.map(log => new Date(log.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'API Calls',
        data: apiUsageLogs.map(log => log.requestMethod),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'API Usage Statistics',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ApiUsageChart;
