import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Participant({ player, removeAction }) {
  return (
    <div className="participant-item">
      <div className="flex-between">
        <div className="part-data">
          <PersonIcon />
          <Typography>{player.name}</Typography>
          <span>-</span>
          <Typography>{player.team}</Typography>
        </div>
        <HighlightOffIcon onClick={() => removeAction(player)} />
      </div>
    </div>
  );
}

export default Participant;
