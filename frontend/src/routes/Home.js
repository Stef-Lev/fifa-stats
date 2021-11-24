import React from 'react';
import HomeGridItem from '../components/HomeGridItem';

const links = [
  { label: 'Tournaments', link: '/tournaments' },
  { label: 'Player statistics', link: '/players' },
  { label: 'New tournament', link: '/tournaments/new' },
  { label: 'Add player', link: '/player/add' },
];

function Home() {
  return (
    <div>
      <div className="home-image-container">
        <img src="/fifa22.jpeg" className="fifa-image" alt="fifa" />
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
    </div>
  );
}

export default Home;
