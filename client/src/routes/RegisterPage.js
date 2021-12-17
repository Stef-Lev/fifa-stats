import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import useAuth from '../hooks/useAuth';
import useForm from '../hooks/useForm';

function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser, error } = useAuth();
  const { values, handleChange } = useForm({
    initialValues: {
      fullname: '',
      username: '',
      password: '',
      passwordCheck: '',
    },
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(values);
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
          value={values.fullname}
          onChange={handleChange}
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
          value={values.username}
          onChange={handleChange}
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
          type="password"
          label="Password"
          variant="outlined"
          autoComplete="off"
          value={values.password}
          onChange={handleChange}
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
          type="password"
          label="Confirm password"
          variant="outlined"
          autoComplete="off"
          value={values.passwordCheck}
          onChange={handleChange}
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
