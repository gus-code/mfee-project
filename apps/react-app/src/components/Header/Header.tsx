import { Grid, Typography } from '@mui/material';

function Header() {
  return (
    <>
      <Grid item flexGrow={1}>
        <Typography variant="caption" color="primary" alignItems="center">
          <span style={{ fontSize: '1.5rem' }}>[ </span>
          Making your Life Easier
          <span style={{ fontSize: '1.5rem' }}> ]</span>
        </Typography>
      </Grid>
      <Grid item flexGrow={1}>
        <Typography variant="h4" fontWeight="bold">
          Discovering the World
        </Typography>
      </Grid>
    </>
  );
}

export default Header;
