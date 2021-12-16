import React from 'react';
import HomeGridItem from '../components/HomeGridItem';
// import {postMethod,ip} from '../helpers/httpService'

const links = [
  { label: 'Tournaments', link: '/tournaments' },
  { label: 'Player statistics', link: '/players' },
  { label: 'New tournament', link: '/tournaments/new' },
  { label: 'Add player', link: '/player/add' },
];

// Button to clear players data
// function clearPlayers () {
//   postMethod(`/players/clear`, {}).then((res) =>
//       console.log(res)
//     );
// }

function Home() {
  return (
    <div>
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
      {/* <button onClick={() => clearPlayers()}>CLICK TO CLEAR!</button> */}
    </div>
  );
}

export default Home;
