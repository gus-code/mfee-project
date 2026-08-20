import express from 'express';
import postController from '../controllers/posts';
const router = express.Router();

//get all the posts
router.get('/', postController.getPosts);

//return posts by category
router.get('/category/:category', postController.getPostsByCategory);

//retur a post by its id
router.get('/:id', postController.getPostById);

//creat a new post
router.post('/', postController.createPost);

//create a comment for a post
router.post('/:id/comments', postController.createComment);

//update post information
router.patch('/:id', postController.updatePost);

//delete a post by its id
router.delete('/:id', postController.deletePost);

export default router;