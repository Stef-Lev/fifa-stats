import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlayerContext } from '../context/PlayerContext';

export default function useAuth() {
  const navigate = useNavigate();
  const { setPlayer } = useContext(PlayerContext);
  const [error, setError] = useState(null);

  const setPlayerContext = async () => {
    return await axios
      .get('/api/auth/player')
      .then((res) => {
        setPlayer(res.data.currentPlayer);
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        // setError(err.response.data);
      });
  };

  const registerPlayer = async (data) => {
    const { username, fullname, password, passwordCheck } = data;

    return axios
      .post('/api/auth/register', {
        username,
        fullname,
        password,
        passwordCheck,
      })
      .then(async () => {
        await setPlayerContext();
      })
      .catch((err) => {
        console.error(err);
        // return setError(err.response.data);
      });
  };

  //login player
  const loginPlayer = async (data) => {
    const { username, password } = data;
    return axios
      .post('/api/auth/login', {
        username,
        password,
      })
      .then(async () => {
        await setPlayerContext();
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return {
    registerPlayer,
    loginPlayer,
    error,
  };
}
