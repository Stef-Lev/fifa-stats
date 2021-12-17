import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';

export default function useAuth() {
  const navigate = useNavigate();
  const { setPlayer } = useContext(PlayerContext);
  const [error, setError] = useState(null);

  const setPlayerContext = async () => {
    return await fetch('/api/auth/player')
      .then((res) => {
        setPlayer(res.data.currentPlayer);
        navigate('/home');
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const registerPlayer = async (data) => {
    console.log(data);
    const { username, fullname, password, passwordCheck } = data;

    return fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username,
        fullname,
        password,
        passwordCheck,
      },
    })
      .then(async () => {
        await setPlayerContext();
      })
      .catch((err) => {
        return setError(err.response.data);
      });
  };

  //login user
  const loginPlayer = async (data) => {
    const { username, password } = data;
    return fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username,
        password,
      },
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
