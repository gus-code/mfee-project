import { createBrowserRouter } from "react-router-dom";

import Page, { HomePage, PostPage, LoginPage, CategoriesPage, } from "../components/Page";
import NotFoundPage from "../components/Page/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute route={<Page page={<HomePage />} />} />,
  },
  {
    path:"/posts/:postID",
    element: <PrivateRoute route={<Page page={<PostPage/>}/>}/>,
  },
  {
    path:"/categories",
    element: <PrivateRoute route={<Page page={<CategoriesPage/>} />}/>,
  },
  {
    //cambio a ruta no privada para probar el login
    path:"/login",
    element: <Page page={<LoginPage/>}/>,
  },
  {
    path:"*",
    element: <Page page={<NotFoundPage/>}/>
  }

]);

export default Router;
