import express from 'express';

import postController from '../controllers/post';

const router = express.Router();

// Get all posts
router.get('/', postController.getPosts);

// Get post by id
router.get('/:id', postController.getPostById);

// Create post
router.post('/', postController.createPost);

// Update post
router.patch('/:id', postController.updatePost);

// Delete post
router.delete('/:id', postController.deletePost);

// Get all posts by category
router.get('/category/:category', postController.getPostsByCategory);

// Create post comment
router.post('/:id/comments', postController.createPostComment);

export default router;
