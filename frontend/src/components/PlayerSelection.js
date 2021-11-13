import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

function PlayerSelection({ playerList, addAction }) {
  const [player, setPlayer] = useState({name: '', id: '', team:''});

  const clearFields = () => {
    setPlayer({name: '', id: '', team:''})
  }
 
  const filterPlayer = (list, selected) => {
    return list.filter(player => player.name === selected)[0]
  };

  const handleSubmit = () => {
    addAction(player)
    clearFields();
  }
  
  const handlePlayerChange = (event) => {
    const selectedPlayer = filterPlayer(playerList, event.target.value)
    setPlayer({...player, name: selectedPlayer.name, id:selectedPlayer._id, });
  };

  const handleTeamChange = (event) => {
    setPlayer({...player, team: event.target.value });
  };

  return (
    <div className="side-by-side container">
      <FormControl style={{ width: '40%' }}>
        <InputLabel id="select-label">Player</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={player.name}
          label="Player"
          input={<OutlinedInput label="Player" />}
          onChange={handlePlayerChange}
        >
          {playerList.map((player) => (
            <MenuItem key={player._id} value={player.name}>{player.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText/>
      </FormControl>
      <FormControl style={{ width: '40%' }}>
        <TextField id="outlined-basic" label="Team" variant="outlined" value={player.team} onChange={handleTeamChange} />
        <FormHelperText/>
      </FormControl>
      <IconButton aria-label="add" className="plus-button" onClick={handleSubmit}>
        <AddIcon style={{ width: '32px', height: '32px' }} />
      </IconButton>
    </div>
  );
}

export default PlayerSelection;
