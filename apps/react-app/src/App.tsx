import { Grid } from '@mui/material';

import HomePage from './components/HomePage';
import PostPage from './components/PostPage';
import Header from './components/Header/Header';

function App() {
  return (
    <Grid container id="app" direction="column" height="100vh" flexWrap="nowrap">
      <Header/>
      <Grid item flexGrow={1}>
        {/* Activity 1 - Render HomePage and PostPage */}
       <HomePage/>
       <PostPage/>
      </Grid>
    </Grid>
  );
}

export default App;
