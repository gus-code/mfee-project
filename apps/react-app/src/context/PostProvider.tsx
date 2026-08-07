import React, { createContext, useCallback } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import {
  createPost,
  updatePost,
  deletePost,
} from "../api";

import {
  CreatePostPayload,
  UpdatePostPayload,
} from "../types";

interface PostContextProps {
  addPost: (newPost: CreatePostPayload) => void;
  removePost: (postID: string) => void;
  updatePostData: (payload: UpdatePostPayload) => void;
}

export const PostContext = createContext<PostContextProps>({
  addPost: () => {},
  removePost: () => {},
  updatePostData: () => {},
});

export function PostProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const addPost = useCallback((newPost: CreatePostPayload) => {
    createMutation.mutate(newPost);
  }, [createMutation]);

  const updatePostData = useCallback((payload: UpdatePostPayload) => {
    updateMutation.mutate(payload);
  }, [updateMutation]);

  const removePost = useCallback((postID: string) => {
    deleteMutation.mutate(postID);
  }, [deleteMutation]);

  return (
    <PostContext.Provider
      value={{
        addPost,
        removePost,
        updatePostData,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}