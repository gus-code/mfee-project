import { HomePage } from "./components/Page";
import { PostPage } from "./components/Page";
import { CategoriesPage } from "./components/Page";
import LoginPage from "./components/Page/LoginPage";


function App() {
  return (
    <>
      <HomePage />
      <PostPage />
      <CategoriesPage />
      
      <LoginPage />
    </>
  );
}

export default App;
