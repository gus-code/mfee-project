import { CuratedPost, Post } from '../types/types';
import PostDocument from '../schemas/post';
import CommentDocument from '../schemas/comment';
import mongoose from 'mongoose';

//Initialize the database records so we can test
export const initMongoRecords = async () => {
  await mongoose.connection.db.dropCollection('posts');
  await mongoose.connection.db.dropCollection('categories');
  await mongoose.connection.db.dropCollection('comments');
};

// 1. Get all posts
const getAllPosts = async () => {
  const posts = await PostDocument.find({}).populate(['comments', 'category']).sort({ createdAt: -1 });
  return posts;
};

// 2. Get posts by category
const getPostsByCategory = async (categoryId: string) => {
  const postsByCategory = await PostDocument.find({ category: categoryId }).populate(['comments', 'category']).sort({ createdAt: -1 });
  return postsByCategory;
};

// 3. Get post by id
const getPostById = async (id: string) => {
  const [post] = await PostDocument.find({ _id: id }).populate(['comments', 'category']);
  return post;
};

// 4. Create post
const createPost = async (data: CuratedPost) => {
  // https://stackoverflow.com/questions/71185664/why-does-zod-make-all-my-schema-fields-optional
  // Zod make all my schema fields optional
  const newPost = {
    comments: [],
    ...data
  };
  const createdPost = await PostDocument.create(newPost);
  return createdPost;
};

// 5. Create post comment
const createPostComment = async (postId: string, comment: { author: string; content: string }) => {
  const newComment = {
    ...comment
  };

  const foundPost = await PostDocument.findById(postId);
  if (!foundPost) {
    throw new Error('Post not found');
  }
  const createdComment = await CommentDocument.create(newComment);

  if (!createdComment) {
    throw new Error('Comment not created');
  }

  await PostDocument.updateOne({ _id: postId }, { $push: { comments: createdComment._id } }, { new: true });
  return newComment;
};

// 6. Update post
const updatePost = async (postId: string, data: Partial<Post>) => {
  const updatedPost = await PostDocument.findOneAndUpdate({ _id: postId }, data, { new: true });
  return updatedPost;
};

// 7. Delete post
const deletePost = async (postId: string) => {
  const deletedPost = await PostDocument.findOneAndDelete({ _id: postId });
  const deletedComment = await CommentDocument.findOneAndDelete({ _id: postId });
  return { deletedComments: deletedComment, deletedPost: deletedPost };
};

export default {
  getAllPosts,
  getPostsByCategory,
  getPostById,
  createPost,
  createPostComment,
  updatePost,
  deletePost
};
