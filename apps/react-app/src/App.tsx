import { RouterProvider } from "react-router-dom";

import Router from "./components/Router";
import { PostProvider } from "./context";

function App() {
  return (
    // Activity 7 - Render SnackbarProvider
    <PostProvider>
      <RouterProvider router={Router} />
    </PostProvider>
  );
}

export default App;
