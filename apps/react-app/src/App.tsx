
import { HomePage, PostPage, CategoriesPage, LoginPage} from "./components/Page";
import { Grid } from "@mui/material";

import { PageContainer } from "./components/Page/LoginPage/LoginPage.styles";
import NavBar from "./components/NavBar";
import Comments from "./components/Comments";

function App() {
  const page: string = "PostPage" ;
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
          {/* ACT 4  */}
          {page === "HomePage" && <HomePage/> }
          {page === "PostPage" && <PostPage/> }
          {page === "LoginPage" && <LoginPage/> }
          {page === "CategoriesPage" && <CategoriesPage/> }

        </Grid>
      </Grid>
    </>
  );
}

export default App;
