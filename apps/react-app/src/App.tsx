import { RouterProvider } from 'react-router-dom';

import { AuthProvider, PostProvider, SnackbarProvider } from './context';
import Router from './Router';

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <PostProvider>
          <RouterProvider router={Router} />
        </PostProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
