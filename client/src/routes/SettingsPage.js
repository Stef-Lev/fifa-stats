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
import useLogout from '../hooks/useLogout';
import { ThemeContext } from '../context/ThemeContext';

const SettingsPage = () => {
  const { player, isLoading } = useFindPlayer();
  const { theme, updateTheme } = useContext(ThemeContext);
  const { logoutPlayer } = useLogout();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [color, setColor] = useState('#fff');
  const iconStyle = { marginRight: '8px' };
  const setItemStyle = { display: 'flex' };
  const withPadding = { padding: '12px' };
  const withButton = { padding: '9px' };

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
        <div>
          <div className="flex-centered" style={{ flexDirection: 'column' }}>
            <AccountCircleIcon
              style={{ width: '120px', height: '120px', margin: '20px 0 0' }}
            />
            <h3>{player.fullname}</h3>
          </div>
          <div className="settings">
            <div className="set-item">
              <div style={setItemStyle}>
                <DarkModeIcon style={iconStyle} />
                <Typography>Dark mode</Typography>
              </div>
              <Switch checked={theme === 'dark'} onChange={updateTheme} />
            </div>
            <div className="set-item" style={withButton}>
              <div style={setItemStyle}>
                <ColorLensIcon style={iconStyle} />
                <Typography>Player color</Typography>
              </div>
              <div
                className="color-circle"
                style={{ backgroundColor: player.color }}
                onClick={() => handleShowColorSelect()}
              ></div>
            </div>
            <div
              style={withPadding}
              className="set-item"
              onClick={() => logoutPlayer()}
            >
              <div style={setItemStyle}>
                <LogoutIcon style={iconStyle} />
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
          <div className="about-msg">
            <p>Developed by Stefanos Leventis. &copy; 2021</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
