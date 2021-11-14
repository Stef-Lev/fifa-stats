import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Chip from '@mui/material/Chip';

function TournamentGameItem({ game }) {
  return (
    <div className="game-item flex-between with-shadow">
      <div className="flex-between" style={{ width: '80%' }}>
        <div className="flex-between">
          <Chip label={game.home.goals} color="primary" />
          <div>{game?.home.team}</div>
        </div>
        <div className="flex-between">
          <div>{game?.away.team}</div>
          <Chip label={game.away.goals} color="error" />
        </div>
      </div>
      <div className="flex-centered">
        <HighlightOffIcon />
      </div>
    </div>
  );
}

export default TournamentGameItem;
