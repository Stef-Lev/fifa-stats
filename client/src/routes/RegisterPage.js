import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import useAuth from '../hooks/useAuth';
import { ThemeContext } from '../context/ThemeContext';

function RegisterPage() {
  const { registerPlayer } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [player, setPlayer] = useState({
    fullname: '',
    username: '',
    password: '',
    passwordCheck: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerPlayer(player);
  };

  const handleInputChange = (event, field) => {
    setPlayer({ ...player, [field]: event.target.value });
  };

  return (
    <div className="login-page">
      <h3 style={{ marginBottom: '20px' }}>SIGN UP</h3>
      <div>
        <TextField
          id="outlined-basic"
          label="Full name"
          variant="outlined"
          autoComplete="off"
          value={player.fullname}
          onChange={(e) => handleInputChange(e, 'fullname')}
          fullWidth
          sx={{
            marginBottom: '16px',
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
          label="Username"
          variant="outlined"
          autoComplete="off"
          value={player.username}
          onChange={(e) => handleInputChange(e, 'username')}
          fullWidth
          sx={{
            marginBottom: '16px',
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
            marginBottom: '16px',
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
          label="Confirm password"
          variant="outlined"
          autoComplete="off"
          value={player.passwordCheck}
          onChange={(e) => handleInputChange(e, 'passwordCheck')}
          fullWidth
          sx={{
            marginBottom: '16px',
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': {
                borderColor: '#fff',
              },
              '&:hover fieldset': {
                borderColor: '#c2f158',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#c2f158',
              },
            },
            '& label': {
              color: 'white',
              '&.Mui-focused': {
                color: '#c2f158',
              },
            },
          }}
        />
        <Button fullWidth className="auth-btn" onClick={handleRegister}>
          REGISTER
        </Button>
      </div>
      <div className="bottom-msg">
        <p>
          I am already a member{' '}
          <span>
            <Link href="/login" underline="none">
              LOG IN
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
