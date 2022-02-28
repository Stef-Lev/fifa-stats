import React from 'react';

function MyRecords({ data }) {
  return (
    <>
      <h4>Average goals per game</h4>
      <div className="my-data-container">
        <div className="my-data-item outlined">
          <p>Scored</p>
          <hr />
          <p className="stat">{data.av_goals_scored_per_game}</p>
        </div>
        <div className="my-data-item outlined">
          <p>Conceived</p>
          <hr />
          <p className="stat">{data.av_goals_conceived_per_game}</p>
        </div>
      </div>
      <h4>Biggest win</h4>
      <div className="my-data-item outlined">
        <p>
          {data.biggest_win.teams.home.team} -{' '}
          {data.biggest_win.teams.away.team}{' '}
        </p>
        <p className="stat">{data.biggest_win.score}</p>
        <p>
          Against: <span className="stat">{data.biggest_win.against}</span>
        </p>
      </div>
      <h4>Biggest loss</h4>
      <div className="my-data-item outlined">
        <p>
          {data.biggest_loss.teams.home.team} -{' '}
          {data.biggest_loss.teams.away.team}{' '}
        </p>
        <p className="stat">{data.biggest_loss.score}</p>
        <p>
          Against: <span className="stat">{data.biggest_loss.against}</span>
        </p>
      </div>
    </>
  );
}

export default MyRecords;
