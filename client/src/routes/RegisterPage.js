import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function RegisterPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: '',
    username: '',
    password: '',
    passwordCheck: '',
  });
  const [error, setError] = useState({ type: '', status: false, msg: '' });

  useEffect(() => {
    if (error.status) {
      setError({ type: '', status: false, msg: '' });
    }
  }, [user.password, user.passwordCheck]);

  useEffect(() => {
    fetch('/isUserAuth', {
      method: 'POST',
      headers: { 'x-access-token': localStorage.getItem('token') },
    });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    if (user.password !== user.passwordCheck) {
      setError({
        type: 'password',
        status: true,
        msg: 'Passwords must be the same',
      });
    } else {
      setError({ type: '', status: false, msg: '' });
      fetch('/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(user),
      });
    }
    console.log(user, error);
  };

  const handleFullnameChange = (event) => {
    setUser({ ...user, fullname: event.target.value });
  };

  const handleUsernameChange = (event) => {
    setUser({ ...user, username: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const handlepasswordCheckChange = (event) => {
    setUser({ ...user, passwordCheck: event.target.value });
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
          value={user.fullname}
          onChange={handleFullnameChange}
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
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          autoComplete="off"
          value={user.username}
          onChange={handleUsernameChange}
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
        <TextField
          id="outlined-basic"
          error={
            error.status && error.type === 'password' && user.password !== ''
          }
          helperText={
            error.type === 'password' && user.password !== '' ? error.msg : ''
          }
          type="password"
          label="Password"
          variant="outlined"
          autoComplete="off"
          value={user.password}
          onChange={handlePasswordChange}
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
        <TextField
          id="outlined-basic"
          error={
            error.status &&
            error.type === 'password' &&
            user.passwordCheck !== ''
          }
          helperText={
            error.type === 'password' && user.passwordCheck !== ''
              ? error.msg
              : ''
          }
          type="password"
          label="Confirm password"
          variant="outlined"
          autoComplete="off"
          value={user.passwordCheck}
          onChange={handlepasswordCheckChange}
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
        <Button fullWidth className="finalize-btn" onClick={handleRegister}>
          SIGN UP
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
