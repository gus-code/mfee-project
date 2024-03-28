import { Grid } from '@mui/material';

import { Container } from './components/Header/Header.styles';
import HomePage from './components/Page/HomePage/HomePage';
import PostPage from './components/Page/PostPage';
import Header from './components/Header';
import { PostProvider, SnackbarProvider } from './context';
import { RouterProvider } from 'react-router-dom';
import Router from './components/Router';

function App() {
  return (
    <SnackbarProvider>
      <PostProvider>
        <RouterProvider router={Router} />
        {/* <Grid container id="app" direction="column" height="100vh" flexWrap="nowrap">
          <Container container>
            <Header></Header>
          </Container>

          <Grid item flexGrow={1}>
            <HomePage></HomePage>
            <PostPage></PostPage>
          </Grid>
        </Grid>  */}
      </PostProvider>
    </SnackbarProvider>
  );
}

export default App;
