import express from 'express';

import postsController from '../controllers/posts';

const router = express.Router();

router.get('/', postsController.getAllPosts);

router.get('/category/:category', postsController.getPostByCategory);

router.get('/:id', postsController.getPostById);

router.post('/', postsController.createPost);

router.post('/:id/comments', postsController.addPostComment);

router.patch('/:id', postsController.updatePost);

router.delete('/:id', postsController.deletePost);

export default router;
