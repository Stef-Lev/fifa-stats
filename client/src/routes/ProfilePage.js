import React, { useContext } from 'react';
import useFindPlayer from '../hooks/useFindPlayer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import Switch from '@mui/material/Switch';
import Loader from '../components/Loader';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Typography from '@mui/material/Typography';
import useLogout from '../hooks/useLogout';
import { ThemeContext } from '../context/ThemeContext';

const ProfilePage = () => {
  const { player, isLoading } = useFindPlayer();
  const { theme, updateTheme } = useContext(ThemeContext);
  const { logoutPlayer } = useLogout();
  const iconStyle = { marginRight: '8px' };
  const setItemStyle = { display: 'flex' };
  const withPadding = { padding: '12px' };

  console.log(player);

  return (
    <div className="profile-page">
      {isLoading && <Loader />}
      {!isLoading && (
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
