import mongoose from 'mongoose';
import Post from '../models/post';
import Comment from '../models/comment';

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(['category', 'comments']).exec();
    // Return an array of all the posts with status code 200
    res.status(200).json(posts);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getPostsByCategoryId = async (req, res) => {
  const { category } = req.params;
  try {
    if (!isaValidMongooId(category)) res.status(404).json({ message: 'Invalid ID' });

    const posts = await Post.find({ category: category });

    // Return an array of all the posts by category with status code 200
    res.status(200).json(posts);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isaValidMongooId(id)) res.status(404).json({ message: 'Invalid ID' });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    // Return a post by id with category object and each comment object
    // in the array with status code 200
    res.status(200).json(post);
  } catch (error) {
    errorHandler(error, res);
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    // Create a new post and return the created post with status code 201
    return res.status(201).json(post);
  } catch (error) {
    errorHandler(error, res);
  }
};

const addComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.create(req.body);

    const post = await Post.findByIdAndUpdate(
      id,
      {
        $push: { comments: comment.id }
      },
      { new: true }
    );

    // Create a comment inside the post and return the comment with status code 201
    return res.status(201).json({
      comment,
      post
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePostTitle = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        title: req.body.title
      },
      { new: true }
    );
    //   // Update post information and return the updated post with status code 200
    return res.status(200).json(post);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isaValidMongooId(id)) return res.status(401).json({ message: 'Invalid ID' });

    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    await Post.findByIdAndDelete(id);

    await Comment.deleteMany({ _id: { $in: post.comments }})

    // Delete the post and return the deleted post with status code 200 or 204
    // if you decide to not return anything
    res.status(200).send(post);
  } catch (error) {
    errorHandler(error, res);
  }
};

// * *Add 404 validation where needed*

const errorHandler = (error, response) => {
  const { message } = error;
  response.status(500).json({ message });
};

const isaValidMongooId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export default {
  getPosts,
  getPostsByCategoryId,
  getPostById,
  createPost,
  addComment,
  updatePostTitle,
  deletePost
};
