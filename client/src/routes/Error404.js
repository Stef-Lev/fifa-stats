import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ThemeContext } from '../context/ThemeContext';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { applyThemeColor } from '../helpers/applyThemeColor';

function Error404() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <div
      className="error-404"
      style={{ color: applyThemeColor(theme, '#fff', '#1b2433') }}
    >
      <h2>404</h2>
      <SentimentVeryDissatisfiedIcon
        style={{ width: '200px', height: '200px' }}
      />
      <p>Page not found</p>
      <Button
        className="brand-btn"
        style={{ marginTop: '20px' }}
        onClick={() => navigate('/')}
      >
        Return to home
      </Button>
    </div>
  );
}

export default Error404;
