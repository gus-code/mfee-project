import { Request, Response } from 'express';
import { validateComment, validatePartialPost, validatePost } from '../helpers/validators';
import postModel from '../models/posts';
import { asyncErrorHandler } from '../helpers/controllerErrorHandler';

// 1. Get all posts
const getPosts = asyncErrorHandler(async (req: Request, res: Response) => {
  const posts = await postModel.getAllPosts();
  res.status(200).json(posts);
});

// 2. Get posts by category
const getPostsByCategory = asyncErrorHandler(async (req: Request, res: Response) => {
  const { category } = req.params;

  console.log('category', category);
  const posts = await postModel.getPostsByCategory(category);
  res.status(200).json(posts);
});

// 3. Get post by id
const getPostById = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await postModel.getPostById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post);
});

// 4. Create post
const createPost = asyncErrorHandler(async (req: Request, res: Response) => {
  const validationResult = validatePost(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: JSON.parse(validationResult.error.message) });
  }
  const newPost = await postModel.createPost(validationResult.data);
  res.status(201).json(newPost);
});

// 5. Create post comment
const createPostComment = asyncErrorHandler(async (req: Request, res: Response) => {
  const validationResult = validateComment(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: JSON.parse(validationResult.error.message) });
  }
  const { id } = req.params;
  const newComment = await postModel.createPostComment(id, validationResult.data);
  res.status(201).json(newComment);
});

// 6. Update post
const updatePost = asyncErrorHandler(async (req: Request, res: Response) => {
  const validationResult = validatePartialPost(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: JSON.parse(validationResult.error.message) });
  }
  const { id } = req.params;
  const updatedPost = await postModel.updatePost(id, validationResult.data);
  res.status(200).json(updatedPost);
});

// 7. Delete post
const deletePost = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await postModel.deletePost(id);
  res.status(204).send({ message: `Post deleted successfully` });
});

export default {
  getPosts,
  getPostsByCategory,
  getPostById,
  createPost,
  createPostComment,
  updatePost,
  deletePost
};
