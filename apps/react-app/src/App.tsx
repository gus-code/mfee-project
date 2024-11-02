import { RouterProvider } from "react-router-dom";

import Router from "./Router";
import { AuthProvider, PostProvider, SnackbarProvider } from "./context";

function App() {

  return (
    <AuthProvider>
      {/* ACT 7 - Rneder SnackbarProvider component */}
      <SnackbarProvider>
        <PostProvider>
          <RouterProvider router={Router} />
        </PostProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;

