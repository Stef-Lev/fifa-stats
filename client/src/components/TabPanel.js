import React from 'react';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, padding, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: padding }}>{children}</Box>}
    </div>
  );
}

export default TabPanel;
