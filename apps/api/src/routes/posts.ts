import express from 'express';
import postController from '../controllers/post';
import postMiddleware from '../middleware/post';

const postsRouter = express.Router()

postsRouter.get('/', postController.getPost);
postsRouter.post('/', postController.createPost);
postsRouter.get('/category/:categoryId', postController.getPostByCategory);
postsRouter.use('/:postId', postMiddleware);
postsRouter.post('/:postId/comments', postController.createPostComment);
postsRouter.get('/:postId', postController.getPostById);
postsRouter.patch('/:postId', postController.updatePost);
postsRouter.delete('/:postId', postController.deletePost);

export default postsRouter;