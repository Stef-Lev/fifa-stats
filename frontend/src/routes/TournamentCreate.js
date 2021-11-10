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

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <FormControl sx={{ m: 1, width: 320 }}>
          <InputLabel id="demo-multiple-checkbox-label">Players</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={participants}
            onChange={handleChange}
            input={<OutlinedInput label="Players" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {players.map((player) => (
              <MenuItem key={player.name} value={player.name}>
                <Checkbox checked={participants.indexOf(player.name) > -1} />
                <ListItemText primary={player.name} />
              </MenuItem>
            ))}
          </Select>
          {hasError && (
            <FormHelperText className="error">
              Please add the players of the tournament
            </FormHelperText>
          )}
          <Typography component="legend">Teams rating</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            size="large"
            precision={0.5}
            onChange={(ev, newValue) => {
              setRating(newValue);
            }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Go to Tournament
          </Button>
        </FormControl>
      )}
    </div>
  );
}

export default TournamentCreate;
