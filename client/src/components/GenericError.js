import React from 'react';
import { Typography } from '@mui/material';

const GenericError = ({ message }) => {
  return (
    <div className="generic-error">
      <Typography>{message}</Typography>
    </div>
  );
};

export default GenericError;
