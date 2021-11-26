import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function PlayerStats({ tab, players }) {
  const gameRows = players.sort(
    (a, b) => b.games_played.statistics.won - a.games_played.statistics.won,
  );
  const goalRows = players.sort(
    (a, b) => b.goals.for - b.goals.against - (a.goals.for - a.goals.against),
  );
  const tournamentRows = players.sort(
    (a, b) => b.tournaments_played.won - a.tournaments_played.won,
  );

  return (
    <div>
      {tab === 'games' && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table" size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell>Won</TableCell>
                <TableCell>Drawn</TableCell>
                <TableCell>Lost</TableCell>
                <TableCell>Wins%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameRows.map((row, index) => {
                const { total, won, drawn, lost } = row.games_played.statistics;
                return (
                  <TableRow key={`${row.name}_${index}`}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{won}</TableCell>
                    <TableCell>{drawn}</TableCell>
                    <TableCell>{lost}</TableCell>
                    <TableCell>{Math.floor((won / total) * 100)}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tab === 'goals' && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table" size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell>For</TableCell>
                <TableCell>Against</TableCell>
                <TableCell>Diff</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {goalRows.map((row, index) => {
                return (
                  <TableRow key={`${row.name}_${index}`}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.goals.for}</TableCell>
                    <TableCell>{row.goals.against}</TableCell>
                    <TableCell>{row.goals.for - row.goals.against}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tab === 'tournaments' && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table" size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell>Won</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tournamentRows.map((row, index) => {
                const { won, total } = row.tournaments_played;
                return (
                  <TableRow key={`${row.name}_${index}`}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{won}</TableCell>
                    <TableCell>{total}</TableCell>
                    <TableCell>{Math.floor((won / total) * 100)}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default PlayerStats;
