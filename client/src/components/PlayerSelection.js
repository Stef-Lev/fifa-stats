import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
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
  const [player, setPlayer] = useState({ name: '', id: '', team: '' });
  const { theme } = useContext(ThemeContext);

  const clearFields = () => {
    setPlayer({ name: '', id: '', team: '' });
  };

  const filterPlayer = (list, selected) => {
    return list.filter((player) => player.fullname === selected)[0];
  };

  const handleSubmit = () => {
    if (player.name) {
      addAction(player);
      clearFields();
    }
  };

  const handlePlayerChange = (event) => {
    const selectedPlayer = filterPlayer(playerList, event.target.value);
    setPlayer({
      ...player,
      name: selectedPlayer.fullname,
      id: selectedPlayer._id,
    });
  };

  const handleTeamChange = (event) => {
    setPlayer({ ...player, team: event.target.value });
  };

  return (
    <div className="flex-between container">
      <FormControl className="w-40">
        <InputLabel
          id="select-label"
          sx={{
            color: theme === 'dark' ? '#fff' : '#1b2433',
            '&.Mui-focused': {
              color: theme === 'dark' ? '#c2f158' : '#b834c6',
            },
          }}
        >
          Player
        </InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={player.name}
          label="Player"
          input={
            <OutlinedInput
              label="Player"
              sx={{
                '&.MuiOutlinedInput-root': {
                  color: theme === 'dark' ? '#fff' : '#1b2433',
                  '& fieldset': {
                    borderColor: theme === 'dark' ? '#fff' : '#1b2433',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme === 'dark' ? '#c2f158' : '#b834c6',
                  },
                },
              }}
            />
          }
          onChange={handlePlayerChange}
        >
          {playerList.map((player, index) => (
            <MenuItem key={index + 1} value={player.fullname}>
              {player.fullname}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText />
      </FormControl>
      <FormControl className="w-40">
        <TextField
          id="team"
          label="Team"
          variant="outlined"
          autoComplete="off"
          value={player.team}
          onChange={handleTeamChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: theme === 'dark' ? '#fff' : '#1b2433',
              '& fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#1b2433',
              },
              '&:hover fieldset': {
                borderColor: theme === 'dark' ? '#c2f158' : '#b834c6',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme === 'dark' ? '#c2f158' : '#b834c6',
              },
            },
            '& label': {
              color: theme === 'dark' ? '#fff' : '#1b2433',
              '&.Mui-focused': {
                color: theme === 'dark' ? '#c2f158' : '#b834c6',
              },
            },
          }}
        />
        <FormHelperText />
      </FormControl>
      <IconButton
        aria-label="add"
        className="brand-btn round-btn"
        onClick={handleSubmit}
      >
        <AddIcon className="square32" />
      </IconButton>
    </div>
  );
}

export default PlayerSelection;
