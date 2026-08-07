// Controller for post-related endpoints
// Handles CRUD operations and comments for posts
import { createComment } from '../models/comment';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from '../models/post';

// Get all posts
// Usage: GET /api/posts
// Returns an array of all posts
const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get post by id
// Usage: GET /api/posts/:id
// Returns a single post by its id
const getPostByIdHandler = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create post
// Usage: POST /api/posts
// Creates a new post with the provided data
const createPostHandler = async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update post
// Usage: PATCH /api/posts/:id
// Updates an existing post by id
const updatePostHandler = async (req, res) => {
  try {
    const post = await updatePost(req.params.id, req.body);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post
const deletePostHandler = async (req, res) => {
  try {
    const post = await deletePost(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get posts by category
const getPostsByCategory = async (req, res) => {
  try {
    const posts = (await getAllPosts()).filter((p) => p.category === req.params.category);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create post comment
const createPostComment = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = await createComment({ ...req.body, post_id: req.params.id });
    post.comments.push(comment);
    await updatePost(post.id, { comments: post.comments });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getPosts,
  getPostById: getPostByIdHandler,
  createPost: createPostHandler,
  updatePost: updatePostHandler,
  deletePost: deletePostHandler,
  getPostsByCategory,
  createPostComment
};
