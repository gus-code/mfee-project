import { Grid } from "@mui/material";

import { CategoriesPage, HomePage, PostPage } from "./components/Page";

import NavBar from "./components/NavBar";
import { LoginPage } from "./components/Page/LoginPage/LoginPage";

function App() {
  const page: string = "HomePage";
  return (
    <Grid container id="app" direction="column" height="100vh" wrap="nowrap">
      <NavBar />
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
          {/* ACT 2 - Move the following content to a new component called LoginPage and render it*/}
          {page === "LoginPage" && <LoginPage/>}
        </Grid>
  </Grid>
  );
}

export default App;
