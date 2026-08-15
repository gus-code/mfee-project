import { HomePage } from "./components/Page";
import NavBar from "./components/NavBar";
import { PostProvider } from "./context";
import { Grid } from "@mui/material";

// import components
import PostPage from "./components/Page/PostPage";
import CategoriesPage from "./components/Page/CategoriesPage";
import LoginPage from "./components/Page/LoginPage";
import AuthProvider, { useAuth } from "./api/AuthContext";


function App() {
  const page: string = "HomePage";
  const {isAuthenticated} = useAuth();
  return (
    <AuthProvider>
      <PostProvider>
        <AppContent/>
      </PostProvider>
    </AuthProvider>
  );
}
export default App;

function AppContent(){
  const {isAuthenticated} = useAuth();

  return (
    <Grid container id="app" direction="column" height="100vh" wrap="nowrap">
      <NavBar />
        <Grid container id="app" direction="column" height="100vh" wrap="nowrap">
          {isAuthenticated ? (
            <>
              <h1>Welcome back!</h1>
              <PostPage />
              <CategoriesPage />
            </>
          ):(
            <>
              <LoginPage />
              <p>Login or Create and account to see some posts</p>
            </>
          )}
        </Grid>
    </Grid>
  );
}