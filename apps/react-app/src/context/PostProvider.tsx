import React, {
  createContext,
  useCallback
} from 'react';

// import { SnackbarContext } from "../context";
import { createPost, deletePost, updatePost } from '../api';
import { CreatePostPayload, UpdatePostPayload } from '../types';
import { useQueryClient } from '@tanstack/react-query';

interface PostContextProps {
  addPost: (newPost: CreatePostPayload) => Promise<void>;
  removePost: ({ postID, selectedCategoryID }: { postID: string; selectedCategoryID?: string }) => Promise<void>;
  updatePostData: ({ payload, selectedCategoryID }: { payload: UpdatePostPayload; selectedCategoryID?: string }) => Promise<void>;
}

interface PostProviderProps {
  children: React.JSX.Element;
}

export const PostContext = createContext<PostContextProps>({
  addPost: async () => {},
  removePost: async () => {},
  updatePostData: async () => {}
});

export function PostProvider({ children }: PostProviderProps): React.JSX.Element {
  // const createAlert = useContext(SnackbarContext);
  const queryClient = useQueryClient();

  const onLoading = (_isLoading: boolean) => {
    return;
  };

  const onError = useCallback(() => {
    // createAlert({
    //   message: "Something went wrong.",
    //   severity: "error",
    // });
  }, []);

  const addPost = useCallback(
    async (newPost: CreatePostPayload) => {
      await createPost(newPost);
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    [queryClient]
  );

  const updatePostData = useCallback(
    async ({ payload }: { payload: UpdatePostPayload; selectedCategoryID?: string }) => {
      const onSuccess = async () => {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
        // createAlert({
        //   message: "Post successfully updated.",
        //   severity: "success",
        // });
      };

      await updatePost({ payload: payload, onSuccess, onError, onLoading });
    },
    [onError, queryClient]
  );

  const removePost = useCallback(
    async ({ postID }: { postID: string; selectedCategoryID?: string }) => {
      const onSuccess = async () => {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
        // createAlert({
        //   message: "Post successfully deleted.",
        //   severity: "success",
        // });
      };

      await deletePost({ postID, onSuccess, onError });
    },
    [onError, queryClient]
  );

  return (
    <PostContext.Provider
      value={{
        addPost,
        removePost,
        updatePostData
      }}
    >
      {children}
    </PostContext.Provider>
  );
}