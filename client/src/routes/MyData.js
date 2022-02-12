import React, { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import Loader from '../components/Loader';
import DonutChartGame from '../components/DonutChartGame';
import DonutChartTournament from '../components/DonutChartTournament';
import Container from '@mui/material/Container';
import GenericError from '../components/GenericError';
import { getOneMethod } from '../helpers/httpService';
import TestDonut from '../components/TestDonut';

function MyData() {
  const { player } = useContext(PlayerContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (player) {
      getOneMethod(`/api/players/stats/`, player._id).then((res) => {
        setData(res);
        setLoading(false);
      });
    }
  }, [player._id, player]);

  return (
    <div className="my-data-page">
      {loading && <Loader />}
      {!loading && data.errorMsg && <GenericError message={data.errorMsg} />}
      {!loading && !data.errorMsg && (
        <Container maxWidth="sm" className="main-container">
          <>
            <h4>Overall statistics</h4>
            <div className="my-data-container">
              <DonutChartGame
                values={[
                  { status: 'won', value: data.games_won },
                  { status: 'drawn', value: data.games_drawn },
                  { status: 'lost', value: data.games_lost },
                ]}
              />
              <DonutChartTournament
                values={[
                  { status: 'won', value: data.tournaments_won },
                  { status: 'lost', value: data.tournaments_played },
                ]}
              />
              <TestDonut
                values={[
                  { status: 'won', value: data.games_won },
                  { status: 'drawn', value: data.games_drawn },
                  { status: 'lost', value: data.games_lost },
                ]}
              />
            </div>
            <h4>Average goals per game</h4>
            <div className="my-data-container">
              <div className="my-data-item outlined">
                <p>Scored</p>
                <hr />
                <p className="stat">{data.av_goals_scored_per_game}</p>
              </div>
              <div className="my-data-item outlined">
                <p>Conceived</p>
                <hr />
                <p className="stat">{data.av_goals_conceived_per_game}</p>
              </div>
            </div>
            <h4>Biggest win</h4>
            <div className="my-data-item outlined">
              <p>
                {data.biggest_win.teams.home.team} -{' '}
                {data.biggest_win.teams.away.team}{' '}
              </p>
              <p className="stat">{data.biggest_win.score}</p>
              <p>
                Against:{' '}
                <span className="stat">{data.biggest_win.against}</span>
              </p>
            </div>
            <h4>Biggest loss</h4>
            <div className="my-data-item outlined">
              <p>
                {data.biggest_loss.teams.home.team} -{' '}
                {data.biggest_loss.teams.away.team}{' '}
              </p>
              <p className="stat">{data.biggest_loss.score}</p>
              <p>
                Against:{' '}
                <span className="stat">{data.biggest_loss.against}</span>
              </p>
            </div>
          </>
        </Container>
      )}
    </div>
  );
}

export default MyData;
