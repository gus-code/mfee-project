import { RequestHandler } from 'express';
import Post from '../models/posts';
import Comment from '../models/comment';

// Get all posts
const getAllPosts: RequestHandler = async (req, res) => {
  // Return all the posts with a 200 status code
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

// Get post by category
const getPostByCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const posts = await Post.find({ category: categoryId });
    return res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

// Get post by id
const getPostById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    return res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

// Create post
const createPost: RequestHandler = async (req, res) => {
  const postData = req.body;
  try {
    const newPost = await Post.create(postData);
    return res.status(201).json(newPost);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

// Create comments
const createComments: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const commentData = req.body;
  try {
    const post = await Post.findById(id);
    const comment = await Comment.create(commentData);
    post.comments.push(comment._id);
    await post.save();
    return res.status(201).json(comment);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

// Update posts by id
const updatePostById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const newPostData = req.body;
  try {
    const modifiedPost = await Post.findByIdAndUpdate(id, newPostData, { new: true, runValidators: true });
    return res.status(200).json(modifiedPost);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

// Delete post by id
const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id, {});
    await Comment.deleteMany({ _id: { $in: deletedPost.comments } });
    return res.status(200).json(deletedPost);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

export default {
  getAllPosts,
  getPostByCategory,
  getPostById,
  createPost,
  createComments,
  updatePostById,
  deletePost
};
