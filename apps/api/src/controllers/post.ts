import {Comment} from '../models/post'
import {Post} from '../models/post'

// GET /posts Return an array of all the posts with status code 200
const getPosts = async (req, res, next) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(e) {
        next(e)
        //const { message } = e;
        //res.status(500).json({ message });
    }
};

// GET /posts/category/:category Return an array of all the posts by category with status code 200
const getPostsByCategory = async (req, res) => {
  const { category } = req.params;
  try{
    const post = await Post.find({ category });
    res.status(200).json(post);
  } catch(e) {
        const { message } = e;
        res.status(500).json({ message });
  }
};

// GET /posts/:id Return a post by id with category object and each comment object in the array with status code 200
const getPostById = async (req, res) => {
  const { id } = req.params;
  try{
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch(e) {
        const { message } = e;
        res.status(500).json({ message });
  }
};

// POST /posts Create a new post and return the created post with status code 201
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (e) {
    const { message } = e;
    res.status(500).json({ message });
  }
};

// POST /posts/:id/comments Create a comment inside the post and return the comment with status code 201
const createComment = async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({ message: 'Author and content are required.' });
  }

  try {
    const post = await Post.findById(id);
    if (!post){
        return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await Comment.create(req.body);
    post.comments.push(comment)
    await post.save();

    res.status(201).json(post);
  } catch (e) {
    const { message } = e;
    res.status(500).json({ message });
  }
};

// PATCH /posts/:id Update post information and return the updated post with status code 200
const updatePost = async (req, res) => {
  const { id } = req.params;

try {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json(post);
    } catch(e) {
        const { message } = e;
        res.status(500).json({ message });
    }
};

// DELETE /posts/:id Delete the post and return the deleted post with status code 200 or 204 if you decide to not return anything
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.status(204).json(post);
      } catch(e) {
          const { message } = e;
          res.status(500).json({ message });
      }
};

export default {
  getPosts,
  getPostsByCategory,
  getPostById,
  createPost,
  createComment,
  updatePost,
  deletePost
};