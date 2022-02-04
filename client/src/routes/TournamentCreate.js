import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { getAllMethod, postMethod } from '../helpers/httpService';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import PlayerSelection from '../components/PlayerSelection';
import Participant from '../components/Participant';
import Container from '@mui/material/Container';

function TournamentCreate() {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(1);
  const [players, setPlayers] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMethod(`/api/players`).then((data) => {
      setPlayers(data);
      setPlayerList(data);
      setLoading(false);
    });
  }, []);

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
    postMethod(`/api/tournaments`, reqBody).then((res) =>
      navigate(`/tournaments/${res._id}`),
    );
  };

  return (
    <div className="tournament-create-page">
      {loading && <Loader />}
      {!loading && (
        <Container maxWidth="sm" style={{padding:0}}>
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
