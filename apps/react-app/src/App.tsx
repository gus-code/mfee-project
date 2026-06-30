import { CategoriesPage, HomePage, PostPage } from "./components/Page";

import NavBar from "./components/NavBar";
import LoginPage from "./components/Page/LoginPage/LoginPage";
import { PostProvider } from "./context";
import SnackbarRoot from "./components/SnackbarRoot/SnackbarRoot";
import { Grid } from "@mui/material";

function App() {
  const page: string = "LoginPage";
  return (
    <PostProvider>
      <Grid container id="app" direction="column" height="100vh" wrap="nowrap">
        <NavBar />
        <SnackbarRoot />
        <Grid
          container
          item
          wrap="nowrap"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 84px)",
          }}
        >
          {page === "HomePage" && <HomePage />}
          {/* ACT 1 - Render PostPage and CategoriesPage components */}
          {page === "PostPage" && <PostPage />}
          {page === "CategoriesPage" && <CategoriesPage />}
          {/* ACT 4 - Add conditions to render PostPage, LoginPage and CategoriesPage components */}
          {/* ACT 2 - Move the following content to a new component called LoginPage and render it*/}
          {page === "LoginPage" && <LoginPage />}

        </Grid>
      </>
    </PostProvider>
  );
}

export default App;
