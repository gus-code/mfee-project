import express from 'express';
import postsController from '../controllers/post';
const postsRouter = express.Router();

postsRouter.get('/', postsController.getPosts);

postsRouter.get('/category/:category', postsController.getPostByCategory);

postsRouter.get('/:id', postsController.getPostById);

postsRouter.post('/', postsController.createPost);

postsRouter.post('/:id/comments', postsController.addPostComment);

postsRouter.patch('/:id', postsController.updatePost);

postsRouter.delete('/:id', postsController.deletePost);

export default postsRouter;
