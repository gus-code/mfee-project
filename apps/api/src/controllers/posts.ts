import Post from '../models/post';
import Comment from '../models/comment';

const posts = [];

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Get posts by id
const getPost = async (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;

  try {
    // Check if we have a post with that id
    const post = await Post.findById(id);

    if (!post) {
      // If we don't find the post return a 404 status code with a message
      return res.status(404).json({ message: 'Post not found!' });
    }
    // Return the post with a 200 status code
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Get post by category
const getPostsByCategory = async (req, res) => {
  // Retrieve the id from the route params
  const { category, id } = req.params;
  try {
    const postFound = await Post.findOne(category);

    if (!postFound) {
      // If we don't find the post return a 404 status code with a message
      return res.status(404).json({ message: 'Post by Category not found' });
      // Note: Remember that json method doesn't interrupt the workflow
      // therefore is important to add a "return" to break the process
    }

    // Return the post with a 200 status code
    res.status(200).json(postFound);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Create post
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    // Return the created post with a 201 status code
    res.status(201).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Create comment
export const createComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await new Comment(req.body).save();

    await Post.findByIdAndUpdate(id, { $push: { comments: comment._id } });
    res.status(201).json(comment);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Update post
const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });

    if (!id) {
      return res.status(400).json({ message: 'Post not found to make comments.' });
    }
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Delete post
const deletePost = async (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

export default {
  getPosts,
  getPostsByCategory,
  getPost,
  createPost,
  createComment,
  updatePost,
  deletePost
};
