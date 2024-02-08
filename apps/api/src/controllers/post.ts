import PostModel from '../models/post';
('../interfaces/post');
import { PostsConstants } from '../constants/Post/constants';

const {
  POST_NOT_FOUND,
  POST_BY_CATEGORY_NOT_FOUND,
  ERROR_CREATE_POST,
  ERROR_DELETE_POST,
  ERROR_GET_POSTS,
  INVALID_COMMENT_CONTENT,
  NOT_POST_COMMENT,
  POST_NOT_UPDATED
} = PostsConstants;

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ response: ERROR_GET_POSTS });
  }
};

const getPostByCategory = async (req, res) => {
  try {
    const postsCategory = await PostModel.find({ category: req.params.category }).populate('category');
    res.status(200).json(postsCategory);
  } catch (error) {
    res.status(404).json({ message: POST_BY_CATEGORY_NOT_FOUND });
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

//* I'm gonna save this for future projects or references.
// const validatePost = (postObj: Post) => {
//   const { title, description, categoryID, img } = postObj;
//   const isTitleValid = title?.trim()?.length > 0;
//   const isDescValid = description?.trim()?.length > 0;
//   const isCategoryValid = categoryID > 0 && categoryID;
//   const isImgValid = img?.trim()?.length > 0;

//   return isTitleValid && isDescValid && isCategoryValid && isImgValid;
// };

const createPost = async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.status(200).json(newPost);
  } catch (error) {
    return res.status(400).json({ message: ERROR_CREATE_POST });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await PostModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(400).json({ message: POST_NOT_UPDATED });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await PostModel.findOneAndDelete(id);
    res.status(204).json(deletedPost);
  } catch (error) {
    return res.status(500).json({ message: ERROR_DELETE_POST });
  }
};

const addPostComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author } = req.body;
    const isContentValid = content?.trim()?.length > 0;
    if (!isContentValid) {
      return res.status(400).json({ message: INVALID_COMMENT_CONTENT });
    }
    const commentId = Date.now().toString();
    const commentObj = { id: commentId, content, author: author ?? 'anonymous' };
    await PostModel.findOneAndUpdate({ _id: id }, { $push: { comments: commentObj } }, { new: true });
    res.status(201).json(commentObj);
  } catch (error) {
    return res.status(404).json({ message: NOT_POST_COMMENT });
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
