import Post from '../interfaces/post';
import PostModel from '../models/post';
('../interfaces/post');
import { PostsConstants } from '../constants/Post/constants';

const { MISSING_REQUEST_ATTRIBUTES, POST_NOT_FOUND, POST_BY_CATEGORY_NOT_FOUND } = PostsConstants;
const posts = [];

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ response: 'There was an internal server error. Call an ambulance.' });
  }
};

const getPostByCategory = async (req, res) => {
  try {
    const postsCategory = await PostModel.find({ category: req.params.category }).populate('category');
    res.status(200).json(postsCategory);
  } catch (error) {
    res.status(404).json({ message: 'There are no posts for this category, try with other one.' });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const postById = await PostModel.findById(id).populate('category');
    res.status(200).json(postById);
  } catch (error) {
    return res.status(404).json({ message: POST_NOT_FOUND });
  }
};

// const validatePost = (postObj: Post) => {
//   const { title, description, categoryID, img } = postObj;
//   const isTitleValid = title?.trim()?.length > 0;
//   const isDescValid = description?.trim()?.length > 0;
//   const isCategoryValid = categoryID > 0 && categoryID;
//   const isImgValid = img?.trim()?.length > 0;

//   return isTitleValid && isDescValid && isCategoryValid && isImgValid;
// };

const createPost = async (post: Post, res, req) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.status(200).json(newPost);
  } catch (error) {
    return res.status(400).json({ message: 'The post were not created. Try again' });
  }
};

const updatePost = async (updates: Post, res, req) => {
  try {
    const { id } = req.params;
    const updatedPost = await PostModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(400).json({ message: 'The post were not updated' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await PostModel.findOneAndDelete(id);
    res.status(204).json(deletedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addPostComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author } = req.body;
    const isContentValid = content?.trim()?.length > 0;
    if (!isContentValid) {
      return res.status(400).json({ message: 'The content is invalid.' });
    }
    const commentId = Date.now().toString();
    const commentObj = { id: commentId, content, author: author ?? 'anonymous' };
    await PostModel.findOneAndUpdate({ _id: id }, { $push: { comments: commentObj } }, { new: true });
    res.status(201).json(commentObj);
  } catch (error) {
    return res.status(404).json({ message: 'Not found.' });
  }
};

export default {
  getPosts,
  getPostByCategory,
  getPostById,
  createPost,
  addPostComment,
  updatePost,
  deletePost
};
