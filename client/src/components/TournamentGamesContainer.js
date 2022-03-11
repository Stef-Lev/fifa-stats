import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { PlayerContext } from '../context/PlayerContext';
import TournamentGameItem from './TournamentGameItem';
import PlayerScoreInput from './PlayerScoreInput';
import { updateMethod } from '../helpers/httpService';

function TournamentGamesContainer({ tournament, colors }) {
  const [game, setGame] = useState({
    home: { participant: '', id: '', team: '', goals: '' },
    away: { participant: '', id: '', team: '', goals: '' },
  });

  const { player } = useContext(PlayerContext);

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
    updateMethod(`/api/tournaments/`, tournament._id, game).then(() =>
      window.location.reload(),
    );
  };

  const shouldShowButton = () => {
    if (player && tournament) {
      if (
        player.role === 'admin' &&
        tournament.status !== 'Completed' &&
        !allGamesPlayed()
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  return (
    <div>
      {shouldShowButton() && (
        <div className="container game-submit with-shadow">
          <PlayerScoreInput
            playersList={tournament.participants}
            label="home"
            game={game}
            onGoalChange={handleGoalsChange}
            onPlayerChange={handlePlayerChange}
          />
          <PlayerScoreInput
            playersList={tournament.participants}
            label="away"
            game={game}
            onGoalChange={handleGoalsChange}
            onPlayerChange={handlePlayerChange}
          />
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
      <div className="mb20">
        {!!tournament.games.length &&
          tournament.games.map((game, index) => (
            <TournamentGameItem
              key={index + 1}
              game={game}
              tournament={tournament}
              colors={colors}
            />
          ))}
      </div>
    </div>
  );
}

export default TournamentGamesContainer;
