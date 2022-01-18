import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { getAllMethod } from '../helpers/httpService';
// import PlayerDataItem from '../components/PlayerDataItem';
import PlayerStats from '../components/PlayersTables';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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

  const calculateTopTournament = (players) => {
    if (players.length) {
      let sortedTournaments = players.sort(
        (a, b) => b.tournaments_played.won - a.tournaments_played.won,
      );
      return sortedTournaments[0].fullname;
    }
  };
  const calculateTopOffense = (players) => {
    if (players.length) {
      let sortedOffense = players.sort((a, b) => b.goals.for - a.goals.for);
      return sortedOffense[0].fullname;
    }
  };
  const calculateTopDefense = (players) => {
    if (players.length) {
      let sortedDefense = players.sort(
        (a, b) => a.goals.against - b.goals.against,
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
        <div>
          <Typography className="main-title" style={{ color: '#fff' }}>
            Player Statistics
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: '#c2f158',
              }}
            >
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="basic tabs example"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#c2f158',
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
                    color: '#fff',
                    '&.MuiButtonBase-root.Mui-selected': {
                      color: '#c2f158',
                      '&.MuiTouchRipple-root': { color: 'white' },
                    },
                  }}
                />
                <Tab
                  label="Goals"
                  {...a11yProps(1)}
                  sx={{
                    color: '#fff',
                    '&.MuiButtonBase-root.Mui-selected': {
                      color: '#c2f158',
                    },
                  }}
                />
                <Tab
                  label="Tournaments"
                  {...a11yProps(2)}
                  sx={{
                    color: '#fff',
                    '&.MuiButtonBase-root.Mui-selected': {
                      color: '#c2f158',
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
      )}
    </div>
  );
}

export default PlayerStatistics;
