import React, { useState, useEffect, useContext } from 'react';
import Loader from '../components/Loader';
import { ThemeContext } from '../context/ThemeContext';
import Container from '@mui/material/Container';
import { getAllMethod } from '../helpers/httpService';
import PlayerStats from '../components/PlayersTables';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { calcAverage } from '../helpers/calcAverage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: '32px 0 16px' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function PlayerStatistics() {
  const [value, setValue] = React.useState(0);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [facts, setFacts] = useState({
    tournamentMaster: '',
    topOffense: '',
    topDefense: '',
  });
  const { theme } = useContext(ThemeContext);

  const calculateTopTournament = (players) => {
    if (players.length) {
      let sortedTournaments = players.sort(
        (a, b) =>
          calcAverage(b.tournaments_played.won, b.tournaments_played.total) -
          calcAverage(a.tournaments_played.won, a.tournaments_played.total),
      );
      return sortedTournaments[0].fullname;
    }
  };
  const calculateTopOffense = (players) => {
    if (players.length) {
      let sortedOffense = players.sort(
        (a, b) =>
          calcAverage(b.goals.for, b.games_played.statistics.total) -
          calcAverage(a.goals.for, a.games_played.statistics.total),
      );
      return sortedOffense[0].fullname;
    }
  };
  const calculateTopDefense = (players) => {
    if (players.length) {
      let sortedDefense = players.sort(
        (a, b) =>
          calcAverage(a.goals.against, a.games_played.statistics.total) -
          calcAverage(b.goals.against, b.games_played.statistics.total),
      );
      return sortedDefense[0].fullname;
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllMethod(`/api/players/`).then((data) => {
      setPlayers(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setFacts({
      tournamentMaster: calculateTopTournament(players),
      topOffense: calculateTopOffense(players),
      topDefense: calculateTopDefense(players),
    });
  }, [players]);

  return (
    <div className="players-stats-page">
      {loading && <Loader />}
      {!loading && (
        <Container maxWidth="sm" className='main-container'>
        <div>
          <Typography
            className="main-title"
            style={{ color: theme === 'dark' ? '#fff' : '#1b2433' }}
          >
            Player Statistics
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: theme === 'dark' ? '#c2f158' : '#1b2433',
              }}
            >
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="tournament tabs"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme === 'dark' ? '#c2f158' : '#1b2433',
                    height: '4px',
                  },
                  '& .MuiTabs-flexContainer': {
                    justifyContent: 'space-between',
                  },
                }}
              >
                <Tab
                  label="Games"
                  {...a11yProps(0)}
                  sx={{
                    color: theme === 'dark' ? '#fff' : '#1b2433',
                    '&.MuiButtonBase-root.Mui-selected': {
                      color: theme === 'dark' ? '#c2f158' : '#1b2433',
                      fontWeight: theme === 'dark' ? '400' : '700',
                      '&.MuiTouchRipple-root': {
                        color: theme === 'dark' ? '#fff' : '#1b2433',
                      },
                    },
                  }}
                />
                <Tab
                  label="Goals"
                  {...a11yProps(1)}
                  sx={{
                    color: theme === 'dark' ? '#fff' : '#1b2433',
                    '&.MuiButtonBase-root.Mui-selected': {
                      color: theme === 'dark' ? '#c2f158' : '#1b2433',
                      fontWeight: theme === 'dark' ? '400' : '700',
                    },
                  }}
                />
                <Tab
                  label="Tournaments"
                  {...a11yProps(2)}
                  sx={{
                    color: theme === 'dark' ? '#fff' : '#1b2433',
                    '&.MuiButtonBase-root.Mui-selected': {
                      color: theme === 'dark' ? '#c2f158' : '#1b2433',
                      fontWeight: theme === 'dark' ? '400' : '700',
                    },
                  }}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <PlayerStats players={players} tab="games" />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PlayerStats players={players} tab="goals" />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PlayerStats players={players} tab="tournaments" />
            </TabPanel>
          </Box>
          <div className="stat-facts">
            <p>
              Tournament Master:{' '}
              <span className="stat">{facts.tournamentMaster}</span>
            </p>
            <p>
              Top Offense: <span className="stat">{facts.topOffense}</span>
            </p>
            <p>
              Top Defense: <span className="stat">{facts.topDefense}</span>
            </p>
          </div>
        </div>
        </Container>
      )}
    </div>
  );
}

export default PlayerStatistics;
