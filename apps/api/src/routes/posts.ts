import express from 'express';

import postController from '../controllers/post'
import post from '../controllers/post';

const router = express.Router();

//get all posts
router.get('/', postController.getPosts);

//get posts by category
router.get('/category/:category', postController.getPostByCategory);

// get post by id
router.get('/:id', postController.getPostById);

//create a new post
router.post('/', postController.createPost);

// create a new comment in a post
router.post('/:id/comments', postController.createComment);

// update an existing post
router.patch('/:id', postController.updatePost);

// delete an existing post
router.delete('/:id', postController.deletePost);

export default router;