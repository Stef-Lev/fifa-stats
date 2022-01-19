import React, { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import Loader from '../components/Loader';
import { getOneMethod } from '../helpers/httpService';

function MyData() {
  const { player } = useContext(PlayerContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  // Add a minimal library for donut chart

  useEffect(() => {
    if (player) {
      getOneMethod(`/api/players/stats/`, player._id).then((res) => {
        setData(res);
        setLoading(false);
        console.log(res);
      });
    }
  }, [player._id]);

  return (
    <div className="my-data-page">
      {loading && <Loader />}
      {!loading && (
        <div>
          <h4>Average goals per game</h4>
          <div className="my-data-container">
            <div className="my-data-item">
              <p>Scored</p>
              <hr />
              <p className="stat">{data.av_goals_scored_per_game}</p>
            </div>
            <div className="my-data-item">
              <p>Conceived</p>
              <hr />
              <p className="stat">{data.av_goals_conceived_per_game}</p>
            </div>
          </div>
          <h4>Biggest win</h4>
          <div className="my-data-item">
            <p>
              {data.biggest_win.teams.home.team} -{' '}
              {data.biggest_win.teams.away.team}{' '}
            </p>
            <p className="stat">{data.biggest_win.score}</p>
            <p>
              Against: <span className="stat">{data.biggest_win.against}</span>
            </p>
          </div>
          <h4></h4>
        </div>
      )}
    </div>
  );
}

export default MyData;
