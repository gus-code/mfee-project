import { RequestHandler } from 'express';
import { Post, Comment } from '../models/posts';
import { v4 as uuid } from 'uuid';

const posts: Post[] = [];

/**
 * Finds a post index by its ID.
 */
const findPostIndex = (id: string) => posts.findIndex((post) => post.id === id);

/**
 * Checks if a post has all the required fields.
 */
const postCheck = (post: Partial<Post>): { isMissingFields: boolean; missingFields: string } => {
  const missingFieldsArray = [];
  if (!post.title) {
    missingFieldsArray.push('Title');
  }
  if (!post.image) {
    missingFieldsArray.push('Image');
  }
  if (!post.description) {
    missingFieldsArray.push('Description');
  }
  if (!post.category) {
    missingFieldsArray.push('Category');
  }
  const missingFields = missingFieldsArray.reduce((prev, curr) => (prev ? `${prev}, ${curr}` : `${curr}`), '');
  return { isMissingFields: !!missingFieldsArray.length, missingFields };
};

/**
Deletes a post with the specified ID.
*/
const removePost = (id: string): Post | undefined => {
  const postIndex = findPostIndex(id);
  if (postIndex === -1) {
    return undefined;
  }
  const deletedPost = posts.splice(postIndex, 1);
  return deletedPost[0];
};

/**
 * Modifies a post with the given ID using the provided new post data.
 */
const modifyPost = (id: string, newPost: Partial<Post>): Post | undefined => {
  const postIndex = findPostIndex(id);
  if (postIndex === -1) {
    return undefined;
  }
  posts[postIndex] = {
    ...posts[postIndex],
    title: newPost?.title || posts[postIndex].title,
    description: newPost?.description || posts[postIndex].description,
    category: newPost?.category || posts[postIndex].category,
    image: newPost?.image || posts[postIndex].image
  };
  return posts[postIndex];
};

/**
Finds posts by category ID.
*/
const findPostsByCategory = (categoryId: string): Post[] => posts.filter((post) => post.category === categoryId);

/**
 * Checks if a comment has all the required fields.
 */
const commentCheck = (comment: Partial<Comment>): { isMissingFields: boolean; missingFields: string } => {
  const missingFieldsArray = [];
  if (!comment.author) {
    missingFieldsArray.push('Author');
  }
  if (!comment.content) {
    missingFieldsArray.push('Content');
  }
  const missingFields = missingFieldsArray.reduce((prev, curr) => (prev ? `${prev}, ${curr}` : `${curr}`), '');
  return { isMissingFields: !!missingFieldsArray.length, missingFields };
};

/**
 * Adds a comment to a post.
 */
const addComment = (postIndex: number, comment: Partial<Comment>) => {
  const newComment: Comment = {
    id: uuid(),
    author: comment.author,
    content: comment.content
  };
  posts[postIndex].comments.push(newComment);
  return newComment;
};

export const getPosts: RequestHandler = (_req, res) => {
  return res.status(200).json(posts);
};

export const createPost: RequestHandler = (req, res) => {
  const postData = req.body as Partial<Post>;
  const fieldsCheck = postCheck(postData);
  if (fieldsCheck.isMissingFields) {
    return res.status(400).json({ message: `missing fields: ${fieldsCheck.missingFields}` });
  }
  const newPost: Post = {
    id: uuid(),
    title: postData.title,
    category: postData.category,
    description: postData.description,
    image: postData.image,
    comments: []
  };
  posts.push(newPost);
  return res.status(201).json(newPost);
};

export const getPost: RequestHandler = (req, res) => {
  const { id } = req.params;
  const postIndex = findPostIndex(id);
  if (postIndex === -1) {
    return res.status(404).json({ message: 'post not found' });
  }
  return res.status(200).json(posts[postIndex]);
};

export const deletePost: RequestHandler = (req, res) => {
  const { id } = req.params;
  const post = removePost(id);
  if (!post) {
    return res.status(404).json({ message: 'post not found' });
  }
  return res.status(200).json(post);
};

export const patchPost: RequestHandler = (req, res) => {
  const { id } = req.params;
  const newPostData = req.body;
  const modifiedPost = modifyPost(id, newPostData);
  if (!modifiedPost) {
    return res.status(404).json({ message: 'post not found' });
  }
  return res.status(200).json(modifiedPost);
};

export const getPostsByCategory: RequestHandler = (req, res) => {
  const { category } = req.params;
  const relatedPosts = findPostsByCategory(category);
  if (!relatedPosts.length) {
    return res.status(404).json({ message: 'no posts found' });
  }
  return res.status(200).json(relatedPosts);
};

export const createComment: RequestHandler = (req, res) => {
  const { id } = req.params;
  const commentData = req.body;
  const fieldsCheck = commentCheck(commentData);
  if (fieldsCheck.isMissingFields) {
    return res.status(400).json({ message: `missing fields: ${fieldsCheck.missingFields}` });
  }
  const postIndex = findPostIndex(id);
  if (postIndex === -1) {
    return res.status(404).json({ message: `no posts found` });
  }
  const comment = addComment(postIndex, commentData);
  return res.status(201).json(comment);
};