import express from 'express';

import postController from '../controllers/post';

const router = express.Router();

// GET /posts Return an array of all the posts with status code 200
router.get('/',postController.getPosts )

// GET /posts/category/:category Return an array of all the posts by category with status code 200
router.get('/category/:category',postController.getPostsByCategory )

// GET /posts/:id Return a post by id with category object and each comment object in the array with status code 200
router.get('/:id',postController.getPostById )

// POST /posts Create a new post and return the created post with status code 201
router.post('/',postController.createPost )

// POST /posts/:id/comments Create a comment inside the post and return the comment with status code 201
router.post('/:id/comments',postController.createComment )

// PATCH /posts/:id Update post information and return the updated post with status code 200
router.patch('/:id',postController.updatePost )

// DELETE /posts/:id Delete the post and return the deleted post with status code 200 or 204 if you decide to not return anything
router.delete('/:id',postController.deletePost )

export default router;