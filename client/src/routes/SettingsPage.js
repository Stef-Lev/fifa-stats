import React, { useContext, useState, useEffect } from 'react';
import { updateMethod } from '../helpers/httpService';
import useFindPlayer from '../hooks/useFindPlayer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LogoutIcon from '@mui/icons-material/Logout';
import Switch from '@mui/material/Switch';
import Loader from '../components/Loader';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ColorPicker from '../components/ColorPicker';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useLogout from '../hooks/useLogout';
import { ThemeContext } from '../context/ThemeContext';

const SettingsPage = () => {
  const { player, isLoading } = useFindPlayer();
  const { theme, updateTheme } = useContext(ThemeContext);
  const { logoutPlayer } = useLogout();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerColor, setPickerColor] = useState('#fff');

  useEffect(() => {
    if (player) {
      setPickerColor(player.color);
    }
  }, [player]);

  const handleShowColorPicker = () => {
    setPickerOpen((prev) => !prev);
  };

  const handleUpdateColor = () => {
    const obj = { id: player._id, color: pickerColor };
    updateMethod(`/api/players/color/`, player._id, obj).then(() => {
      handleShowColorPicker();
    });
  };

  return (
    <div className="settings-page">
      {isLoading && <Loader />}
      {!isLoading && player && (
        <>
          <Container maxWidth="sm" className="main-container">
            <div className="flex-centered flex-column">
              <AccountCircleIcon id="account-avatar" />
              <h3>{player.fullname}</h3>
            </div>
            <div className="settings">
              <div className="set-item">
                <div className="flex">
                  <DarkModeIcon className="mr8" />
                  <Typography>Dark mode</Typography>
                </div>
                <Switch checked={theme === 'dark'} onChange={updateTheme} />
              </div>
              <div className="set-item p10">
                <div className="flex">
                  <ColorLensIcon className="mr8" />
                  <Typography>Player color</Typography>
                </div>
                <div
                  className="color-circle"
                  style={{ backgroundColor: pickerColor }}
                  onClick={() => handleShowColorPicker()}
                ></div>
              </div>
              <div className="set-item p10" onClick={() => logoutPlayer()}>
                <div className="flex">
                  <LogoutIcon className="mr8" />
                  <Typography>Logout</Typography>
                </div>
              </div>
              <ColorPicker
                open={pickerOpen}
                onClose={() => handleUpdateColor()}
                color={pickerColor}
                onChange={(e) => setPickerColor(e)}
              />
            </div>
          </Container>
          <div className="bottom-msg">
            <p>Developed by Stefanos Leventis. </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsPage;
