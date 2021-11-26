import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
  return (
    <div className="flex-centered loader-container">
      <CircularProgress className="loader" />
    </div>
  );
}

export default Loader;
