import React, { createContext, useState, useCallback, useContext } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

import axios from '../api/axios';
import { Post } from '../types';
import { SnackbarContext } from './SnackbarProvider';

interface PostContextProps {
  post: Post | null;
  posts: Post[] | null;
  getPost: (id: string) => void;
  getPosts: (category: string) => void;
  deletePost: (postId: string) => void;
}

interface PostProviderProps {
  children: React.JSX.Element;
}

export const PostContext = createContext<PostContextProps>({
  post: null,
  posts: [] || null,
  getPost: () => {},
  getPosts: () => {},
  deletePost: () => {}
});

export function PostProvider({ children }: PostProviderProps): React.JSX.Element {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const { createAlert } = useContext(SnackbarContext);

  const getPost = useCallback((id: string) => {
    axios({
      method: 'get',
      url: `/${id}`,
      signal: AbortSignal.timeout(5000)
    })
      .then((response: AxiosResponse) => {
        setPost(response.data);
      })
      .catch((error: AxiosError) => {
        createAlert('error', 'Something went wrong!');
        console.error(`${error}`);
      });
  }, []);

  const getPosts = useCallback((category: string) => {
    axios({
      method: 'get',
      signal: AbortSignal.timeout(5000)
    })
      .then((response: AxiosResponse) => {
        const selectedCategory = response.data.filter((post: Post) => post.category === category);
        const newPosts = category === 'All' ? response.data : selectedCategory;
        setPosts(newPosts);
      })
      .catch((error: AxiosError) => {
        createAlert('error', 'Something went wrong!');
        console.error(`${error}`);
      });
  }, []);

  const deletePost = useCallback(
    (postId: string) => {
      axios({
        method: 'delete',
        url: `/${postId}`,
        signal: AbortSignal.timeout(5000)
      })
        .then((response: AxiosResponse) => {
          if (response.status === 200 || response.status === 201) {
            getPosts('All');
            createAlert('success', 'Post deleted successfully!');
          }
        })
        .catch((error: AxiosError) => {
          createAlert('error', 'Something went wrong!');
          console.error(`${error}`);
        });
    },
    [getPosts]
  );

  return (
    <PostContext.Provider
      value={{
        post,
        posts,
        getPost,
        getPosts,
        deletePost
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
