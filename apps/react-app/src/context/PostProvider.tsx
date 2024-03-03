import React, { createContext, useState, useCallback } from "react";
import { AxiosError, AxiosResponse } from "axios";

import axios from "../api/axios";
import { Post } from "../types";

interface PostContextProps {
  posts: Post[] | null;
  getPosts: (category: string) => void;
  deletePost: (postId: string) => void;
}

interface PostProviderProps {
  children: React.JSX.Element;
}

export const PostContext = createContext<PostContextProps>({
  posts: [] || null,
  getPosts: () => {},
  deletePost: () => {},
});

export function PostProvider({
  children,
}: PostProviderProps): React.JSX.Element {
  const [posts, setPosts] = useState<Post[] | null>(null);

  const getPosts = useCallback((category: string) => {
    axios({
      method: "get",
      signal: AbortSignal.timeout(5000),
    })
      .then((response: AxiosResponse) => {
        const selectedCategory = response.data.filter(
          (post: Post) => post.category === category
        );
        const newPosts = category === "All" ? response.data : selectedCategory;
        setPosts(newPosts);
      })
      .catch((error: AxiosError) => {
        // Activity 9 - Use createAlert function to show a notification with error message
        console.error(`${error}`);
      });
  }, []);

  const deletePost = useCallback(
    (postId: string) => {
      axios({
        method: "delete",
        url: `/${postId}`,
        signal: AbortSignal.timeout(5000),
      })
        .then((response: AxiosResponse) => {
          if (response.status === 200 || response.status === 201) {
            getPosts("All");
            // Activity 9 - Use createAlert function to show a notification with success message
          }
        })
        .catch((error: AxiosError) => {
          // Activity 9 - Use createAlert function to show a notification with success message
          console.error(`${error}`);
        });
    },
    [getPosts]
  );

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
