import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Loader from '../components/Loader';
import PlayerSelection from '../components/PlayerSelection';
import Participant from '../components/Participant';
import { ApiErrorContext } from '../context/ApiErrorContext';
import { getAllMethod, postMethod } from '../helpers/httpService';

function TournamentCreate() {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(1);
  const [players, setPlayers] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();
  const { showFlashError } = useContext(ApiErrorContext);

  useEffect(() => {
    getAllMethod(`/api/players`)
      .then((data) => {
        setPlayers(data);
        setPlayerList(data);
        setLoading(false);
      })
      .catch(() =>
        showFlashError('Something went wrong. Please try again later.'),
      );
  }, [showFlashError]);

  const playerAdd = (item) => {
    setParticipants([...participants, item]);
    setPlayerList((prevState) =>
      prevState.filter((player) => player._id !== item.id),
    );
  };

  const playerRemove = (item) => {
    setParticipants(participants.filter((player) => player.id !== item.id));
    setPlayerList((prevState) =>
      [...prevState, players.filter((player) => player._id === item.id)].flat(),
    );
  };

  const handleSubmit = () => {
    const reqBody = {
      teams_rating: rating,
      participants,
    };
    postMethod(`/api/tournaments`, reqBody)
      .then((res) => navigate(`/tournaments/${res._id}`))
      .catch(() =>
        showFlashError('Something went wrong. Please try again later.'),
      );
  };

  return (
    <div className="tournament-create-page">
      {loading && <Loader />}
      {!loading && (
        <Container maxWidth="sm" className="main-container">
          <Typography className="main-title">Create tournament</Typography>
          <Typography>Teams rating</Typography>
          <div className="flex-centered container">
            <Rating
              name="simple-controlled"
              value={rating}
              size="large"
              precision={0.5}
              onChange={(ev, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
          <Typography>Participants</Typography>
          <PlayerSelection playerList={playerList} addAction={playerAdd} />

          {participants.map((item, index) => (
            <Participant
              key={index + 1}
              player={item}
              removeAction={playerRemove}
            />
          ))}

          {participants.length >= 2 && (
            <div className="flex-centered">
              <Button
                className="brand-btn"
                variant="contained"
                onClick={handleSubmit}
              >
                Start Tournament
              </Button>
            </div>
          )}
        </Container>
      )}
    </div>
  );
}

export default TournamentCreate;
