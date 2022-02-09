import React, { useContext } from 'react';
import HomeGridItem from '../components/HomeGridItem';
import { PlayerContext } from '../context/PlayerContext';
import Loader from '../components/Loader';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const links = [
  { label: 'Tournaments', link: '/tournaments' },
  { label: 'Players data', link: '/players' },
  { label: 'My data', link: '/mydata' },
  { label: 'Settings', link: '/settings' },
];

function Home() {
  const { player, isLoading } = useContext(PlayerContext);
  const navigate = useNavigate();

  return (
    <div>
      <Container maxWidth="sm" className='main-container'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {player && (
            <div className="greeting">
              <p>Welcome {player.fullname}!</p>
            </div>
          )}
          <div className="home-image-container">
            <div className="fifa-image" alt="fifa"></div>
          </div>
          <div className="home-grid">
            {links.map((item, index) => (
              <HomeGridItem
                key={index + 1}
                title={item.label}
                index={index}
                page={item.link}
              />
            ))}
          </div>
          {player?.role === 'admin' && (
            <Button
              fullWidth
              className="brand-btn"
              onClick={() => navigate('/tournaments/new')}
            >
              New Tournament
            </Button>
          )}
        </>
      )}
      </Container>
    </div>
  );
}

export default Home;
