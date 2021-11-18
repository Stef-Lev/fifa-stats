import React, { useState, useEffect } from 'react';
import { getOneMethod } from '../helpers/httpService';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Standings from '../components/Standings';
import Typography from '@mui/material/Typography';
import TournamentGamesContainer from '../components/TournamentGamesContainer';
import Button from '@mui/material/Button';

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
  }, [id]);

  const finalizeTournament = () => {
    console.log(tournament);
  };

  return (
    <div>
      <Typography className="main-title">TOURNAMENT</Typography>
      {loading && <Loader />}
      {!loading && (
        <div>
          <Standings tournament={tournament} />
          <TournamentGamesContainer tournament={tournament} />
          <div className="flex-centered">
            <Button
              variant="contained"
              color="warning"
              onClick={finalizeTournament}
            >
              Finalize tournament
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TournamentPlay;
