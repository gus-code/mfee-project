import { createBrowserRouter } from 'react-router-dom';
import Page, { CategoriesPage, HomePage, LoginPage, NotFoundPage, PostPage } from '../components/Page';
import PrivateRoute from './PrivateRoute';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute route={<Page page={<HomePage />} />} />
  },
  {
    path: '/post/:postId',
    element: <PrivateRoute route={<Page page={<PostPage />} />} />
  },
  {
    path: '/categories',
    element: <PrivateRoute route={<Page page={<CategoriesPage />} />} />
  },
  {
    path: '/login',
    element: <Page page={<LoginPage />} />
  },
  {
    path: '*',
    element: <PrivateRoute route={<Page page={<NotFoundPage />} />} />
  }
]);

export default Router;
