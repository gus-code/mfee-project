import { createBrowserRouter } from 'react-router-dom';
import Page, { HomePage } from '../Page';
import PostPage from '../Page/PostPage';
import NotFoundPage from '../NotFoundPage';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Page page={<HomePage />} />
  },
  {
    path: '/posts/:id',
    element: <PostPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

export default Router;
