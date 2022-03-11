import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Loader from '../components/Loader';
import Standings from '../components/Standings';
import MessageModal from '../components/MessageModal';
import TournamentGamesContainer from '../components/TournamentGamesContainer';
import { ThemeContext } from '../context/ThemeContext';
import { PlayerContext } from '../context/PlayerContext';
import {
  getOneMethod,
  deleteMethod,
  getAllMethod,
  updateMethod,
} from '../helpers/httpService';
import { applyThemeColor } from '../helpers/applyThemeColor';

function TournamentPlay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openFinalModal, setOpenFinalModal] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { player } = useContext(PlayerContext);

  useEffect(() => {
    fetchTournament(id);
  }, [id]);

  const fetchTournament = (id) => {
    getOneMethod(`/api/tournaments/`, id)
      .then((data) => {
        setTournament(data);
      })
      .then(() => getAllMethod('/api/players/'))
      .then((res) => {
        const colorArr = res.map((item) => ({
          id: item._id,
          color: item.color,
        }));
        setColors(colorArr);
      })
      .then(() => setLoading(false));
  };

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

  const shouldShowButton = () => {
    if (player && tournament) {
      if (player.role === 'admin' && tournament.status !== 'Completed') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const onGameSubmit = (game, callback) => {
    updateMethod(`/api/tournaments/`, id, game)
      .then(() => fetchTournament(id))
      .then(callback());
  };

  const onGameRemove = (game) => {
    deleteMethod(`/api/tournaments/${id}/game/${game._id}`, '').then(() =>
      fetchTournament(id),
    );
  };

  return (
    <div className="tournament-play-page">
      {loading && <Loader />}
      {!loading && (
        <Container maxWidth="sm" className="main-container">
          <Typography className="main-title">
            {tournament.teams_rating} Stars -{' '}
            {new Date(tournament.date).toLocaleDateString()}
          </Typography>
          <div>
            <Standings tournament={tournament} />
            <TournamentGamesContainer
              tournament={tournament}
              colors={colors}
              onGameSubmit={onGameSubmit}
              onGameRemove={onGameRemove}
            />
            {shouldShowButton() && (
              <div className="flex-centered">
                <Button
                  variant="contained"
                  className="finalize-btn mr20"
                  onClick={() => setOpenFinalModal(true)}
                >
                  Finalize tournament
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpenCancelModal(true)}
                  sx={{
                    color: applyThemeColor(theme, '#c2f158', '#1b2433'),
                    borderColor: applyThemeColor(theme, '#c2f158', '#1b2433'),
                  }}
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
        </Container>
      )}
    </div>
  );
}

export default TournamentPlay;
