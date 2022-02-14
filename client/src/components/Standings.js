import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Standings({ tournament }) {
  const createData = (player, team, points, goalsFor, goalsAg, goalDiff) => {
    return { player, team, points, goalsFor, goalsAg, goalDiff };
  };

  const { participants } = tournament;

  const rows = participants
    .map((item) =>
      createData(
        item.player.name,
        item.player.team,
        item.points,
        item.goals.for,
        item.goals.against,
        item.goals.for - item.goals.against,
      ),
    )
    .sort(
      (a, b) =>
        b.points - a.points ||
        b.goalDiff - a.goalDiff ||
        b.goalsFor - a.goalsFor,
    );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead sx={{ borderBottom: '1px solid white' }}>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Pts</TableCell>
              <TableCell>G+</TableCell>
              <TableCell>G-</TableCell>
              <TableCell>G+/-</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={`${row.name}_${index}`}>
                <TableCell>{row.player}</TableCell>
                <TableCell>{row.team}</TableCell>
                <TableCell>{row.points}</TableCell>
                <TableCell>{row.goalsFor}</TableCell>
                <TableCell>{row.goalsAg}</TableCell>
                <TableCell>{row.goalDiff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Standings;
