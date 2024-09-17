import express from 'express';
import postController from '../controllers/post';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/category/:category', postController.getPostsByCategoryId);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.post('/:id/comments', postController.addComment);
router.patch('/:id', postController.updatePostTitle);
router.delete('/:id', postController.deletePost);

export default router;
