import { Grid } from '@mui/material';

import HomePage from './components/HomePage';
import PostPage from './components/PostPage';

function App() {
  return (
    <Grid container id="app" direction="column" height="100vh" flexWrap="nowrap">
      {/* Activity 2 - Move all Container content to Header component */}
      <Grid item flexGrow={1}>
        {/* Activity 1 - Render HomePage and PostPage */}
       <HomePage></HomePage>
       <PostPage></PostPage>
      </Grid>
    </Grid>
  );
}

export default App;
