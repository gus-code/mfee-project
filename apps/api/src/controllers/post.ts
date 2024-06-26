import Post from '../models/post';
import Comment from '../models/comment';

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('category').exec();
    res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const getPostsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const posts = await Post.find({ category }).populate('category').exec();
    res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('category').populate('comments').exec();
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const createPostComment = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
    const newComment = await Comment.create(req.body);
    post.comments.push(newComment._id);
    await post.save();
    res.status(201).json(newComment);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
    res.status(204).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

export default {
  getPosts,
  getPostsByCategory,
  getPostById,
  createPost,
  createPostComment,
  updatePost,
  deletePost
};