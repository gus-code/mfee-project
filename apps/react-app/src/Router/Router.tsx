import { createBrowserRouter } from "react-router-dom";
import Page, { CategoriesPage, HomePage, LoginPage, PostPage } from "../components/Page";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../components/Page/NotFoundPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute route={<Page page={<HomePage />} />} />,
  },
  {
    path: "/post/:id",
    element: <PrivateRoute route={<Page page={<PostPage />} />} />
  },
  {
    path: "/login",
    element: <PrivateRoute route={<Page page={<LoginPage />} /> } />
  },
  {
    path: "/categories",
    element: <PrivateRoute route={<Page page={<CategoriesPage />} /> } />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
  // ACT 10 - Render PostPage component inside a private route and mark postID as a params
  // ACT 10 - Render CategoriesPage component inside a private route
  // ACT 10 - Render LoginPage component inside a private route
  // ACT 10 - Render NotFoundPage component for undefined routes
]);

export default Router;
