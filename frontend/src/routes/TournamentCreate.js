import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { getAllMethod, postMethod } from '../helpers/httpService';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import PlayerSelection from '../components/PlayerSelection';

function TournamentCreate() {
  const [participants, setParticipants] = useState([]);
  const [hasError, setHasError] = useState(false);
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setParticipants(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = () => {
    if (!participants.length) {
      setHasError(true);
    } else {
      setHasError(false);
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
    }
  };

  //@TODO instead of multi select just add a player - team combo

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

          <PlayerSelection players={players} />
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
