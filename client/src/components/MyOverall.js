import React from 'react';
import TestDonut from './TestDonut';

function MyOverall({data}) {
  return (
    <>
      <div className="charts-container">
        <TestDonut
          values={[
            { status: 'won', value: data.games_won },
            { status: 'drawn', value: data.games_drawn },
            { status: 'lost', value: data.games_lost },
          ]}
          colors={['#c2f158', '#82aac5', '#e93c42']}
          title="Games"
        />
        <TestDonut
          values={[
            { status: 'won', value: data.tournaments_won },
            { status: 'lost', value: data.tournaments_played },
          ]}
          colors={['#b834c6', '#1077c3']}
          title="Tournaments"
        />
      </div>
    </>
  );
}

export default MyOverall;
