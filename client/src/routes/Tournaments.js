import React, { useState, useEffect, useContext } from 'react';
import Container from '@mui/material/Container';
import TournamentItem from '../components/TournamentItem';
import GenericError from '../components/GenericError';
import Loader from '../components/Loader';
import { getAllMethod } from '../helpers/httpService';
import { ApiErrorContext } from '../context/ApiErrorContext';

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showFlashError } = useContext(ApiErrorContext);

  useEffect(() => {
    getAllMethod(`/api/tournaments/`)
      .then((data) => {
        setTournaments(data);
        setLoading(false);
      })
      .catch(() =>
        showFlashError('Something went wrong. Please try again later.'),
      );
  }, [showFlashError]);

  return (
    <div className="tournaments-list-page">
      {loading && <Loader />}
      <Container maxWidth="sm" className="main-container">
        {!loading && (
          <>
            <h3 className="route-title">TOURNAMENTS</h3>
            {tournaments.map((item, index) => (
              <TournamentItem key={index + 1} tournament={item} />
            ))}
          </>
        )}
        {!loading && !tournaments.length && (
          <GenericError message="No tournaments played" />
        )}
      </Container>
    </div>
  );
}

export default Tournaments;
