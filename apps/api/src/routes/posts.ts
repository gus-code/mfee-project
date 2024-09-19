import express from 'express';
import postsController from '../controllers/posts';

const router = express.Router();
 
router.get('/', postsController.getAllPosts);
 
router.get('/category/:category', postsController.getPostsByCategory);
 
router.get('/:id', postsController.getPostsById);
 
router.post('/', postsController.createPost);
 
router.post('/:id/comments', postsController.createComment);
 
router.patch('/:id', postsController.updatePost);
 
router.delete('/:id', postsController.deletePost);
 
export default router;