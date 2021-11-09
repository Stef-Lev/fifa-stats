import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/tournaments/new')}>
        NEW TOURNAMENT
      </button>
    </div>
  );
}

export default Home;
