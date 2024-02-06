import Post from '../interfaces/post';
('../interfaces/post');
import { PostsConstants } from '../constants/Post/constants';

const { MISSING_REQUEST_ATTRIBUTES, POST_NOT_FOUND, POST_BY_CATEGORY_NOT_FOUND } = PostsConstants;
const posts = [];

const getPosts = (req, res) => {
  posts.length > 0 && res.status(200).json(posts);
};

const getPostByCategory = (req, res) => {
  const { categoryID } = req.params;
  const postsReceivedByCategory = posts.filter((post) => post.category === categoryID);
  !postsReceivedByCategory ? res.status(404).json({ message: POST_BY_CATEGORY_NOT_FOUND }) : res.status(200).json(postsReceivedByCategory);
};

const getPostById = (req, res) => {
  const { postID } = req.params;
  const postReceivedById = posts.find((post) => post.id === postID);
  !postReceivedById ? res.status(404).json({ message: POST_NOT_FOUND }) : res.status(200).json(postReceivedById);
};

const validatePost = (postObj: Post) => {
  const { title, description, categoryID, img } = postObj;
  const isTitleValid = title?.trim()?.length > 0;
  const isDescValid = description?.trim()?.length > 0;
  const isCategoryValid = categoryID > 0 && categoryID;
  const isImgValid = img?.trim()?.length > 0;

  return isTitleValid && isDescValid && isCategoryValid && isImgValid;
};

const createPost = (post: Post, res, req) => {
  if (validatePost(post)) {
    const { title, description, categoryID, img, comments } = post;

    const categoryOfPost = {
      id: categoryID,
      name: 'This is a new category!!!'
    };

    const newPost = {
      id: Date.now().toString(),
      title,
      category: categoryOfPost,
      description,
      img: img && img,
      comments: comments?.length > 0 ? comments : []
    };

    posts.push(newPost);
    res.status(201).json(newPost);
  } else {
    return res.status(400).json({ message: MISSING_REQUEST_ATTRIBUTES });
  }
};

const updatePost = (updates: Post, res, req) => {
  const { id } = req.params;
  const { title, img, categoryName, description } = updates;
  const postIndex = posts?.length > 0 && posts.findIndex((item) => item.id === id);

  postIndex < 0 && res.status(404).json({ message: POST_NOT_FOUND });
  const post = { ...posts[postIndex] };

  post.title = title && title;
  post.img = img && img;
  post.description = description && description;
  post.category.name = categoryName && categoryName;

  posts[postIndex] = post;

  res.status(200).json(post);
};

const deletePost = (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((item) => item.id === id);
  if (postIndex < 0) {
    return res.status(404).json({ message: POST_NOT_FOUND });
  }
  posts.splice(postIndex, 1);
  res.status(204).send();
};

const addPostComment = (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body.conent;
  const isContentValid = content?.trim()?.length > 0;
  const postIndex = posts.findIndex((item) => item.id === id);

  const newComment = {
    id: Date.now().toString(),
    author: author ?? 'anonymous',
    content: content
  };

  if (postIndex < 0) {
    return res.status(404).json({ message: POST_NOT_FOUND });
  } else if (!isContentValid) {
    return res.status(400);
  }

  const updatedPost = { ...posts[postIndex] };
  updatedPost.comments.push(newComment);
  posts[postIndex] = updatedPost;
  res.status(201).json(newComment);
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
