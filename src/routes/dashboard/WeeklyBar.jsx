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

 
  // Function to get the last 7 days' names starting from today
  function getLast7DaysNames() {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const days = [];
    const today = new Date();
    const currentDayIndex = today.getDay(); // Get the current day index (0 = Sunday, 6 = Saturday)

    for (let i = 6; i >= 0; i--) {
        const dayIndex = (currentDayIndex - i + 7) % 7;
        days.push(dayNames[dayIndex]);
    }

    return days;
}
 // Function to get data for the last 7 days, filling missing days with zeros
 function getDataForLast7Days(data) {
  const daysData = new Array(7).fill(0); // Initialize an array of zeros for 7 days
  const today = new Date();
  const currentDayIndex = today.getDay();

  // Create a lookup object from the input data
  const dataLookup = {};
  data?.forEach(item => {
      dataLookup[item.day] = parseInt(item.count);
  });

  // Fill the daysData array with counts or zeros
  const dayNames = getLast7DaysNames();
  dayNames?.forEach((dayName, index) => {
      if (dataLookup[dayName] !== undefined) {
          daysData[index] = dataLookup[dayName]; // Fill with count if available
      }
  });

  return daysData;
}
const WeeklyBar = ({dashboard}) => {
    //data for bar chart
  const databar = {
    labels: getLast7DaysNames(),
    datasets: [
      {
        label: `New Cases`,
        data: getDataForLast7Days(dashboard?.cases_1_count_weekly),
        backgroundColor: 'rgb(21 109 161)',
        borderColor: 'rgb(21 109 161)',
        borderWidth: 1,
      },
      {
        label: 'Modifications',
        data: getDataForLast7Days(dashboard?.cases_8_count_weekly),
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        borderWidth: 1,
      },
      {
        label: 'All Cases',
        data: getDataForLast7Days(dashboard?.cases_count_weekly),
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

export default WeeklyBar