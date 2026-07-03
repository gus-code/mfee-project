import { AxiosError, AxiosResponse } from 'axios';

import { CreateCommentPayload, CreatePostPayload, Post, UpdatePostPayload } from '../../types';
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

export const updatePost = async ({
  payload,
  onSuccess,
  onError,
  onLoading,
}: {
  payload: UpdatePostPayload;
  onSuccess?: (data: Post) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  const { id, ...updatedFields } = payload;

  await api
    .patch(`/posts/${id}`, updatedFields)
    .then((response: AxiosResponse) => {
      const data: Post = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(error);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const deletePost = async ({
  postID,
  onSuccess,
  onError,
}: {
  postID: string;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}) => {
  await api
    .delete(`/posts/${postID}`)
    .then((response: AxiosResponse) => {
      if (response.status === 204 && onSuccess) onSuccess();
    })
    .catch((error: AxiosError) => {
      console.error(error);
      onError && onError(error);
    });
};