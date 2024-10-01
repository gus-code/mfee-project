import express from 'express';
import postController from '../controllers/post';

const router = express.Router();

// Get all posts
router.get('/', postController.getPosts);

//Get post by id
router.get('/:id', postController.getPostById);

//Get post by category
router.get('/category/:category', postController.getPostsByCategory);

//Create post
router.post('/', postController.createPost);

//Create comment
router.post('/:id/comments', postController.createPostComment);

//Update post
router.patch('/:id', postController.updatePost);

//Delete post
router.delete('/:id', postController.deletePost);

export default router;
