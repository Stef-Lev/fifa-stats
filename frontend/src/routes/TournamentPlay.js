import React, { useState, useEffect } from 'react';
import { getOneMethod } from '../helpers/httpService';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Standings from '../components/Standings';
import Typography from '@mui/material/Typography';
import MessageModal from '../components/MessageModal';
import TournamentGamesContainer from '../components/TournamentGamesContainer';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function TournamentPlay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    getOneMethod(`http://localhost:8888/tournaments/`, id).then((data) => {
      setTournament(data);
      setLoading(false);
    });
  }, [id]);

  const finalizeTournament = () => {
    getOneMethod(`http://localhost:8888/tournaments/complete/`, id).then(() =>
      navigate('/'),
    );
  };

  tournament && console.log(tournament);
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
              style={{ marginRight: '20px' }}
            >
              Finalize tournament
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => console.log('Cancel tournament')}
            >
              Quit
            </Button>
          </div>
          <MessageModal
            open={open}
            onClose={() => setOpen(false)}
            title={'Wait a minute!'}
            msg={'Are you sure you want to delete the tournament?'}
            type="warning"
          />
        </div>
      )}
    </div>
  );
}

export default TournamentPlay;
