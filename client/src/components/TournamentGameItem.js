import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Chip from '@mui/material/Chip';
import { deleteMethod, ip } from '../helpers/httpService';

function TournamentGameItem({ game, tournament }) {
  const { home, away } = game.opponents;

  const removeGame = () => {
    deleteMethod(
      `http://${ip}:8888/tournaments/${tournament._id}/game/${game._id}`,
      '',
    ).then(() => window.location.reload());
  };

  const itemWidth = tournament.status !== 'Completed' ? '80%' : '100%';

  return (
    <div className="game-item flex-between with-shadow">
      <div className="flex-between" style={{ width: itemWidth }}>
        <div className="flex-between">
          <Chip label={home.goals} color="primary" size="small" />
          <div className="score">{home.team}</div>
        </div>
        <div className="flex-between">
          <div className="score">{away.team}</div>
          <Chip label={away.goals} color="error" size="small" />
        </div>
      </div>
      {tournament.status !== 'Completed' && (
        <div className="flex-centered">
          <HighlightOffIcon onClick={removeGame} />
        </div>
      )}
    </div>
  );
}

export default TournamentGameItem;
