import {Post}  from "../models/post";
import {Comment} from "../models/post";


//return all the posts
const getPosts =  async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    const {message} = error;
    res.status(500).json({message});
  }
};

//get posts by category
const getPostsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
      const post = await Post.findById(category);
      if (!post) {
        return res.status(404).json({message: 'Posts with this category not found'});
      }
      res.status(200).json(post);
    } catch (error){
      const { message } = error;
      res.status(500).json({ message });      
    }
};

//get a post by its category
const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({message: 'Posts with this category not found'});
      }
      res.status(200).json(post);
    } catch (error){
      const { message } = error;
      res.status(500).json({ message });      
    }
};

//creat a new post
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error){
    const {message} = error;
    res.status(500).json({ message });  }
};

//create a comment for a post
const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    const {message} = error;
    res.status(500).json({ message });  }
};

//update post information
const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {new: true});
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const {message}=error;
    res.status(500).json({message});
  }
};

//delete a post by its id
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error){
    const { message } = error;
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