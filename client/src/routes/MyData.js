import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import { PlayerContext } from '../context/PlayerContext';
import { ThemeContext } from '../context/ThemeContext';
import Loader from '../components/Loader';
import TabPanel from '../components/TabPanel';
import GenericError from '../components/GenericError';
import MyOverall from '../components/MyOverall';
import MyRecords from '../components/MyRecords';
import { getOneMethod } from '../helpers/httpService';
import { applyThemeColor } from '../helpers/applyThemeColor';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MyData() {
  const { player } = useContext(PlayerContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (player) {
      getOneMethod(`/api/players/stats/`, player._id).then((res) => {
        setData(res);
        setLoading(false);
      });
    }
  }, [player._id, player]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="my-data-page">
      {loading && <Loader />}
      {!loading && data.errorMsg && <GenericError message={data.errorMsg} />}
      {!loading && !data.errorMsg && (
        <Container maxWidth="sm" className="main-container">
          <>
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
                    label="Overall"
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
                    label="Records"
                    {...a11yProps(1)}
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
              <TabPanel value={value} index={0} padding="16px 0 16px">
                <MyOverall data={data} />
              </TabPanel>
              <TabPanel value={value} index={1} padding="0 0 16px">
                <MyRecords data={data} />
              </TabPanel>
            </Box>
          </>
        </Container>
      )}
    </div>
  );
}

export default MyData;
