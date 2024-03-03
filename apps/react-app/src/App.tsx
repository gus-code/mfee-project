import { Grid, Typography } from '@mui/material';

import { Container } from './components/Header/Header.styles';

function App() {
  return (
    <Grid container id="app" direction="column" height="100vh" flexWrap="nowrap">
      {/* Activity 2 - Move all Container content to Header component */}
      <Container container>
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
      </Container>

      <Grid item flexGrow={1}>
        {/* Activity 1 - Render HomePage and PostPage */}
      </Grid>
    </Grid>
  );
}

export default App;
