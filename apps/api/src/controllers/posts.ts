import Post from '../models/post';

type Post = { title: string; description: string; category: string | object; image?: string; comments?: string[] };

const POST_NO_FOUND = 'Post not found';
const INVALID_POST = 'Invalid post missing requirement (title / description / category)';
const INVALID_COMMENT = 'Invalid comment missing content';

// - `GET /posts` Return an array of all the posts with status code 200
const getAllPosts = async (req, res) => {
  try {
    const categories = await Post.find({});
    res.status(200).json(categories);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

// - `GET /posts/category/:category` Return an array of all the posts by category with status code 200
const getPostByCategory = async (req, res) => {
  try {
    const postsByCategory = await Post.find({ category: req.params.category }).populate('category');
    res.status(200).json(postsByCategory);
  } catch (error) {
    res.status(404).json({ message: 'No Post found by the selected category' });
  }
};
// - `GET /posts/:id` Return a post by id with category object and each comment object in the array with status code 200
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const postById = await Post.findById(id).populate('category');
    res.status(200).json(postById);
  } catch (error) {
    return res.status(404).json({ message: POST_NO_FOUND });
  }
};
// - `POST /posts` Create a new post and return the created post with status code 201
const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// - `POST /posts/:id/comments` Create a comment inside the post and return the comment with status code 201
const addPostComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author } = req.body;
    const isContentValid = content?.trim()?.length > 0;
    if (!isContentValid) {
      return res.status(400).json({ message: INVALID_COMMENT });
    }
    const commentId = Date.now().toString();
    const commentObj = { id: commentId, content, author: author ?? 'anonymous' };
    await Post.findOneAndUpdate({ _id: id }, { $push: { comments: commentObj } }, { new: true });
    res.status(201).json(commentObj);
  } catch (error) {
    return res.status(404).json({ message: INVALID_COMMENT });
  }
};

// - `PATCH /posts/:id` Update post information and return the updated post with status code 200
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(400).json({ message: INVALID_POST });
  }
};

// - `DELETE /posts/:id` Delete the post and return the deleted post with status code 200 or 204 if you decide to not return anything
// * *Add 404 validation where needed*

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findOneAndDelete(id);
    res.status(204).json(deletedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  getAllPosts,
  getPostByCategory,
  getPostById,
  createPost,
  addPostComment,
  updatePost,
  deletePost
};
