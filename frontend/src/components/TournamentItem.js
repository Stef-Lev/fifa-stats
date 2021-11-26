import React from 'react';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';

function TournamentItem({ tournament }) {
  const navigate = useNavigate();
  const goToTournament = () => {
    navigate(`/tournaments/${tournament._id}`);
  };
  return (
    <div className="tournament-item" onClick={() => goToTournament()}>
      <p>{new Date(tournament.date).toLocaleDateString()}</p>
      <Rating
        name="simple-controlled"
        value={tournament.teams_rating}
        size="small"
        readOnly
        precision={0.5}
      />
      <Chip
        label={tournament.status}
        color={tournament.status === 'Completed' ? 'primary' : 'error'}
        size="small"
      />
      <BarChartIcon id="chart-icon" />
    </div>
  );
}

export default TournamentItem;
