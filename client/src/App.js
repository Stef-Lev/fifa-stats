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
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const { player, setPlayer, isLoading } = useFindPlayer();

  console.log(player, isLoading);

  return (
    <div className="App">
      <div>
        <Router>
          <PlayerContext.Provider value={{ player, setPlayer, isLoading }}>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              {/* Protect route from others except admin */}
              <Route
                exact
                path="/tournaments/:id"
                element={<TournamentPlay />}
              />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route
                exact
                path="/profile/:playerId"
                element={<ProfilePage />}
              />
              <Route element={<ErrorPage />} />
              <Route
                exact
                path="/tournaments"
                element={
                  <PrivateRoute>
                    <Tournaments />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                exact
                path="/players"
                element={
                  <PrivateRoute>
                    <PlayerStatistics />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                exact
                path="/tournaments/new"
                element={
                  <PrivateRoute>
                    <TournamentCreate />
                  </PrivateRoute>
                }
              ></Route>
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
