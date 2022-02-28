import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import { PlayerContext } from '../context/PlayerContext';
import useLogout from '../hooks/useLogout';
import { headerData } from '../helpers/headerData';

const Header = () => {
  const [headerState, setHeaderState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { player } = useContext(PlayerContext);
  const { logoutPlayer } = useLogout();
  const { mobileView, drawerOpen } = headerState;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 920
        ? setHeaderState((prevState) => ({ ...prevState, mobileView: true }))
        : setHeaderState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);

  const isAdmin = (player) => {
    return player?.role === 'admin';
  };

  const isLogoutButton = (label) => {
    return label === 'Logout';
  };

  const getDrawerChoices = () => {
    return headerData.map(({ label, href, isPrivate }) => {
      if (!isAdmin(player) && isPrivate) {
        return null;
      } else if (isLogoutButton(label)) {
        return (
          <MenuItem
            key={`_${label}__`}
            className="app-item"
            sx={{
              fontSize: '1.6rem',
              '&:hover': {
                backgroundColor: '#c2f158',
                color: '#1b2433',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                height: '2px',
                width: '90%',
                backgroundColor: '#c2f158',
                margin: '0 auto',
                left: '0',
                right: '0',
                bottom: '0',
              },
            }}
            onClick={() => {
              mobileView &&
                setHeaderState((prevState) => ({
                  ...prevState,
                  drawerOpen: false,
                }));
              logoutPlayer();
            }}
          >
            <LogoutIcon className="logout-icon" /> {label}
          </MenuItem>
        );
      } else {
        return (
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: 'inherit',
              style: { textDecoration: 'none' },
              key: label,
              onClick: () =>
                mobileView &&
                setHeaderState((prevState) => ({
                  ...prevState,
                  drawerOpen: false,
                })),
            }}
          >
            <MenuItem
              className="app-item"
              sx={{
                fontSize: '1.6rem',
                '&:hover': {
                  backgroundColor: '#c2f158',
                  color: '#1b2433',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  height: '2px',
                  width: '90%',
                  backgroundColor: '#c2f158',
                  margin: '0 auto',
                  left: '0',
                  right: '0',
                  bottom: '0',
                },
              }}
            >
              {label}
            </MenuItem>
          </Link>
        );
      }
    });
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setHeaderState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setHeaderState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          className="drawer"
          PaperProps={{
            sx: {
              width: '75%',
              backgroundColor: '#1b2433',
              color: '#fff',
            },
          }}
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <MenuItem
            className="app-item"
            sx={{
              fontSize: '1.3rem',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            onClick={() =>
              mobileView &&
              setHeaderState((prevState) => ({
                ...prevState,
                drawerOpen: false,
              }))
            }
          >
            <CloseIcon />
          </MenuItem>
          <div>{getDrawerChoices()}</div>
        </Drawer>
        <div>
          <Typography variant="h5">FIFA Tournaments</Typography>
        </div>
      </Toolbar>
    );
  };

  const displayDesktop = () => {
    return (
      <Toolbar>
        <div className="desktop-bar">
          <div>
            <Typography variant="h5">FIFA Tournaments</Typography>
          </div>
          <div>{getMenuButtons()}</div>
        </div>
      </Toolbar>
    );
  };

  const getMenuButtons = () => {
    return headerData.map(({ label, href, isPrivate }) => {
      if (!isAdmin(player) && isPrivate) {
        return null;
      } else if (isLogoutButton(label)) {
        return (
          <Button
            {...{
              key: label,
              color: 'inherit',
              onClick: logoutPlayer,
              component: Button,
            }}
          >
            {label}
          </Button>
        );
      } else {
        return (
          <Button
            {...{
              key: label,
              color: 'inherit',
              to: href,
              component: RouterLink,
            }}
          >
            {label}
          </Button>
        );
      }
    });
  };

  return (
    <AppBar className="app-bar">
      {mobileView ? displayMobile() : displayDesktop()}
    </AppBar>
  );
};
export default Header;
