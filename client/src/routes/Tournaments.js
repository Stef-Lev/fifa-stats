import React, { useState, useEffect } from 'react';
import { getAllMethod } from '../helpers/httpService';
import TournamentItem from '../components/TournamentItem';
import Container from '@mui/material/Container';
import Loader from '../components/Loader';

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMethod(`/api/tournaments/`).then((data) => {
      setTournaments(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="tournaments-list-page">
      {loading && <Loader />}
      <Container maxWidth="sm" style={{padding:0}}>
      <h3 className='route-title'>TOURNAMENTS</h3>
      {!loading &&
        tournaments.map((item, index) => (
          <TournamentItem key={index + 1} tournament={item} />
        ))}
      {!loading && !tournaments.length && <div className="data-err-msg">No tournaments played</div>}
      </Container>
    </div>
  );
}

export default Tournaments;
