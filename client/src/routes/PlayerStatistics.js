import React, { useState, useEffect, useContext } from 'react';
import Loader from '../components/Loader';
import { ThemeContext } from '../context/ThemeContext';
import Container from '@mui/material/Container';
import { getAllMethod } from '../helpers/httpService';
import PlayerStats from '../components/PlayersTables';
import TabPanel from '../components/TabPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  calculateTopTournament,
  calculateTopOffense,
  calculateTopDefense,
} from '../helpers/calculations';
import { ApiErrorContext } from '../context/ApiErrorContext';
import { applyThemeColor } from '../helpers/applyThemeColor';

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
  const { showFlashError } = useContext(ApiErrorContext);
  const padding = '32px 0 16px';

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllMethod(`/api/players/`)
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(() =>
        showFlashError('Something went wrong. Please try again later.'),
      );
  }, [showFlashError]);

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
        <Container maxWidth="sm" className="main-container">
          <div>
            <h3 className="route-title">Player Statistics</h3>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: applyThemeColor(theme, '#c2f158', '#1b2433'),
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  aria-label="tournament tabs"
                  sx={{
                    '& .MuiTabs-indicator': {
                      backgroundColor: applyThemeColor(
                        theme,
                        '#c2f158',
                        '#1b2433',
                      ),
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
                      color: applyThemeColor(theme, '#fff', '#1b2433'),
                      '&.MuiButtonBase-root.Mui-selected': {
                        color: applyThemeColor(theme, '#c2f158', '#1b2433'),
                        fontWeight: theme === 'dark' ? '400' : '700',
                        '&.MuiTouchRipple-root': {
                          color: applyThemeColor(theme, '#fff', '#1b2433'),
                        },
                      },
                    }}
                  />
                  <Tab
                    label="Goals"
                    {...a11yProps(1)}
                    sx={{
                      color: applyThemeColor(theme, '#fff', '#1b2433'),
                      '&.MuiButtonBase-root.Mui-selected': {
                        color: applyThemeColor(theme, '#c2f158', '#1b2433'),
                        fontWeight: theme === 'dark' ? '400' : '700',
                      },
                    }}
                  />
                  <Tab
                    label="Tournaments"
                    {...a11yProps(2)}
                    sx={{
                      color: applyThemeColor(theme, '#fff', '#1b2433'),
                      '&.MuiButtonBase-root.Mui-selected': {
                        color: applyThemeColor(theme, '#c2f158', '#1b2433'),
                        fontWeight: theme === 'dark' ? '400' : '700',
                      },
                    }}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0} padding={padding}>
                <PlayerStats players={players} tab="games" />
              </TabPanel>
              <TabPanel value={value} index={1} padding={padding}>
                <PlayerStats players={players} tab="goals" />
              </TabPanel>
              <TabPanel value={value} index={2} padding={padding}>
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
