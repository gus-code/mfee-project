import { createBrowserRouter } from "react-router-dom";
import Page, { HomePage } from "../components/Page";
import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute route={<Page page={<HomePage />} />} />,
  },
  // ACT 10 - Render PostPage component inside a private route and mark postID as a params
  // ACT 10 - Render CategoriesPage component inside a private route
  // ACT 10 - Render LoginPage component inside a private route
  // ACT 10 - Render NotFoundPage component for undefined routes
]);

export default Router;
