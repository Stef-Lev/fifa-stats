import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Error404 from './routes/Error404';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import Tournaments from './routes/Tournaments';
import PlayerStatistics from './routes/PlayerStatistics';
import SettingsPage from './routes/SettingsPage';
import RoleSelection from './routes/RoleSelection';
import TournamentPlay from './routes/TournamentPlay';
import TournamentCreate from './routes/TournamentCreate';
import MyData from './routes/MyData';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import RedirectLoggedIn from './routes/RedirectLoggedIn';
import Header from './components/Header';
import { PlayerContext } from './context/PlayerContext';
import ThemeContextProvider from './context/ThemeContextProvider';
import ApiErrorContextProvider from './context/ApiErrorContextProvider';
import useFindPlayer from './hooks/useFindPlayer';

function App() {
  const { player, setPlayer, isLoading } = useFindPlayer();

  return (
    <div className="App">
      <Router>
        <ThemeContextProvider>
          <PlayerContext.Provider value={{ player, setPlayer, isLoading }}>
            <ApiErrorContextProvider>
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
                <Route
                  exact
                  path="/login"
                  element={
                    <RedirectLoggedIn>
                      <LoginPage />
                    </RedirectLoggedIn>
                  }
                />
                <Route
                  exact
                  path="/register"
                  element={
                    <RedirectLoggedIn>
                      <RegisterPage />
                    </RedirectLoggedIn>
                  }
                />
                <Route
                  exact
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <SettingsPage />
                    </PrivateRoute>
                  }
                />
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
                    <AdminRoute>
                      <TournamentCreate />
                    </AdminRoute>
                  }
                />
                <Route
                  exact
                  path="/roles"
                  element={
                    <AdminRoute>
                      <RoleSelection />
                    </AdminRoute>
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
                <Route exact path="*" element={<Error404 />} />
              </Routes>
            </ApiErrorContextProvider>
          </PlayerContext.Provider>
        </ThemeContextProvider>
      </Router>
    </div>
  );
}

export default App;
