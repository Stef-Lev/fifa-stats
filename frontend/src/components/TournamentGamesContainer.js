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

function TournamentGamesContainer({tournament}) {
  const [gamesList, setGamesList] = useState([]);
  console.log('GAME_ITEM', tournament);

  return (
    <div>
      {/* Include form buttons for games data */}
      <div className='container colored'>
      <p>TEST</p>
      <ul>
        {/* Include each game component */}
        {gamesList.map(item =><li>{item}</li>)}
      </ul>
      
      </div>
      {/* <FormControl style={{ width: '40%' }}>
        <InputLabel id="select-label">Player</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={player.name}
          label="Player"
          input={<OutlinedInput label="Player" />}
          onChange={handlePlayerChange}
        >
          {playerList.map((player, index) => (
            <MenuItem key={index+1} value={player.name}>{player.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText/>
      </FormControl>
      <FormControl style={{ width: '40%' }}>
        <TextField id="outlined-basic" label="Team" variant="outlined" value={player.team} onChange={handleTeamChange} />
        <FormHelperText/>
      </FormControl>
      <IconButton aria-label="add" className="brand-btn round-btn" onClick={handleSubmit}>
        <AddIcon style={{ width: '32px', height: '32px' }} />
      </IconButton> */}
    </div>
  );
}

export default TournamentGamesContainer;
