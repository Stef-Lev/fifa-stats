import React from 'react';
import DonutChart from './DonutChart';

function MyOverall({ data }) {
  const gamesStatColors = ['#50d892', '#e8c250', '#e34135'];
  const tournamentsStatColors = ['#0685ac', '#9fc8d5'];

  return (
    <>
      <div className="charts-container">
        <DonutChart
          values={[
            { status: 'Won', value: data.games_won },
            { status: 'Drawn', value: data.games_drawn },
            { status: 'Lost', value: data.games_lost },
          ]}
          colors={gamesStatColors}
          title="Games"
        />
        <DonutChart
          values={[
            { status: 'Won', value: data.tournaments_won },
            {
              status: 'Lost',
              value: data.tournaments_played - data.tournaments_won,
            },
          ]}
          colors={tournamentsStatColors}
          title="Tournaments"
        />
      </div>
    </>
  );
}

export default MyOverall;
