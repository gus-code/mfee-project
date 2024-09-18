import express from 'express';
import postController from '../controllers/post';

const router = express.Router();

// 1. Get all posts
router.get('/', postController.getPosts);

// 2. Get posts by category
router.get('/category/:category', postController.getPostsByCategory);

// 3. Get post by id
router.get('/:id', postController.getPostById);

// 4. Create post
router.post('/', postController.createPost);

// 5. Create post comment
router.post('/:id/comments', postController.createPostComment);

// 6. Update post
router.patch('/:id', postController.updatePost);

// 7. Delete post
router.delete('/:id', postController.deletePost);

export default router;
