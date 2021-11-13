import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { getAllMethod, postMethod } from '../helpers/httpService';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import PlayerSelection from '../components/PlayerSelection';
import Participant from '../components/Participant';

function TournamentCreate() {
  const [participants, setParticipants] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(1);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMethod('http://localhost:8888/players').then((data) => {
      setPlayers(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(rating,participants)
  }, [rating,participants]);

  const playerAdd = (item) => {
    setParticipants([...participants, item])
  };

  const handleSubmit = () => {
      console.log('no')
      const filteredPlayers = players.filter((item) =>
        participants.includes(item.name),
      );

      const reqBody = {
        teams_rating: rating,
        participants: filteredPlayers,
      };
      postMethod('http://localhost:8888/tournaments', reqBody).then((res) =>
        navigate(`/tournaments/${res._id}`),
      );
  };


  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <>
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

          <PlayerSelection playerList={players} addAction={playerAdd}/>

          {participants.map((item, index) => <Participant name={item.name} team={item.team}/>)}

          <div className='flex-centered'>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={participants.length < 2}
            >
              Start Tournament
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default TournamentCreate;
