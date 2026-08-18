import { createBrowserRouter } from "react-router-dom";
import Page, { HomePage, PostPage, CategoriesPage, LoginPage, NotFoundPage, InicioPage, ProfilePage } from "../components/Page";

import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Page page={<InicioPage />}/>,
  },
  {
    path: "/login",
    element: <Page page={<LoginPage />}/>,
  },
  // paths con Private route
  {
    path: "/home",
    element: <PrivateRoute route={<Page page={<HomePage />} />}/>,
  },
  {
    path: "/profile",
    element: <PrivateRoute route={<Page page={<ProfilePage />} />}/>,
  },
  {
    path: "/post/:ID",
    element: <PrivateRoute route={<Page page={<PostPage />} />}/>,
  },
  {
    path: "/categories",
    element: <PrivateRoute route={<Page page={<CategoriesPage />} />} />,
  }, 
  {
    path: "/home",
    element: <PrivateRoute route={<Page page={<HomePage />} />} />,
  }, 
  {
    path: "*",
    element: <NotFoundPage />,
  }
]);

export default Router;
