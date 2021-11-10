import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Standings({ tournament }) {
  const createData = (player, points, goalsFor, goalsAg, goalDiff) => {
    return { player, points, goalsFor, goalsAg, goalDiff };
  };

  const { participants } = tournament;

  const rows = participants
    .map((item) =>
      createData(
        item.player.name,
        item.points,
        item.goals.for,
        item.goals.against,
        item.goals.for - item.goals.against,
      ),
    )
    .sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Goals+</TableCell>
              <TableCell>Goals-</TableCell>
              <TableCell>Diff</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={`${row.name}_${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.player}
                </TableCell>
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
