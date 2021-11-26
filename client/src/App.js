import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';
import Tournaments from './routes/Tournaments';
import PlayerStatistics from './routes/PlayerStatistics';
import TournamentPlay from './routes/TournamentPlay';
import TournamentCreate from './routes/TournamentCreate';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/tournaments/new"
              element={<TournamentCreate />}
            />
            <Route exact path="/tournaments/:id" element={<TournamentPlay />} />
            <Route exact path="/tournaments" element={<Tournaments />} />
            <Route exact path="/players" element={<PlayerStatistics />} />
            <Route element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

// @TODO
// Style desktop navbar
// Players overall comparison page
// Tournaments list page with chip that indicates if it is completed or not an leads to the read-only tournament page.