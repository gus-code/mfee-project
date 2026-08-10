import { HomePage } from "./components/Page";
import NavBar from "./components/NavBar";
import { PostProvider } from "./context";
import { Grid } from "@mui/material";

// import components
import PostPage from "./components/Page/PostPage";
import CategoriesPage from "./components/Page/CategoriesPage";
import LoginPage from "./components/Page/LoginPage";


function App() {
  const page: string = "HomePage";
  return (
    // ListoACT 7 - Rneder SnackbarProvider component
    <PostProvider>
      <>
        <Grid
          container
          id="app"
          direction="column"
          height="100vh"
          wrap="nowrap"
        >
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
            {/* LsitoACT 2 - Move the following content to a new component called LoginPage and render it*/}
            {/* ListoACT 4 - Add conditions to render PostPage, LoginPage and CategoriesPage components */}
          </Grid>
        </Grid>
      </>
    </PostProvider>
  );
}

export default App;