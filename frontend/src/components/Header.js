import React, { useState, useEffect } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';

const headerData = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Tournaments',
    href: '/tournaments',
  },
  {
    label: 'New tournament',
    href: '/tournaments/new',
  },
  {
    label: 'Players statistics',
    href: '/players',
  },
  {
    label: 'Add player',
    href: '/player/add',
  },
];

const Header = () => {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 854
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);

  const getDrawerChoices = () => {
    return headerData.map(({ label, href }) => {
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
              setState((prevState) => ({ ...prevState, drawerOpen: false })),
          }}
        >
          <MenuItem
            className="app-item"
            sx={{
              fontSize: '1.6rem',
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
    });
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

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
              setState((prevState) => ({ ...prevState, drawerOpen: false }))
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
        <Typography variant="h5">FIFA Tournaments</Typography>
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const getMenuButtons = () => {
    return headerData.map(({ label, href }) => {
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
    });
  };

  return (
    <AppBar className="app-bar" position="sticky">
      {mobileView ? displayMobile() : displayDesktop()}
    </AppBar>
  );
};
export default Header;
