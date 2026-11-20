import express from 'express';
import Post from '../models/Post';
import postController from '../controllers/post';

const router = express.Router();

router.get('/', postController.getPosts);

router.get('/category/:category', postController.getPostsByCategory);

router.get('/:id', postController.getPostsById);

router.post('/', postController.createPost);

router.post('/:id/comments', postController.createCommentInPost);

router.patch('/:id', postController.updatePost);

router.delete('/:id', postController.deletePost);

export default router;