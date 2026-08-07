
import { AuthProvider, PostProvider } from "./context";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import SnackbarRoot from "./components/SnackbraRoot/SnackbarRoot";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PostProvider>
          <SnackbarRoot/>
          <RouterProvider router={Router} />
        </PostProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
