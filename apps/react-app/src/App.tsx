import { Grid } from '@mui/material';

import { Container } from './components/Header/Header.styles';
import HomePage from './components/HomePage/HomePage';
import PostPage from './components/PostPage';
import Header from './components/Header';
import { PostProvider, SnackbarProvider } from './context';

function App() {
  return (
    <SnackbarProvider>
      <PostProvider>
        <Grid container id="app" direction="column" height="100vh" flexWrap="nowrap">
          <Container container>
            <Header></Header>
          </Container>

          <Grid item flexGrow={1}>
            <HomePage></HomePage>
            <PostPage></PostPage>
          </Grid>
        </Grid>
      </PostProvider>
    </SnackbarProvider>
  );
}

export default App;
