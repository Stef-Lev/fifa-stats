import React from 'react';
import DonutChart from './DonutChart';

function MyOverall({ data }) {
  const gamesColors = ['#c2f158', '#82aac5', '#e93c42'];
  const tournamentsColors = ['#b834c6', '#1077c3'];

  return (
    <>
      <div className="charts-container">
        <DonutChart
          values={[
            { status: 'won', value: data.games_won },
            { status: 'drawn', value: data.games_drawn },
            { status: 'lost', value: data.games_lost },
          ]}
          colors={gamesColors}
          title="Games"
        />
        <DonutChart
          values={[
            { status: 'won', value: data.tournaments_won },
            {
              status: 'lost',
              value: data.tournaments_played - data.tournaments_won,
            },
          ]}
          colors={tournamentsColors}
          title="Tournaments"
        />
      </div>
    </>
  );
}

export default MyOverall;
