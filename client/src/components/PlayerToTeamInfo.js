import React from 'react';
import Chip from '@mui/material/Chip';

function PlayerToTeamInfo({ tournament, colors }) {
  const getPlayerColor = (id) => {
    if (id) {
      return colors.find((item) => item.id === id).color;
    }
  };
  return (
    <div>
      {tournament &&
        tournament.participants.map((item) => (
          <div key={item.player.id}>
            <Chip
              label={`${item.player.name}: ${item.player.team}`}
              style={{
                backgroundColor: getPlayerColor(item.player.id),
                color: '#fff',
              }}
              size="small"
            />
          </div>
        ))}
    </div>
  );
}

export default PlayerToTeamInfo;
