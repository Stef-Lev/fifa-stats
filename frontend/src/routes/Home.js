import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex-centered">
      <Button
        className="brand-btn"
        variant="outlined"
        onClick={() => navigate('/tournaments/new')}
      >
        NEW TOURNAMENT
      </Button>
    </div>
  );
}

export default Home;
