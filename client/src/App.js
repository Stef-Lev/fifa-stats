import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import Tournaments from './routes/Tournaments';
import PlayerStatistics from './routes/PlayerStatistics';
import ProfilePage from './routes/ProfilePage';
import TournamentPlay from './routes/TournamentPlay';
import TournamentCreate from './routes/TournamentCreate';
import Header from './components/Header';
import useFindPlayer from './hooks/useFindPlayer';
import { PlayerContext } from './context/PlayerContext';

function App() {
  const { player, setPlayer, isLoading } = useFindPlayer();

  console.log(player, isLoading);

  return (
    <div className="App">
      <div>
        <Router>
          <PlayerContext.Provider value={{ player, setPlayer, isLoading }}>
            <Header />
            <div style={{ color: 'red' }}>{isLoading}</div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/tournaments/new"
                element={<TournamentCreate />}
              />
              <Route
                exact
                path="/tournaments/:id"
                element={<TournamentPlay />}
              />
              <Route exact path="/tournaments" element={<Tournaments />} />
              <Route exact path="/players" element={<PlayerStatistics />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route
                exact
                path="/profile/:playerId"
                element={<ProfilePage />}
              />
              <Route element={<ErrorPage />} />
            </Routes>
          </PlayerContext.Provider>
        </Router>
      </div>
    </div>
  );
}

export default App;

// @TODO
// Create a user context
// Refactor unnecessary code
// Change personal statistics
// Style desktop navbar
// Players overall comparison page
// Tournaments list page with chip that indicates if it is completed or not an leads to the read-only tournament page.
