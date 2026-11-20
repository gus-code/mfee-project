import express from 'express';
import postController from '../controllers/post';

const router = express.Router();

router.get('/', postController.getPosts);

router.post('/', postController.savePost);

router.get('/category/:category', postController.getPostsByCategory);

router.get('/:id', postController.getPostById);

router.post('/:id/comments', postController.savePostComment);

router.delete('/:id', postController.deletePostById);

router.patch('/:id', postController.editPostById);

export default router;
