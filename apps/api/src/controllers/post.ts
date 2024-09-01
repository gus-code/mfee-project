import Post from '../models/post';
import Comment from '../models/comment';

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Get post by category
const getPostByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const posts = await Post.find({ category });

    if (!posts) {
      return res.status(404).json({ message: 'No posts found for this category' });
    }

    res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// // Get post by id
const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('comments');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// // Create post
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// Crear un comentario y agregarlo al post
const createPostComment = async (req, res) => {
  const postId = req.params.id;
  const { author, content } = req.body;

  try {
    const newComment = new Comment({ author, content });
    await newComment.save();

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push(newComment._id);
    await post.save();

    const populatedComment = await Comment.findById(newComment._id);

    if (!populatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(201).json(populatedComment);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// // Update post
const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// // Delete post
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Comment.deleteMany({ _id: { $in: post.comments } });

    await Post.findByIdAndDelete(id);

    res.status(204).json({ message: 'Post and related comments deleted successfully' });
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

export default {
  getAllPosts,
  getPostByCategory,
  getPostById,
  createPost,
  createPostComment,
  updatePost,
  deletePost
};
