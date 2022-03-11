import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { PlayerContext } from '../context/PlayerContext';

export default function RedirectLoggedIn({ children }) {
  const { player, isLoading } = useContext(PlayerContext);

  if (isLoading) {
    return <Loader />;
  }
  return player ? <Navigate to="/" /> : children;
}
