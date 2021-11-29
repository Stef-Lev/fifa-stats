import React, { useState, useEffect } from 'react';
import { getAllMethod } from '../helpers/httpService';
import TournamentItem from '../components/TournamentItem';
import Loader from '../components/Loader';

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMethod(`/api/tournaments`).then((data) => {
      setTournaments(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="tournaments-list-page">
      {loading && <Loader />}
      {!loading &&
        tournaments.map((item, index) => (
          <TournamentItem key={index + 1} tournament={item} />
        ))}
      {!loading && !tournaments.length && <h2>No tournaments yet</h2>}
    </div>
  );
}

export default Tournaments;
