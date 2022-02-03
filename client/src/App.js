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
import ThemeContextProvider from './context/ThemeContextProvider';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const { player, setPlayer, isLoading } = useFindPlayer();
  console.log(player);

  return (
    <div className="App">
      <div>
        <Router>
          <ThemeContextProvider>
            <PlayerContext.Provider value={{ player, setPlayer, isLoading }}>
              {player && <Header />}
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="/tournaments/:id"
                  element={
                    <PrivateRoute>
                      <TournamentPlay />
                    </PrivateRoute>
                  }
                />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
                <Route
                  exact
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
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
                />
                <Route
                  exact
                  path="/players"
                  element={
                    <PrivateRoute>
                      <PlayerStatistics />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="/tournaments/new"
                  element={
                    <PrivateRoute>
                      <TournamentCreate />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="/mydata"
                  element={
                    <PrivateRoute>
                      <MyData />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </PlayerContext.Provider>
          </ThemeContextProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;

// @TODO
// Move home to /home and create landing page to /
// Error handling to register, login, logout
// Style desktop
