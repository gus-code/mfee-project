import { createBrowserRouter } from "react-router-dom";
import Page, { HomePage, PostPage, CategoriesPage, LoginPage, NotFoundPage, InicioPage } from "../components/Page";
import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
  // ListoACT 10 - Render LoginPage component inside a private route
  {
    path: "/",
    element: <Page page={<InicioPage />}/>,
  },
  {
    path: "/login",
    element: <Page page={<LoginPage />}/>,
  },
    // ListoACT 10 - Render PostPage component inside a private route and mark postID as a params
  {
    path: "/post/:ID",
    element: <PrivateRoute route={<Page page={<PostPage />} />}/>,
  },
    // ListoACT 10 - Render CategoriesPage component inside a private route
  {
    path: "/categories",
    element: <PrivateRoute route={<Page page={<CategoriesPage />} />} />,
  }, 
  {
    path: "/home",
    element: <PrivateRoute route={<Page page={<HomePage />} />} />,
  }, 
  // ListoACT 10 - Render NotFoundPage component for undefined routes
  {
    path: "*",
    element: <NotFoundPage />,
  }
]);

export default Router;
