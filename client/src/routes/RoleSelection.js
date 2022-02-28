import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { updateMethod, getAllMethod } from '../helpers/httpService';
import Container from '@mui/material/Container';
import Loader from '../components/Loader';
import { FormHelperText } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PlayerContext } from '../context/PlayerContext';
import { applyThemeColor } from '../helpers/applyThemeColor';

function RoleSelection() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const { player } = useContext(PlayerContext);

  useEffect(() => {
    getAllMethod(`/api/players/`).then((data) => {
      setPlayers(data);
      setLoading(false);
    });
  }, []);

  const createData = (fullname, username, role, id) => {
    return { fullname, username, role, id };
  };

  const handleRoleSelection = (event, id) => {
    if (players.length) {
      let playersArray = [...players];
      let changedItemIndex = players.findIndex((item) => item._id === id);
      let changedPlayer = {
        ...playersArray[changedItemIndex],
        role: event.target.value,
      };
      playersArray[changedItemIndex] = changedPlayer;

      const obj = {
        id: playersArray[changedItemIndex]._id,
        role: event.target.value,
      };
      updateMethod(
        `/api/players/role/`,
        playersArray[changedItemIndex]._id,
        obj,
      ).then(() => {
        setPlayers(playersArray);
      });
    }
  };

  const rows = players
    .filter((item) => item._id !== player._id)
    .map((player) =>
      createData(player.fullname, player.username, player.role, player._id),
    );

  return (
    <div className="role-management">
      {loading && <Loader />}
      {!loading && (
        <Container maxWidth="sm" className="main-container">
          <p className="title">
            Change the role of players. An admin user can create and edit
            tournaments
          </p>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead sx={{ borderBottom: '1px solid white' }}>
                <TableRow>
                  <TableCell>Player</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={`_${index}`}>
                    <TableCell>{row.fullname}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>
                      <FormControl fullWidth className="w-40">
                        <Select
                          labelId="select-label"
                          id="select"
                          value={row.role}
                          sx={{
                            '&.MuiOutlinedInput-root': {
                              color: applyThemeColor(theme, '#fff', '#1b2433'),
                              '& fieldset': {
                                borderColor: applyThemeColor(
                                  theme,
                                  '#fff',
                                  '#1b2433',
                                ),
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: applyThemeColor(
                                  theme,
                                  '#fff',
                                  '#1b2433',
                                ),
                              },
                              '& .MuiSvgIcon-root': {
                                color: applyThemeColor(
                                  theme,
                                  '#fff',
                                  '#1b2433',
                                ),
                              },
                            },
                          }}
                          onChange={(e) => handleRoleSelection(e, row.id)}
                        >
                          {['admin', 'user'].map((item, index) => (
                            <MenuItem key={index + 1} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </div>
  );
}

export default RoleSelection;
