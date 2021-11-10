import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
  return (
    <Stack className="flex-centered">
      <CircularProgress className="loader" />
    </Stack>
  );
}

export default Loader;
