import { HomePage , PostPage, LoginPage, CategoriesPage } from "./components/Page";
import NavBar from "./components/NavBar";
import { PostProvider, SnackbarProvider } from "./context";
import { Grid } from "@mui/material";

function App() {
  const page: string = "HomePage";
  return (
    <SnackbarProvider>
      <PostProvider>
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
              {page === "PostPage" && <PostPage/>}
              {page === "CategoriesPage" && <CategoriesPage/>}
              {page === "LoginPage" && <LoginPage/>}
            </Grid>
          </Grid>
      </PostProvider>  
    </SnackbarProvider>
    
  );
}

export default App;
