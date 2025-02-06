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
  BarElement
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement
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

const MonthlyBar = ({dashboard}) => {
    //data for bar chart
  const databar = {
    labels: getLast12MonthNames(),
    datasets: [
      {
        label: `New Cases`,
        data: getDataForLast12Months(dashboard?.cases_1_count_monthly),
        backgroundColor: 'rgb(21 109 161)',
        borderColor: 'rgb(21 109 161)',
        borderWidth: 1,
      },
      {
        label: 'Modifications',
        data: getDataForLast12Months(dashboard?.cases_8_count_monthly),
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        borderWidth: 1,
      },
      {
        label: 'All Cases',
        data: getDataForLast12Months(dashboard?.cases_count_monthly),
        backgroundColor: '#02ccfe',
        borderColor: '#02ccfe',
        borderWidth: 1,
      },
    ],
  };

  const optionsbar = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return (
    <div>
        <Bar data={databar} options={optionsbar} />
    </div>
  )
}

export default MonthlyBar