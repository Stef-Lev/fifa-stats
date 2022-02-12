import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function TestDonut({ values, colors, title }) {
  const style = { width: '100%' };

  const mapValues = (arr, value) => {
    return arr.map((item) => item[value]);
  };

  const data = {
    labels: mapValues(values, 'status'),
    datasets: [
      {
        label: 'Games',
        data: mapValues(values, 'value'),
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        align: 'center',
        position: 'right',
        fullSize: false,
      },
    },
  };

  return (
    <div className='chart-item' data-title={title}>
      <Doughnut data={data} options={options} style={style} />
    </div>
  );
}

export default TestDonut;
