import React from 'react';
import { DonutMultiple, DonutElement } from 'react-donut-component';

function DonutChartTournament(props) {
  const { values } = props;
  const colorsArr = ['#b834c6', '#1077c3'];
  console.log(values);

  return (
    <div className="game-donut-container">
      <h5>Tournaments</h5>
      <DonutMultiple linecap="butt" size={150} strokeWidth={20} animate={true}>
        <DonutElement color={colorsArr[0]} name={values[0].status}>
          {values[0].value}
        </DonutElement>
        <DonutElement color={colorsArr[1]} name={values[1].status}>
          {values[1].value}
        </DonutElement>
      </DonutMultiple>
    </div>
  );
}

export default DonutChartTournament;
