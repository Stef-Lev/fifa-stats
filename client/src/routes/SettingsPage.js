import React, { useContext, useState } from 'react';
import { updateMethod } from '../helpers/httpService';
import useFindPlayer from '../hooks/useFindPlayer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LogoutIcon from '@mui/icons-material/Logout';
import Switch from '@mui/material/Switch';
import Loader from '../components/Loader';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ColorSelect from '../components/ColorSelect';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useLogout from '../hooks/useLogout';
import { ThemeContext } from '../context/ThemeContext';

const SettingsPage = () => {
  const { player, isLoading } = useFindPlayer();
  const { theme, updateTheme } = useContext(ThemeContext);
  const { logoutPlayer } = useLogout();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [color, setColor] = useState('#fff');

  const handleShowColorSelect = () => {
    setPickerOpen((prev) => !prev);
  };

  const handleUpdateColor = () => {
    const obj = { id: player._id, color };
    updateMethod(`/api/players/`, player._id, obj)
      .then((res) => {
        handleShowColorSelect();
      })
      .then(() => window.location.reload());
  };

  return (
    <div className="settings-page">
      {isLoading && <Loader />}
      {!isLoading && player && (
        <>
          <Container maxWidth="sm" className='main-container'>
            <div className="flex-centered flex-column">
              <AccountCircleIcon
                id='account-avatar'
              />
              <h3>{player.fullname}</h3>
            </div>
            <div className="settings">
              <div className="set-item">
                <div className='flex'>
                  <DarkModeIcon className='mr8' />
                  <Typography>Dark mode</Typography>
                </div>
                <Switch checked={theme === 'dark'} onChange={updateTheme} />
              </div>
              <div className="set-item p10">
                <div className='flex'>
                  <ColorLensIcon className='mr8' />
                  <Typography>Player color</Typography>
                </div>
                <div
                  className="color-circle"
                  style={{ backgroundColor: player.color }}
                  onClick={() => handleShowColorSelect()}
                ></div>
              </div>
              <div
                className="set-item p10"
                onClick={() => logoutPlayer()}
              >
                <div className='flex'>
                  <LogoutIcon className='mr8' />
                  <Typography>Logout</Typography>
                </div>
              </div>
              <ColorSelect
                open={pickerOpen}
                onClose={() => handleUpdateColor()}
                color={player.color}
                onChange={(e) => setColor(e)}
              />
            </div>
          </Container>
          <div className="bottom-msg">
            <p>Developed by Stefanos Leventis. &copy; 2021</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsPage;
