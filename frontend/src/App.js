import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';
import PlayerStats from './routes/PlayerStats';
import Games from './routes/Games';
import Tournaments from './routes/Tournaments';
import TournamentCreate from './routes/TournamentCreate';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/tournaments/new" element={<TournamentCreate />} />
          <Route exact path="/tournaments/:id" element={<Tournaments />} />
          <Route exact path="/tournaments/" element={<Tournaments />} />
          <Route exact path="/games" element={<Games />} />
          <Route exact path="/playerstats/:id" element={<PlayerStats />} />
          <Route element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
