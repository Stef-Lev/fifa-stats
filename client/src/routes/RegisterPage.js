import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import useAuth from '../hooks/useAuth';
import { ThemeContext } from '../context/ThemeContext';

function RegisterPage() {
  const { registerPlayer } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState({
    fullname: '',
    username: '',
    password: '',
    passwordCheck: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerPlayer(user);
  };

  const handleInputChange = (event, field) => {
    setUser({ ...user, [field]: event.target.value });
  };

  return (
    <div className="login-page">
      <h3 className='route-title'>SIGN UP</h3>
      <div>
        <form>
          <TextField
            id="signup-fullname"
            label="Full name"
            variant="outlined"
            autoComplete="off"
            value={user.fullname}
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
            id="signup-username"
            label="Username"
            variant="outlined"
            autoComplete="off"
            value={user.username}
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
            id="signup-password"
            type="password"
            label="Password"
            variant="outlined"
            autoComplete="off"
            value={user.password}
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
            id="signup-confirm"
            type="password"
            label="Confirm password"
            variant="outlined"
            autoComplete="off"
            value={user.passwordCheck}
            onChange={(e) => handleInputChange(e, 'passwordCheck')}
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
          <Button
            type="submit"
            fullWidth
            className="auth-btn"
            onClick={handleRegister}
          >
            REGISTER
          </Button>
        </form>
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
