import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

/**
 * This shows a horizontally and vertically centred loading spinner to use when a component is loading content to display
 */
export default function Loading(): React.JSX.Element {
  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      sx={{ minHeight: '100%', minWidth: '100%' }}
    >
      <CircularProgress/>
    </Grid>
  );
}
