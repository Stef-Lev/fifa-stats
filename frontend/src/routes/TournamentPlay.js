import React, { useState, useEffect } from 'react';
import { getOneMethod } from '../helpers/httpService';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Standings from '../components/Standings';

function TournamentPlay() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOneMethod(`http://localhost:8888/tournaments/`, id).then((data) => {
      setTournament(data);
      setLoading(false);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h2>TOURNAMENT PLAY</h2>
      {loading && <Loader />}
      {!loading && <Standings tournament={tournament} />}
    </div>
  );
}

export default TournamentPlay;
