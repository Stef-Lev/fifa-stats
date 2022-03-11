import React, { useContext } from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Chip from '@mui/material/Chip';
import { PlayerContext } from '../context/PlayerContext';
import { deleteMethod } from '../helpers/httpService';

function TournamentGameItem({ game, tournament, colors }) {
  const { home, away } = game.opponents;
  const { player } = useContext(PlayerContext);

  const goalsChipStyle = {
    color: '#fff',
    width: '24px',
    height: '24px',
  };

  const removeGame = () => {
    deleteMethod(
      `/api/tournaments/${tournament._id}/game/${game._id}`,
      '',
    ).then(() => window.location.reload());
  };
  const getPlayerColor = (id) => {
    if (id) {
      return colors.find((item) => item.id === id).color;
    }
  };

  const itemWidth = tournament.status !== 'Completed' ? '80%' : '100%';

  const shouldShowButton = () => {
    if (player && tournament) {
      if (player.role === 'admin' && tournament.status !== 'Completed') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  return (
    <div className="game-item flex-between with-shadow">
      <div className="flex-between" style={{ width: itemWidth }}>
        <div className="flex-between">
          <Chip
            label={home.goals}
            style={{
              backgroundColor: getPlayerColor(home.player),
              ...goalsChipStyle,
            }}
            size="small"
          />
          <div className="score">{home.team}</div>
        </div>
        <div className="flex-between">
          <div className="score">{away.team}</div>
          <Chip
            label={away.goals}
            style={{
              backgroundColor: getPlayerColor(away.player),
              ...goalsChipStyle,
            }}
            size="small"
          />
        </div>
      </div>
      {shouldShowButton() && (
        <div className="flex-centered">
          <HighlightOffIcon onClick={removeGame} />
        </div>
      )}
      {!shouldShowButton() && (
        <div className="flex-centered">
          <DoneAllIcon />
        </div>
      )}
    </div>
  );
}

export default TournamentGameItem;
