import { useState } from 'react';
import { CategoriesPage, HomePage, PostPage } from "./components/Page";

import NavBar from "./components/NavBar";
import LoginPage from "./components/Page/LoginPage/LoginPage";
import { PostProvider } from "./context";
import SnackbarRoot from "./components/SnackbarRoot/SnackbarRoot";
import { Grid } from "@mui/material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState<"HomePage" | "PostPage" | "CategoriesPage" | "LoginPage">("PostPage");
  return (
    <QueryClientProvider client={queryClient}>
      <PostProvider>
        <Grid container id="app" direction="column" height="100vh" wrap="nowrap">
          <NavBar onNavigate={setPage} />
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
            {page === "PostPage" && <PostPage postId='1.24'/>}
            {page === "CategoriesPage" && <CategoriesPage />}
            {/* ACT 4 - Add conditions to render PostPage, LoginPage and CategoriesPage components */}
            {/* ACT 2 - Move the following content to a new component called LoginPage and render it*/}
            {page === "LoginPage" && <LoginPage />}

          </Grid>
        </Grid>
      </PostProvider>
    </QueryClientProvider>
  );
}

export default App;
