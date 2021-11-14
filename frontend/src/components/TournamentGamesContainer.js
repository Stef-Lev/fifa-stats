import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

function TournamentGamesContainer({ tournament }) {
  const [game, setGame] = useState({
    home: { player: '', goals: 0 },
    away: { player: '', goals: 0 },
  });
  console.log('GAME_ITEM', tournament);
  console.log('GAME____', game);

  const handleGoalsChange = (ev, side) => {
    setGame({
      ...game,
      [side]: { ...game[side], goals: ev.target.value },
    });
  };

  const handlePlayerChange = (ev, side) => {
    setGame({
      ...game,
      [side]: { ...game[side], player: ev.target.value },
    });
  };

  return (
    <div className="container colored with-shadow">
      {/* Include form buttons for games data */}
      {/* Include each game component */}
      <div className="side-by-side">
        <FormControl style={{ width: '55%' }}>
          <InputLabel id="select-label">Player</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={game.home.player}
            label="Player"
            input={<OutlinedInput label="Player" />}
            onChange={(ev) => handlePlayerChange(ev, 'home')}
          >
            {tournament.participants.map((item, index) => (
              <MenuItem key={index + 1} value={item.player.name}>
                {item.player.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="goal-input">
          <TextField
            type="number"
            id="outlined-basic"
            label="Goals"
            variant="outlined"
            value={game.home.goals}
            onChange={(ev) => handleGoalsChange(ev, 'home')}
          />
          <FormHelperText />
        </FormControl>
        <div className="flex-centered">
          <Chip label="Home" color="primary" />
        </div>
      </div>
      <div className="side-by-side">
        <FormControl style={{ width: '55%' }}>
          <InputLabel id="select-label">Player</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={game.away.player}
            label="Player"
            input={<OutlinedInput label="Player" />}
            onChange={(ev) => handlePlayerChange(ev, 'away')}
          >
            {tournament.participants.map((item, index) => (
              <MenuItem key={index + 1} value={item.player.name}>
                {item.player.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="goal-input">
          <TextField
            type="number"
            id="outlined-basic"
            label="Goals"
            variant="outlined"
            value={game.away.goals}
            onChange={(ev) => handleGoalsChange(ev, 'away')}
          />
          <FormHelperText />
        </FormControl>
        <div className="flex-centered">
          <Chip label="Away" color="error" />
        </div>
      </div>
      <div className="flex-centered">
        <Button
          className="brand-btn"
          variant="contained"
          onClick={() => console.log('clicked')}
        >
          Submit game
        </Button>
      </div>
    </div>
  );
}

export default TournamentGamesContainer;
