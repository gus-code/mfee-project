import { PostProvider, SnackbarProvider, AuthProvider} from "./context";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";


function App() {
  const page: string = "CategoriesPage";
  return (
    <AuthProvider >
      <SnackbarProvider>
        <PostProvider>
          <RouterProvider router={Router}/>
      </PostProvider>
    </SnackbarProvider>
  </AuthProvider>
  );
}

export default App;
