import React from 'react';
import { Pie } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to generate labels with client names
function getClientNames(data) {
  return data.map(item => item.username);
}

// Function to generate data points for each client
function getClientCounts(data) {
  return data.map(item => item.average_count);
}

const ClientModifications = ({ dashboard }) => {
  const clientData = dashboard?.created_by_cases_ratio_count || [];

  // Generate labels and data points
  const labels = getClientNames(clientData);
  const dataPoints = getClientCounts(clientData);

  const dataPie = {
    labels: labels,
    datasets: [
      {
        label: 'Average Count',
        data: dataPoints,
        backgroundColor: [
          'rgba(21, 109, 161, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(21, 109, 161, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '400px', margin: '0 auto' }}>
      <Pie data={dataPie} options={optionsPie} />
    </div>
  );
};

export default ClientModifications;
