import React, { useState, useEffect, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Chip from '@mui/material/Chip';
import { ThemeContext } from '../context/ThemeContext';
import { applyThemeColor } from '../helpers/applyThemeColor';

function PlayerScoreInput({
  playersList,
  label,
  state,
  onGoalChange,
  onPlayerChange,
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="side-by-side">
      <FormControl className="w-55">
        <InputLabel
          id="select-label"
          shrink
          sx={{
            color: applyThemeColor(theme, '#fff', '#1b2433'),
            '&.Mui-focused': {
              color: applyThemeColor(theme, '#c2f158', '#b834c6'),
            },
          }}
        >
          Player
        </InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={state[label].participant}
          label="Player"
          input={
            <OutlinedInput
              notched
              label="Player"
              sx={{
                '&.MuiOutlinedInput-root': {
                  color: applyThemeColor(theme, '#fff', '#1b2433'),
                  '& fieldset': {
                    borderColor: applyThemeColor(theme, '#fff', '#1b2433'),
                  },
                  '&:hover fieldset': {
                    borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
                  },
                },
              }}
            />
          }
          onChange={(ev) => onPlayerChange(ev, label)}
        >
          {playersList.map((item, index) => (
            <MenuItem key={index + 1} value={item.player.name}>
              {item.player.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="goal-input">
        <TextField
          type="number"
          id={`${label}-goals`}
          label="Goals"
          variant="outlined"
          autoComplete="off"
          InputLabelProps={{ shrink: true }}
          value={state[label].goals}
          onChange={(ev) => onGoalChange(ev, label)}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: applyThemeColor(theme, '#fff', '#1b2433'),
              '& fieldset': {
                borderColor: applyThemeColor(theme, '#fff', '#1b2433'),
              },
              '&:hover fieldset': {
                borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
              },
              '&.Mui-focused fieldset': {
                borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
              },
            },
            '& label': {
              color: applyThemeColor(theme, '#fff', '#1b2433'),
              '&.Mui-focused': {
                color: applyThemeColor(theme, '#c2f158', '#b834c6'),
              },
            },
          }}
        />
        <FormHelperText />
      </FormControl>
      <div className="flex-centered">
        <Chip
          label={`${label.charAt(0).toUpperCase()}${label.slice(1)}`}
          color={label === 'home' ? 'primary' : 'error'}
        />
      </div>
    </div>
  );
}

export default PlayerScoreInput;
