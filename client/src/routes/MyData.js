import React, { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import Loader from '../components/Loader';
import { getOneMethod } from '../helpers/httpService';

function MyData() {
  const { player, isLoading } = useContext(PlayerContext);
  const [data, setData] = useState({});
  // Add a minimal library for donut chart

  useEffect(() => {
    if (player) {
      getOneMethod(`/api/players/stats/`, player._id).then((res) => {
        setData(res);
        console.log(res);
      });
    }
  }, [player._id]);

  return (
    <div className="my-data">
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <p>{player.fullname}</p>
          <p>{player.games_played.list.length}</p>
        </div>
      )}
    </div>
  );
}

export default MyData;
