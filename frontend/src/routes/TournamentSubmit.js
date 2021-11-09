import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
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

function Tournaments() {
  const [participants, setParticipants] = useState([]);
  const [rating, setRating] = useState(1);
  const [players, setPlayers] = useState([]);
  const [tournamentID, setTournamentID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMethod('http://localhost:8888/players').then((data) =>
      setPlayers(data),
    );
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setParticipants(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = () => {
    const filteredPlayers = players.filter((item) =>
      participants.includes(item.name),
    );
    console.log('PARTICIPANTS', filteredPlayers);
    const reqBody = {
      teams_rating: rating,
      participants: filteredPlayers,
    };
    postMethod('http://localhost:8888/tournaments', reqBody).then((res) =>
      // navigate(`tournaments/${res._id}`),
      console.log(res._id),
    );
  };

  console.log(participants, rating);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
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
        <Typography component="legend">Read only</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(ev, newValue) => {
            setRating(newValue);
          }}
        />
        <Button onClick={handleSubmit}>Go to Tournament</Button>
      </FormControl>
    </div>
  );
}

export default Tournaments;
