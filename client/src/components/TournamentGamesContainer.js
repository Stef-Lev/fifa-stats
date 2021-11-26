import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import TournamentGameItem from './TournamentGameItem';
import Chip from '@mui/material/Chip';
import { updateMethod, ip } from '../helpers/httpService';

function TournamentGamesContainer({ tournament }) {
  const [game, setGame] = useState({
    home: { participant: '', id: '', team: '', goals: '' },
    away: { participant: '', id: '', team: '', goals: '' },
  });

  const getParticipantData = (list, attr, name) => {
    if (list.length) {
      const selected = list.find((item) => item.player.name === name);
      return selected.player[attr];
    }
    return new Error('Provide a list');
  };

  const allGamesPlayed = () => {
    return (
      tournament.games.length ===
      tournament.participants.length * (tournament.participants.length - 1)
    );
  };

  const handleGoalsChange = (ev, side) => {
    setGame({
      ...game,
      [side]: { ...game[side], goals: ev.target.value },
    });
  };

  const handlePlayerChange = (ev, side) => {
    setGame({
      ...game,
      [side]: {
        ...game[side],
        participant: getParticipantData(
          tournament.participants,
          'name',
          ev.target.value,
        ),
        team: getParticipantData(
          tournament.participants,
          'team',
          ev.target.value,
        ),
        id: getParticipantData(tournament.participants, 'id', ev.target.value),
      },
    });
  };

  const handleGameSubmit = () => {
    updateMethod(`http://${ip}:8888/tournaments/`, tournament._id, game).then(
      () => window.location.reload(),
    );
  };

  return (
    <div>
      {!allGamesPlayed() && (
        <div className="container game-submit with-shadow">
          <div className="side-by-side">
            <FormControl style={{ width: '55%' }}>
              <InputLabel
                id="select-label"
                shrink
                sx={{
                  color: '#fff',
                  '&.Mui-focused': {
                    color: '#c2f158',
                  },
                }}
              >
                Player
              </InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={game.home.participant}
                label="Player"
                input={
                  <OutlinedInput
                    notched
                    label="Player"
                    sx={{
                      '&.MuiOutlinedInput-root': {
                        color: '#fff',
                        '& fieldset': { borderColor: '#fff' },
                        '&.Mui-focused fieldset': { borderColor: '#c2f158' },
                      },
                    }}
                  />
                }
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
                autoComplete="off"
                InputLabelProps={{ shrink: true }}
                value={game.home.goals}
                onChange={(ev) => handleGoalsChange(ev, 'home')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: '#fff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#c2f158',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#c2f158',
                    },
                  },
                  '& label': {
                    color: 'white',
                    '&.Mui-focused': {
                      color: '#c2f158',
                    },
                  },
                }}
              />
              <FormHelperText />
            </FormControl>
            <div className="flex-centered">
              <Chip label="Home" color="primary" />
            </div>
          </div>
          <div className="side-by-side">
            <FormControl style={{ width: '55%' }}>
              <InputLabel
                id="select-label"
                shrink
                sx={{
                  color: '#fff',
                  '&.Mui-focused': {
                    color: '#c2f158',
                  },
                }}
              >
                Player
              </InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={game.away.participant}
                label="Player"
                input={
                  <OutlinedInput
                    notched
                    label="Player"
                    sx={{
                      '&.MuiOutlinedInput-root': {
                        color: '#fff',
                        '& fieldset': { borderColor: '#fff' },
                        '&.Mui-focused fieldset': { borderColor: '#c2f158' },
                      },
                    }}
                  />
                }
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
                autoComplete="off"
                InputLabelProps={{ shrink: true }}
                value={game.away.goals}
                onChange={(ev) => handleGoalsChange(ev, 'away')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: '#fff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#c2f158',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#c2f158',
                    },
                  },
                  '& label': {
                    color: 'white',
                    '&.Mui-focused': {
                      color: '#c2f158',
                    },
                  },
                }}
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
              onClick={handleGameSubmit}
              disabled={allGamesPlayed()}
            >
              Submit game
            </Button>
          </div>
        </div>
      )}
      <div style={{ marginBottom: '1.5rem' }}>
        {!!tournament.games.length &&
          tournament.games.map((game, index) => (
            <TournamentGameItem
              key={index + 1}
              game={game}
              tournament={tournament}
            />
          ))}
      </div>
    </div>
  );
}

export default TournamentGamesContainer;