import React, {
  createContext,
  useState,
  // useContext,
  useCallback
} from 'react';

// import { SnackbarContext } from "../context";
import { createPost, deletePost, getPosts, getPostsByCategory, updatePost } from '../api';
import { CreatePostPayload, Post, UpdatePostPayload } from '../types';

interface PostContextProps {
  posts: Post[] | null;
  loadingPosts: boolean;
  addPost: (newPost: CreatePostPayload) => void;
  removePost: ({ postID, selectedCategoryID }: { postID: string; selectedCategoryID?: string }) => void;
  getPostList: (selectedCategoryID?: string) => void;
  updatePostData: ({ payload, selectedCategoryID }: { payload: UpdatePostPayload; selectedCategoryID?: string }) => void;
}

interface PostProviderProps {
  children: React.JSX.Element;
}

export const PostContext = createContext<PostContextProps>({
  posts: null,
  loadingPosts: false,
  addPost: () => {},
  removePost: () => {},
  getPostList: () => {},
  updatePostData: () => {}
});

export function PostProvider({ children }: PostProviderProps): React.JSX.Element {
  // const createAlert = useContext(SnackbarContext);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const onLoading = (isLoading: boolean) => {
    setLoadingPosts(isLoading);
  };

  const onError = useCallback(() => {
    // createAlert({
    //   message: "Something went wrong.",
    //   severity: "error",
    // });
  }, []);

  const getPostList = useCallback(
    async (selectedCategoryID?: string) => {
      const onSuccess = async (data: Post[]) => {
        setPosts(data);
      };

      const params = { onSuccess, onError, onLoading };
      selectedCategoryID ? await getPostsByCategory({ selectedCategoryID, ...params }) : await getPosts(params);
    },
    [onError]
  );

  const addPost = useCallback(
    async (newPost: CreatePostPayload) => {
      const onSuccess = async () => {
        await getPostList();
        // createAlert({
        //   message: "Post successfully created.",
        //   severity: "success",
        // });
      };

      await createPost({ newPost, onSuccess, onError, onLoading });
    },
    [onError, getPostList]
  );

  const updatePostData = useCallback(
    async ({ payload, selectedCategoryID }: { payload: UpdatePostPayload; selectedCategoryID?: string }) => {
      const onSuccess = async () => {
        await getPostList(selectedCategoryID);
        // createAlert({
        //   message: "Post successfully updated.",
        //   severity: "success",
        // });
      };

      await updatePost({ payload: payload, onSuccess, onError, onLoading });
    },
    [onError, getPostList]
  );

  const removePost = useCallback(
    async ({ postID, selectedCategoryID }: { postID: string; selectedCategoryID?: string }) => {
      const onSuccess = async () => {
        await getPostList(selectedCategoryID);
        // createAlert({
        //   message: "Post successfully deleted.",
        //   severity: "success",
        // });
      };
      setLoadingPosts(true);
      await deletePost({ postID, onSuccess, onError });
    },
    [onError, getPostList]
  );

  return (
    <PostContext.Provider
      value={{
        posts,
        loadingPosts,
        addPost,
        removePost,
        getPostList,
        updatePostData
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
