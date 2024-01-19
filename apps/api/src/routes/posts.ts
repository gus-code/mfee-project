import { Router } from 'express';
import { createComment, createPost, deletePost, getPost, getPosts, getPostsByCategory, patchPost } from '../controllers/posts';

const router = Router();

// Get all posts
router.get('/', getPosts);

// Create a new post
router.post('/', createPost);

// get a post by ID
router.get('/:id', getPost);

// delete a post by ID
router.delete('/:id', deletePost);

// modify a post by ID
router.patch('/:id', patchPost);

// get all the posts of a category ID
router.get('/category/:category', getPostsByCategory);

// create a comment of a post of a certain ID
router.post('/:id/comments', createComment);

export default router;
