import React, { useContext } from 'react';
import HomeGridItem from '../components/HomeGridItem';
import { PlayerContext } from '../context/PlayerContext';
import Loader from '../components/Loader';

const links = [
  { label: 'Tournaments', link: '/tournaments' },
  { label: 'Player statistics', link: '/players' },
  { label: 'New tournament', link: '/tournaments/new' },
  { label: 'Add player', link: '/player/add' },
];

function Home() {
  const { player, isLoading } = useContext(PlayerContext);

  return (
    <div>
      {isLoading ? <Loader /> : (<>
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
      </>)}
    </div>
  );
}

export default Home;
