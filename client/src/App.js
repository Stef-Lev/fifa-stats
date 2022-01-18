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
import MyData from './routes/MyData';
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
              <Route
                exact
                path="/mydata"
                element={
                  <PrivateRoute>
                    <MyData />
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
// Move home to /home and create landing page to /
// Error handling to register, login, logout
// Add personal statistics
// Style desktop navbar
// Create Settingd Page
// Handle logout
// If player logged in redirect to home if goes to /login page
// Add graphs to personal data
