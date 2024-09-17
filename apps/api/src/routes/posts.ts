import express from 'express';

import postController from '../controllers/posts';

const router = express.Router();

// Get all posts
router.get('/', postController.getPosts);

// Get post by category
router.get('/category/:category', postController.getPostsByCategory);

// Get post by id
router.get('/:id', postController.getPost);

// Create post
router.post('/', postController.createPost);

// Create comment
router.post('/:id/comments', postController.createComment);

// Update post
router.patch('/:id', postController.updatePost);

// Delete post
router.delete('/:id', postController.deletePost);

export default router;
