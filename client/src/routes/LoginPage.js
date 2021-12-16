import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(user);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => localStorage.setItem('token', data.token));
  };

  useEffect(() => {
    fetch('/isUserAuth', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? navigate('/') : null));
  }, [navigate]);

  const handleUsernameChange = (event) => {
    setUser({ ...user, username: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
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
          value={user.username}
          onChange={handleUsernameChange}
          fullWidth
          sx={{
            marginBottom: '26px',
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
        <TextField
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          autoComplete="off"
          value={user.password}
          onChange={handlePasswordChange}
          fullWidth
          sx={{
            marginBottom: '26px',
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
        <Button fullWidth className="finalize-btn" onClick={handleLogin}>
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
