import React, { useState, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { ThemeContext } from '../context/ThemeContext';

function LoginPage() {
  const { loginPlayer } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [player, setPlayer] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginPlayer(player);
  };

  const handleInputChange = (event, field) => {
    setPlayer({ ...player, [field]: event.target.value });
  };

  return (
    <div className="login-page">
      <h3 style={{ marginBottom: '20px' }}>LOGIN</h3>
      <div>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          autoComplete="off"
          value={player.username}
          onChange={(e) => handleInputChange(e, 'username')}
          fullWidth
          sx={{
            marginBottom: '26px',
            '& .MuiOutlinedInput-root': {
              color: theme === 'dark' ? '#fff' : '#1b2433',
              '& fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#1b2433',
              },
              '&:hover fieldset': {
                borderColor: theme === 'dark' ? '#c2f158' : '#b834c6',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme === 'dark' ? '#c2f158' : '#b834c6',
              },
            },
            '& label': {
              color: theme === 'dark' ? '#fff' : '#1b2433',
              '&.Mui-focused': {
                color: theme === 'dark' ? '#c2f158' : '#b834c6',
              },
            },
          }}
        />
        <TextField
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          autoComplete="off"
          value={player.password}
          onChange={(e) => handleInputChange(e, 'password')}
          fullWidth
          sx={{
            marginBottom: '26px',
            '& .MuiOutlinedInput-root': {
              color: theme === 'dark' ? '#fff' : '#1b2433',
              '& fieldset': {
                borderColor: theme === 'dark' ? '#fff' : '#1b2433',
              },
              '&:hover fieldset': {
                borderColor: theme === 'dark' ? '#c2f158' : '#b834c6',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme === 'dark' ? '#c2f158' : '#b834c6',
              },
            },
            '& label': {
              color: theme === 'dark' ? '#fff' : '#1b2433',
              '&.Mui-focused': {
                color: theme === 'dark' ? '#c2f158' : '#b834c6',
              },
            },
          }}
        />
        <Button fullWidth className="auth-btn" onClick={handleLogin}>
          LOGIN
        </Button>
      </div>
      <div className="bottom-msg">
        <p>
          Are you a newbie?{' '}
          <span>
            <Link href="/register" underline="none">
              SIGN UP
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
