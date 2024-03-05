import { RequestHandler } from 'express';
import Post from '../models/post';
import Comment from '../models/comment';

/**
 Get all posts 
 */
export const getPosts: RequestHandler = async (_req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

/**
 * Create a new post
 */
export const createPost: RequestHandler = async (req, res) => {
  const postData = req.body;
  try {
    const newPost = await Post.create(postData);
    return res.status(201).json(newPost);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

/**
 * Update a post
 */
export const patchPost: RequestHandler = async (req, res) => {
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

/**
 * Get a post by ID
 */
export const getPost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    return res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

/**
 * Get posts by Category ID
 */
export const getPostsByCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const posts = await Post.find({ category: categoryId });
    return res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    return res.status(500).json({ message });
  }
};

export const createComment: RequestHandler = async (req, res) => {
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

/**
 * Delete a post (and all of its commets)
 */
export const deletePost: RequestHandler = async (req, res) => {
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
