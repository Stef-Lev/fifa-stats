import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import useAuth from '../hooks/useAuth';
import { ThemeContext } from '../context/ThemeContext';
import { applyThemeColor } from '../helpers/applyThemeColor';

function RegisterPage() {
  const { registerPlayer, error, clearError } = useAuth();
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
    clearError();
    setUser({ ...user, [field]: event.target.value });
  };

  return (
    <div className="login-page">
      <h3 className="route-title">SIGN UP</h3>
      <div>
        <form>
          <TextField
            error={error ? true : false}
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
                color: applyThemeColor(theme, '#fff', '#1b2433'),
                '& fieldset': {
                  borderColor: applyThemeColor(theme, '#fff', '#1b2433'),
                },
                '&:hover fieldset': {
                  borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
                '&.Mui-focused fieldset': {
                  borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
              },
              '& label': {
                color: applyThemeColor(theme, '#fff', '#1b2433'),
                '&.Mui-focused': {
                  color: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
              },
            }}
          />
          <TextField
            error={error ? true : false}
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
                color: applyThemeColor(theme, '#fff', '#1b2433'),
                '& fieldset': {
                  borderColor: applyThemeColor(theme, '#fff', '#1b2433'),
                },
                '&:hover fieldset': {
                  borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
                '&.Mui-focused fieldset': {
                  borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
              },
              '& label': {
                color: applyThemeColor(theme, '#fff', '#1b2433'),
                '&.Mui-focused': {
                  color: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
              },
            }}
          />
          <TextField
            error={error ? true : false}
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
                color: applyThemeColor(theme, '#fff', '#1b2433'),
                '& fieldset': {
                  borderColor: applyThemeColor(theme, '#fff', '#1b2433'),
                },
                '&:hover fieldset': {
                  borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
                '&.Mui-focused fieldset': {
                  borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
              },
              '& label': {
                color: applyThemeColor(theme, '#fff', '#1b2433'),
                '&.Mui-focused': {
                  color: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
              },
            }}
          />
          <TextField
            error={error ? true : false}
            helperText={error && error.msg}
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
                color: applyThemeColor(theme, '#fff', '#1b2433'),
                '& fieldset': {
                  borderColor: applyThemeColor(theme, '#fff', '#1b2433'),
                },
                '&:hover fieldset': {
                  borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
                '&.Mui-focused fieldset': {
                  borderColor: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
              },
              '& label': {
                color: applyThemeColor(theme, '#fff', '#1b2433'),
                '&.Mui-focused': {
                  color: applyThemeColor(theme, '#c2f158', '#b834c6'),
                },
              },
            }}
          />
          <p className="form-msg">
            Are you already a member?{' '}
            <span>
              <Link href="/login" underline="none">
                LOG IN
              </Link>
            </span>
          </p>
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
    </div>
  );
}

export default RegisterPage;
