import { Grid } from "@mui/material";

import { PostProvider } from "./context"
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import PostPage from "./components/PostPage";

function App() {
  return (
    // Activity 7 - Render SnackbarProvider
      <PostProvider>
        <Grid
          container
          id="app"
          direction="column"
          height="100vh"
          flexWrap="nowrap"
        >
          <Header />
          <Grid item flexGrow={1}>
            <HomePage />
            <PostPage />
          </Grid>
        </Grid>
      </PostProvider>
  );
}

export default App;
