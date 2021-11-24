import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { getAllMethod, ip } from '../helpers/httpService';
import PlayerDataItem from '../components/PlayerDataItem';

function Players() {
  const [players, setPlayers] = useState({});
  const [loading, setLoading] = useState(true);

  // Add a select to filter one specific player

  useEffect(() => {
    getAllMethod(`http://${ip}:8888/players/`).then((data) => {
      setPlayers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <div>
          {players.map((player, index) => (
            <PlayerDataItem key={index + 1} player={player} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Players;
