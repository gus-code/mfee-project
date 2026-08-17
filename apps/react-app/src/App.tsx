import { RouterProvider } from "react-router-dom";

import Router from "./Router";
import { AuthProvider, PostProvider } from "./context";

function App() {
  return (
    <AuthProvider>
      {/* ACT 7 - Rneder SnackbarProvider component */}
      <PostProvider>
        <RouterProvider router={Router} />
      </PostProvider>
    </AuthProvider>
  );
}

export default App;