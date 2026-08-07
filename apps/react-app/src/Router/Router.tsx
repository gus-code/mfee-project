import { createBrowserRouter } from "react-router-dom";
import Page, { CategoriesPage, HomePage, PostPage } from "../components/Page";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../components/Page/LoginPage/LoginPage";
import NotFoundPage from "../components/Page/NotFoundPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Page page={<HomePage />} />,
  },
  {
    path: '/posts/:postId',
    element: <PrivateRoute route={<Page page={<PostPage/>}/>}/>
  },
  {
    path: '/categories',
    element: <PrivateRoute route={<Page page={<CategoriesPage/>}/>}/>
  },
    {
    path: '/login',
    element: <Page page={<LoginPage/>}/>
  },
    {
    path: '*',
    element: <Page page={<NotFoundPage/>} />
  }
]);

export default Router;
