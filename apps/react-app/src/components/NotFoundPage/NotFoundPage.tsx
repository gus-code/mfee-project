import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function NotFoundPage(): React.JSX.Element {
  return (
    <Grid container alignContent="center" justifyContent="center" flexDirection="column" textAlign="center" sx={{ height: '100vh' }}>
      <Typography variant="h2">Page Not Found.</Typography>
      <br />
      <Typography sx={{ maxWidth: '60ch' }}>
        You have ended up on a URL for a page that does not exist. You can use the back button in your browser to return to where you were.
      </Typography>
    </Grid>
  );
}
