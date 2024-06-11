import { HomePage, PostPage } from './components/Page';
import CategoriesPage from './components/Page/CategoriesPage/CategoriesPage';
import LoginPage from './components/Page/LoginPage';
import { Grid } from '@mui/material';

// import { PageContainer } from "./components/Page/LoginPage/LoginPage.styles";
import NavBar from './components/NavBar';
import { PostProvider } from './context';
import { SnackbarProvider } from './context';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState('LoginPage');
  return (
    //✅ ACT 7 - Rneder SnackbarProvider component
    <SnackbarProvider>
      <PostProvider>
        <Grid container id="app" direction="column" height="100vh" wrap="nowrap">
          <NavBar />
          <Grid
            container
            item
            wrap="nowrap"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 84px)'
            }}
          >
            {page === 'HomePage' && <HomePage />}
            {/*✅ ACT 1 - Render PostPage and CategoriesPage components  */}
            {page === 'PostPage' && <PostPage />}
            {page === 'CategoriesPage' && <CategoriesPage />}
            {/*✅ ACT 2 - Move the following content to a new component called LoginPage and render it*/}
            {page === 'LoginPage' && <LoginPage setPage={setPage} />}
            {/*✅ ACT 4 - Add conditions to render PostPage, LoginPage and CategoriesPage components */}
          </Grid>
        </Grid>
      </PostProvider>
    </SnackbarProvider>
  );
}

export default App;
