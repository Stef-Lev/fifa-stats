import React from 'react';
import useFindPlayer from '../hooks/useFindPlayer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';

const ProfilePage = () => {
  const { player} = useFindPlayer();
  console.log(player);
  return (<div className="profile-page">
    <AccountCircleIcon style={{width: '120px',height: '120px', margin: '20px 0'}}/>
    Username {<EditIcon/>}
  </div>);
}

export default ProfilePage;
