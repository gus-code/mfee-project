import express from 'express';

import postController from '../controllers/post';

const router = express.Router();

//GET all posts
router.get('/', postController.getPosts);

//GET all posts
router.get('/category/:category', postController.getPostsByCategory);

//GET post by ID
router.get('/:id', postController.getPostById);

//POST post
router.post('/', postController.createPost);

//POST post with comment
router.post('/:id/comments', postController.createPostComment);

//PATCH post
router.patch('/:id', postController.updatePost);

//DELETE post
router.delete('/:id', postController.deletePost);

export default router;