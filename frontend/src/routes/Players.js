import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { getAllMethod, ip } from '../helpers/httpService';
// import PlayerDataItem from '../components/PlayerDataItem';
import PlayerStats from './PlayerStats';
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
      {value === index && <Box sx={{ paddingTop: '32px' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Players() {
  const [value, setValue] = React.useState(0);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllMethod(`http://${ip}:8888/players/`).then((data) => {
      setPlayers(data);
      setLoading(false);
    });
  }, []);

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
        </div>
      )}
    </div>
  );
}

export default Players;
