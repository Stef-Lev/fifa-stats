import React, { useState, useEffect } from 'react';
import { getOneMethod } from '../helpers/httpService';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Standings from '../components/Standings';
import Typography from '@mui/material/Typography';

function TournamentPlay() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  // const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOneMethod(`http://localhost:8888/tournaments/`, id).then((data) => {
      setTournament(data);
      setLoading(false);
      console.log(data);
    });
  }, [id]);

  return (
    <div>
      <Typography className='main-title'>TOURNAMENT{' '}{tournament && new Date(tournament.date).toLocaleDateString('el-GR')}</Typography>
      {loading && <Loader />}
      {!loading && (
        <div>
          <Standings tournament={tournament} />
        </div>
      )}
    </div>
  );
}

export default TournamentPlay;
