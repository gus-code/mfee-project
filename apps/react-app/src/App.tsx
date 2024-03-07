import { Grid, Typography } from '@mui/material';

import { Container } from './components/Header/Header.styles';
import HomePage from './components/HomePage/HomePage';
import PostPage from './components/PostPage';
import Header from './components/Header';

function App() {
  return (
    <Grid container id="app" direction="column" height="100vh" flexWrap="nowrap">
      <Container container>
        <Header></Header>
      </Container>

      <Grid item flexGrow={1}>
        <HomePage></HomePage>
        <PostPage></PostPage>
      </Grid>
    </Grid>
  );
}

export default App;
