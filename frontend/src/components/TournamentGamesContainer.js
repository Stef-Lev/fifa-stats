import React, { useState, useEffect } from 'react';
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

const mockGames = [
  {
    home: {
      participant: 'TestStef',
      team: 'Dortmund',
      goals: '2',
    },
    away: {
      participant: 'TestAndre',
      team: 'Olympiacos',
      goals: '2',
    },
  },
  {
    home: {
      participant: 'TestTax',
      team: 'Real',
      goals: '4',
    },
    away: {
      participant: 'TestAndre',
      team: 'Olympiacos',
      goals: '3',
    },
  },
];

function TournamentGamesContainer({ tournament }) {
  const [game, setGame] = useState({
    home: { participant: '', id:'', team: '', goals: '' },
    away: { participant: '', id:'', team: '', goals: '' },
  });

  const getParticipantData = (list, attr, name) => {
    if (list.length) {
      const selected = list.find((item) => item.player.name === name);
      return selected.player[attr];
    }
    return new Error('Provide a list');
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
        id: getParticipantData(
          tournament.participants,
          'id',
          ev.target.value,
        ),
      },
    });
  };

  console.log(tournament);
  return (
    <div>
      <div className="container with-shadow">
        {/* Include form buttons for games data */}
        {/* Include each game component */}
        <div className="side-by-side">
          <FormControl style={{ width: '55%' }}>
            <InputLabel id="select-label" shrink>
              Player
            </InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={game.home.participant}
              label="Player"
              input={<OutlinedInput notched label="Player" />}
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
              InputLabelProps={{ shrink: true }}
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
            <InputLabel id="select-label" shrink>
              Player
            </InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={game.away.participant}
              label="Player"
              input={<OutlinedInput notched label="Player" />}
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
              InputLabelProps={{ shrink: true }}
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
            onClick={() => console.log(game)}
          >
            Submit game
          </Button>
        </div>
      </div>
      {mockGames &&
        mockGames.map((game, index) => (
          <TournamentGameItem key={index + 1} game={game} />
        ))}
    </div>
  );
}

export default TournamentGamesContainer;