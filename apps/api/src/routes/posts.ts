import express from 'express';
import postController from '../controllers/post'

const router = express.Router();

// get all posts
router.get('/', postController.getPosts );

// Get post by id
router.get('/:id', postController.getPostById);

// Get posts by category
router.get('/category/:category', postController.getPostsByCategory );

//create post 
router.post('/', postController.createPost );

//create post comment
router.post('/:id/comments', postController.createComment );

//delete post
router.delete('/:id', postController.deletePost);

//update post
router.patch('/:id', postController.updatePost );


export default router;