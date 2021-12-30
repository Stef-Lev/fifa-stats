import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import Loader from '../components/Loader';

export default function PrivateRoute({ children }) {
  const { player, isLoading } = useContext(PlayerContext);

  if (isLoading) {
    return <Loader />;
  }
  return player ? children : <Navigate to="/login" />;
}
