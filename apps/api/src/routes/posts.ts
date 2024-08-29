import express from 'express';

import postController from '../controllers/post';

const router = express.Router();

// Get all posts
router.get('/', postController.getAllPosts);

// Get post by category
router.get('/category/:category', postController.getPostByCategory);

// Get post by id
router.get('/:id', postController.getPostById);

// Create post
router.post('/', postController.createPost);

// Create comments
router.post('/:id/comments', postController.createComments);

// Update posts by id
router.patch('/:id', postController.updatePostById);

// Delete post by id
router.delete('/:id', postController.deletePost);

export default router;
