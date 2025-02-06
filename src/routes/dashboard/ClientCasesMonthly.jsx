import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

// Function to generate labels with client names and months
function getClientMonthLabels(data) {
  return data.map(item => `${item.username} - ${item.month_name}`);
}

// Function to generate data points for each client-month label
function getDataForClientMonths(data) {
  return data.map(item => parseInt(item.cases_count));
}

const ClientCasesMonthly = ({ dashboard }) => {
  const clientsCasesnew = dashboard?.clients_cases_1_counts_monthly || [];
  const clientsCasesmod = dashboard?.clients_cases_8_counts_monthly || [];
  const allcases = dashboard?.clients_cases_counts_monthly || [];

  // Generate labels based on the first dataset (assuming all datasets share the same labels)
  const labels = getClientMonthLabels(allcases);

  // Generate data points for each dataset
  const datan= getDataForClientMonths(clientsCasesnew);
  const datam = getDataForClientMonths(clientsCasesmod);
  const dataall = getDataForClientMonths(allcases);

  const databar = {
    labels: labels,
    datasets: [
      {
        label: `New Cases`,
        data: datan,
        backgroundColor: 'rgb(21 109 161)',
        borderColor: 'rgb(21 109 161)',
        borderWidth: 1,
      },
      {
        label: 'Modifications',
        data: datam,
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        borderWidth: 1,
      },
      {
        label: 'All Cases',
        data: dataall,
        backgroundColor: '#02ccfe',
        borderColor: '#02ccfe',
        borderWidth: 1,
      },
    ],
  };

  const optionsbar = {
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  return (
    <div>
      <Bar data={databar} options={optionsbar} />
    </div>
  );
};

export default ClientCasesMonthly;
