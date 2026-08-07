import { Grid } from "@mui/material";

import { HomePage } from "./components/Page";
import { PageContainer } from "./components/Page/LoginPage/LoginPage.styles";
import PostPage from "./components/Page/PostPage/PostPage";
import CategoriesPage from "./components/Page/CategoriesPage/CategoriesPage";
import LoginPage from "./components/Page/LoginPage";

function App() {
  return (
    <>
      <HomePage />

      {/* ListoACT 1 - Render PostPage, and CategoriesPage components */}
      <PostPage />
      <CategoriesPage />

      {/* ListoACT 2 - Move the following content to a new component called LoginPage and render it*/}
      <LoginPage />
    </>
  );
}

export default App;
