import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Chip from '@mui/material/Chip';

function TournamentGameItem({ game }) {
  const { home, away } = game.opponents;
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
        <HighlightOffIcon />
      </div>
    </div>
  );
}

export default TournamentGameItem;
