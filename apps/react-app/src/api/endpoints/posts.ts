

import { CreateCommentPayload, CreatePostPayload, UpdatePostPayload } from '../../types';
import api from '../axios';


export const getAllPost = async() => {
  const { data } = await api.get('/posts');
  return data;
}

export const getPostById = async( id: string) => {
  const { data } = await api.get(`/posts/${id}`)
  return data;
}

export const getPostByCategory = async( id: string ) => {
  const { data } = await api.get(`/posts/category/${id}`)
  return data;
}

export const createPost = async(post: CreatePostPayload) => {
  const { data } = await api.post('/posts', post);
  return data;
}

export const postComment = async(comment: CreateCommentPayload) => {
  const newComment = { author: comment.author, content: comment.content };
  const { data } = await api.post(`/posts/${comment.id}/comments`, newComment);
  return data;
}

export const updatePost = async (payload: UpdatePostPayload) => {
  const { id, ...updatedFields } = payload;
  const { data } = await api.patch(`/posts/${id}`, updatedFields);
  return data;
}

export const deletePost = async(id: string) => {
  const { data } = await api.delete(`/posts/${id}`);
  return data;
}
