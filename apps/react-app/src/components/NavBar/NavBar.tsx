import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { AuthContext } from '../../context';
import { SnackbarContext } from '../../context/SnackbarProvider';
import { logout } from '../../api/endpoints/auth';

export default function NavBar(): React.JSX.Element {
  const { createAlert } = useContext(SnackbarContext);
  const { isAuthenticated } = useContext(AuthContext);

  const loginLink = (
    <NavLink
      to="/login"
      end
      style={({ isActive }) => ({
        gap: '16px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        backgroundColor: isActive ? '#307ecc' : 'transparent',
        padding: '0.5em',
        textDecoration: 'none',
        color: 'white'
      })}
    >
      Login
    </NavLink>
  );

  const logoutLink = (
    <Button
      style={{
        gap: '16px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        padding: '0.5em',
        textDecoration: 'none',
        textTransform: 'none',
        color: 'white'
      }}
      onClick={() =>
        logout({
          onSuccess: () => {
            const { protocol, host } = window.location;
            const signInUrl = `${protocol}//${host}/login`;
            if (window.location.href !== signInUrl) {
              window.location.assign(signInUrl);
            }
            createAlert('You are successfully logged out!', 'success');
          }
        })
      }
    >
      Logout
    </Button>
  );

  return (
    <Grid
      item
      sx={{
        display: 'flex',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0065c9',
        height: '84px'
      }}
    >
      <NavLink
        to="/"
        style={{
          textDecoration: 'none',
          color: 'white',
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}
      >
        <TravelExploreIcon sx={{ width: 45, height: 45 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" fontWeight="bold">
            Discovering the World
          </Typography>
          <Typography variant="caption" alignItems="center">
            Making your Life Easier
          </Typography>
        </Box>
      </NavLink>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: 2
        }}
      >
        <NavLink
          to="/categories"
          end
          style={({ isActive }) => ({
            gap: '16px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px',
            padding: '0.5em',
            backgroundColor: isActive ? '#307ecc' : 'transparent',
            textDecoration: 'none',
            color: 'white'
          })}
        >
          Categories
        </NavLink>
        {isAuthenticated ? logoutLink : loginLink}
      </Box>
    </Grid>
  );
}
