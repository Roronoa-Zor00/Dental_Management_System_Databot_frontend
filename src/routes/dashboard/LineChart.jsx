import React from 'react'
import { Line , Bar} from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);
// Function to generate the labels for the last 12 months
 function getLast12MonthNames() {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const labels = [];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  for (let i = 11; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i);
      labels.push(monthNames[date.getMonth()]);
  }

  return labels;
}
// Function to generate data for the last 12 months, filling missing months with zeros
function getDataForLast12Months(data) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthsData = new Array(12).fill(0); // Initialize an array of zeros

  // Create a lookup object from the input data
  const dataLookup = {};
  data?.forEach(item => {
      dataLookup[`${item.year}-${parseInt(item.month)}`] = parseInt(item.count);
  });

  // Fill the monthsData array with counts or zeros
  for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, currentMonth - i);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
      const key = `${year}-${month}`;

      if (dataLookup[key] !== undefined) {
          monthsData[11 - i] = dataLookup[key]; // Fill with count if available
      }
  }

  return monthsData;
}


const LineChart = ({dashboard}) => {
  const data = {
    labels:  getLast12MonthNames(),
    datasets: [
      {
        label: `New Cases`,
        data: getDataForLast12Months(dashboard?.cases_1_count_monthly),
        backgroundColor: 'rgba(165, 37, 218,1)',
        borderColor: 'rgba(255, 99, 32, 1)',
        borderWidth: 1,
      },
      {
        label: 'Modifications',
        data: getDataForLast12Months(dashboard?.cases_7_count_monthly),
        backgroundColor: 'rgba(220,110, 9,1)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'All Cases',
        data: getDataForLast12Months(dashboard?.cases_count_monthly),
        backgroundColor: 'rgba(190, 37, 118,1)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div><Line data={data} options={options} /></div>
  )
}

export default LineChart