import React, { useState, useEffect } from 'react';
import { getOneMethod, deleteMethod } from '../helpers/httpService';
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
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openFinalModal, setOpenFinalModal] = useState(false);

  useEffect(() => {
    getOneMethod(`/api/tournaments/`, id).then((data) => {
      setTournament(data);
      setLoading(false);
    });
  }, [id]);

  const finalizeTournament = () => {
    getOneMethod(`/api/tournaments/complete/`, id).then(() => {
      setOpenFinalModal(false);
      navigate('/');
    });
  };

  const cancelTournament = () => {
    deleteMethod(`/api/tournaments/`, id)
      .then(() => {
        setOpenCancelModal(false);
        navigate('/');
      })
      .catch((err) => console.log(new Error(err)));
  };

  return (
    <div className="tournament-play-page">
      {loading && <Loader />}
      {!loading && (
        <>
          <Typography className="main-title">
            {tournament.teams_rating} Stars -{' '}
            {new Date(tournament.date).toLocaleDateString()}
          </Typography>
          <div>
            <Standings tournament={tournament} />
            <TournamentGamesContainer tournament={tournament} />
            {tournament.status !== 'Completed' && (
              <div className="flex-centered">
                <Button
                  variant="contained"
                  className="finalize-btn"
                  onClick={() => setOpenFinalModal(true)}
                  style={{ marginRight: '20px' }}
                >
                  Finalize tournament
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpenCancelModal(true)}
                  sx={{ color: '#c2f158', borderColor: '#c2f158' }}
                >
                  Quit
                </Button>
              </div>
            )}
            <MessageModal
              open={openCancelModal}
              onClose={() => setOpenCancelModal(false)}
              title={'Wait a minute!'}
              buttonAction={() => cancelTournament()}
              msg={'Are you sure you want to delete the tournament?'}
              type="cancel"
            />
            <MessageModal
              open={openFinalModal}
              onClose={() => setOpenFinalModal(false)}
              title={'Are you finished?'}
              buttonAction={() => finalizeTournament()}
              msg={'Are you sure you want to complete the tournament?'}
              type="confirm"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default TournamentPlay;
