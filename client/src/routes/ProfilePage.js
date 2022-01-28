import React, { useContext } from 'react';
import useFindPlayer from '../hooks/useFindPlayer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import { ThemeContext } from '../context/ThemeContext';

const ProfilePage = () => {
  const { player } = useFindPlayer();
  const { theme, updateTheme } = useContext(ThemeContext);

  console.log(player);

  return (
    <div className="profile-page">
      <AccountCircleIcon
        style={{ width: '120px', height: '120px', margin: '20px 0' }}
      />
      Username {<EditIcon />}
      <Switch checked={theme === 'dark'} onChange={updateTheme} />
    </div>
  );
};

export default ProfilePage;
