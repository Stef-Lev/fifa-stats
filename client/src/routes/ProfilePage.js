import React, { useContext, useState, useEffect } from 'react';
import useFindPlayer from '../hooks/useFindPlayer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Switch from '@mui/material/Switch';
import Loader from '../components/Loader';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ColorSelect from '../components/ColorSelect';
import Typography from '@mui/material/Typography';
import useLogout from '../hooks/useLogout';
import { ThemeContext } from '../context/ThemeContext';

const ProfilePage = () => {
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

  useEffect(() => {
    if (player) {
      setColor(player.color);
    }
  }, []);

  console.log(player);
  // console.log('COLOR', color, player.color);

  return (
    <div className="profile-page">
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
                <Typography>Player color</Typography>{' '}
                <span
                  className="color-circle"
                  style={{ backgroundColor: player.color }}
                ></span>
              </div>
              <Button
                className="auth-btn"
                onClick={() => handleShowColorSelect()}
              >
                Change
              </Button>
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
              onClose={() => handleShowColorSelect()}
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

export default ProfilePage;
