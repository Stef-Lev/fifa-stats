import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  
  const handleLogin = (e) => {
    e.preventDefault();

  }

  return <div className="login-page">
    <h3>LOGIN</h3>
    <FormControl style={{ width: '40%' }}>
        <TextField
          id="outlined-basic"
          label="Team"
          variant="outlined"
          autoComplete="off"
          value={''}
          onChange={handleLogin}
          sx={{
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
        <FormHelperText />
      </FormControl>
  </div>;
}

export default LoginPage;
