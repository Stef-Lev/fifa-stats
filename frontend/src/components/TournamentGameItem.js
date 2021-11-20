import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Chip from '@mui/material/Chip';
import { deleteMethod } from '../helpers/httpService';

function TournamentGameItem({ game, tournament }) {
  const { home, away } = game.opponents;

  const removeGame = () => {
    deleteMethod(
      `http://localhost:8888/tournaments/${tournament._id}/game/${game._id}`,
      '',
    ).then(() =>
      // window.location.reload(),
      console.log('DONE'),
    );
    // console.log('GAME', game._id, 'TOURNAMENT', tournament._id);
  };

  return (
    <div className="game-item flex-between with-shadow">
      <div className="flex-between" style={{ width: '80%' }}>
        <div className="flex-between">
          <Chip label={home.goals} color="primary" size="small" />
          <div className="score">{home.team}</div>
        </div>
        <div className="flex-between">
          <div className="score">{away.team}</div>
          <Chip label={away.goals} color="error" size="small" />
        </div>
      </div>
      <div className="flex-centered">
        <HighlightOffIcon onClick={removeGame} />
      </div>
    </div>
  );
}

export default TournamentGameItem;
