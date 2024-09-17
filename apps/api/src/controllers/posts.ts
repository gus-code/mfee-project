import Post from '../models/post';
import Comment from '../models/comment';

// GET /posts Return an array of all the posts with status code 200
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    //handling error middleware - errorHandler
    next(error);
  }
};

//   POST /posts Create a new post and return the created post with status code 201
const createPosts = async (req, res, next) => {
  // Retrieve the values from the request body
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// GET /posts/:id Return a post by id with category object and each comment object in the array with status code 200
const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('comments').populate('category');

    return res.status(200).json(post);
  } catch (error) {
    //handling error middleware - errorHandler
    next(error);
  }
};

//GET /posts/category/:category Return an array of all the posts by category with status code 200
const getPostsByCategory = async (req, res, next) => {
  const { category } = req.params;
  try {
    const posts = (await Post.findOne({ category })) ?? [];

    res.status(200).json(posts);
  } catch (error) {
    //handling error middleware - errorHandler
    next(error);
  }
};

// POST /posts/:id/comments Create a comment inside the post and return the comment with status code 201
const createPostComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comments = await Comment.create({
      author: req.body.author,
      content: req.body.content
    });

    //populate function on getPostById need the reference id from the comments
    const posts = await Post.findById(id);
    await Post.findByIdAndUpdate(id, { comments: [...posts.comments, comments._id] });

    // Return all the posts with that category with a 200 status code
    res.status(201).json(comments);
  } catch (error) {
    //handling error middleware - errorHandler
    next(error);
  }
};

//PATCH /posts/:id Update post information and return the updated post with status code 200
const updatePost = async (req, res, next) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(post);
  } catch (error) {
    //handling error middleware - errorHandler
    next(error);
  }
};

// DELETE /posts/:id Delete the post and return the deleted post with status code 200 or 204
const deletePost = async (req, res, next) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  try {
    //Remove post comments from database when you delete the post
    const posts = await Post.findById(id);
    await Comment.deleteMany({ _id: { $in: posts.comments } });
    //Remove post
    const post = await Post.findByIdAndDelete(id);
    res.status(204).json(post);
  } catch (error) {
    //handling error middleware - errorHandler
    next(error);
  }
};

export default {
  getPosts,
  createPosts,
  getPostById,
  getPostsByCategory,
  createPostComment,
  updatePost,
  deletePost
};
