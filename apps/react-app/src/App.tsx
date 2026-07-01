import { HomePage, LoginPage, PostPage, CategoriesPage } from "./components/Page";
import NavBar from "./components/NavBar";
import { PostProvider } from "./context";
import { Grid } from "@mui/material";

function App() {
  const page: string = "HomePage";
  return (
    // ACT 7 - Rneder SnackbarProvider component
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
            {/* ACT 4  */}
            {page === "HomePage" && <HomePage/> }
            {page === "PostPage" && <PostPage/> }
            {page === "LoginPage" && <LoginPage/> }
            {page === "CategoriesPage" && <CategoriesPage/> }
          </Grid>
        </Grid>
      </>
    </PostProvider>
  );
}

export default App;
