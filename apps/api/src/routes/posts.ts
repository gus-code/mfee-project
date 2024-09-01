import express from 'express';
import postController from '../controllers/post';

const router = express.Router();

// Get all posts
router.get('/', postController.getAllPosts);

// Get post by category
router.get('/category/:category', postController.getPostByCategory);

// // Get post by id
router.get('/:id', postController.getPostById);

// // Create post
router.post('/', postController.createPost);

// // Create post comment
router.post('/:id/comments', postController.createPostComment);

// // Update post
router.patch('/:id', postController.updatePost);

// // Delete post
router.delete('/:id', postController.deletePost);

export default router;
