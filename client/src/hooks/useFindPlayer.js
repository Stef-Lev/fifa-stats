import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFindPlayer() {
  const [player, setPlayer] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function findPlayer() {
      await axios
        .get('/api/auth/player')
        .then((res) => {
          setPlayer(res.data.currentPlayer);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
          setLoading(false);
        });
    }
    findPlayer();
  }, []);
  return {
    player,
    setPlayer,
    error,
    setError,
    isLoading,
  };
}
