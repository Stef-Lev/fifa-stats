import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddIcon from '@mui/icons-material/Add';

function PlayerSelection({ players }) {
  const [player, setPlayer] = React.useState({});

  const handleChange = (event) => {
    setPlayer(event.target.value);
  };

  return (
    <div className="side-by-side">
      <FormControl style={{ width: '40%' }}>
        <InputLabel id="demo-simple-select-label">Player</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={player}
          label="Player"
          input={<OutlinedInput label="Player" />}
          onChange={handleChange}
        >
          {players.map((player) => (
            <MenuItem value={player.name}>{player.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{ width: '40%' }}>
        <InputLabel id="demo-simple-select-label">Player</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={player}
          label="Player"
          input={<OutlinedInput label="Player" />}
          onChange={handleChange}
        >
          {players.map((player) => (
            <MenuItem value={player.name}>{player.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <IconButton aria-label="add" color="success">
        <AddIcon />
      </IconButton> */}
    </div>
  );
}

export default PlayerSelection;
