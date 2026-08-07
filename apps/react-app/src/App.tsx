import { Grid } from "@mui/material";

import { HomePage } from "./components/Page";
// import { PageContainer } from "./components/Page/LoginPage/LoginPage.styles";
import NavBar from "./components/NavBar";

// import components
import PostPage from "./components/Page/PostPage";
import CategoriesPage from "./components/Page/CategoriesPage";
import LoginPage from "./components/Page/LoginPage";

function App() {
  const page: string = "HomePage";
  return (
    <>
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
          {page === "PostPage" && <PostPage />}
          {page === "CategoriesPage" && <CategoriesPage />}
          {page === "LoginPage" && <LoginPage />}

          {/* ListoACT 1 - Render PostPage and CategoriesPage components */}
          <PostPage />
          <CategoriesPage />
          <LoginPage />
          {/* ListoACT 2 - Move the following content to a new component called LoginPage and render it*/}
          {/* ListoACT 4 - Add conditions to render PostPage, LoginPage and CategoriesPage components */}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
