import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import Loader from '../components/Loader';

export default function AdminRoute({ children }) {
  const { player, isLoading } = useContext(PlayerContext);

  if (isLoading) {
    return <Loader />;
  }
  return player && player.role === 'admin' ? children : <Navigate to="/" />;
}
