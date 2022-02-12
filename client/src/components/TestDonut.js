import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function TestDonut({ values }) {
  const data = {
    labels: [values[0].status, values[1].status, values[2].status],
    datasets: [
      {
        label: 'Games',
        data: [values[0].value, values[1].value, values[2].value],
        backgroundColor: ['#c2f158', '#82aac5', '#e93c42'],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
}

export default TestDonut;
