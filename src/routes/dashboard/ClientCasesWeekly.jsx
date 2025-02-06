import React from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

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

// Function to generate labels for the last 7 days
function getLast7DaysLabels() {
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    labels.push(moment().subtract(i, 'days').format('dddd')); // Format as weekday names
  }
  return labels;
}

// Function to generate data points for each client and day
function getDataForLast7Days(data, labels) {
  const dayToIndex = {}; // Mapping of days to label indices
  labels.forEach((day, index) => {
    dayToIndex[day] = index;
  });

  const counts = new Array(7).fill(0); // Initialize an array of zeros

  data.forEach(item => {
    const day = moment(item.date).format('dddd');
    if (dayToIndex[day] !== undefined) {
      counts[dayToIndex[day]] += parseInt(item.product_count);
    }
  });

  return counts;
}

const ClientCasesWeekly = ({ dashboard }) => {
  const clientsCasesnew = dashboard?.clients_cases_1_counts_daily || [];
  const clientsCasesmod = dashboard?.clients_cases_8_counts_daily || [];
  const clientsCasesall = dashboard?.clients_cases_counts_daily || [];

  // Generate labels for the last 7 days
  const labels = getLast7DaysLabels();

  // Generate data points for each dataset
  const datanew = getDataForLast7Days(clientsCasesnew, labels);
  const datamod = getDataForLast7Days(clientsCasesmod, labels);
  const dataall = getDataForLast7Days(clientsCasesall, labels);

  const databar = {
    labels: labels,
    datasets: [
      {
        label: `New Cases`,
        data: datanew,
        backgroundColor: 'rgb(21 109 161)',
        borderColor: 'rgb(21 109 161)',
        borderWidth: 1,
      },
      {
        label: 'Modifications',
        data: datamod,
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

export default ClientCasesWeekly;
