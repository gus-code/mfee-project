import { Grid } from "@mui/material";

import CategoriesPage from "./components/Page/CategoriesPage/CategoriesPage";
import HomePage from "./components/Page/HomePage/HomePage";
import PostPage from "./components/Page/PostPage/PostPage";
import { PageContainer } from "./components/Page/LoginPage/LoginPage.styles";
import { LoginPage } from "./components/Page";

function App() {
  return (
    <>
      <HomePage />
      {/* ACT 1 - Render PostPage, and CategoriesPage components (Done)*/}
      <PostPage />
      <CategoriesPage />
      {/* ACT 2 - Move the following content to a new component called LoginPage and render it (Done)*/}
      <LoginPage />
    </>
  );
}

export default App;
