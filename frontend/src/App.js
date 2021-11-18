import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';
import PlayerStats from './routes/PlayerStats';
import Games from './routes/Games';
import TournamentPlay from './routes/TournamentPlay';
import TournamentCreate from './routes/TournamentCreate';

// test tournament url http://localhost:3000/tournaments/6193ad32a411ffa208bebf8b

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/tournaments/new"
              element={<TournamentCreate />}
            />
            <Route exact path="/tournaments/:id" element={<TournamentPlay />} />
            <Route exact path="/tournaments/" />
            <Route exact path="/games" element={<Games />} />
            <Route exact path="/playerstats/:id" element={<PlayerStats />} />
            <Route element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
