import React, {
  createContext,
  useState,
  // useContext,
  useCallback,
} from "react";

import { NewPost, Post, PostsResponse } from "../types";
// import { SnackbarContext } from "../context";
import {
  createPost,
  deletePost,
  getPosts,
  getPostsByCategory,
  updatePost,
} from "../api";

interface PostContextProps {
  posts: Post[] | null;
  loadingPosts: boolean;
  addPost: (newPost: NewPost) => void;
  removePost: ({
    postID,
    selectedCategoryID,
  }: {
    postID: string;
    selectedCategoryID?: string;
  }) => void;
  getPostList: (selectedCategoryID?: string) => void;
  updatePostData: ({
    postID,
    updatedPost,
    selectedCategoryID,
  }: {
    postID: string;
    updatedPost: NewPost;
    selectedCategoryID?: string;
  }) => void;
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
  updatePostData: () => {},
});

export function PostProvider({
  children,
}: PostProviderProps): React.JSX.Element {
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
      const onSuccess = async (data: PostsResponse[]) => {
        const newList = data.map((post) => ({
          id: post._id,
          title: post.title,
          image: post.image,
          description: post.description,
          category: post.category,
          comments: post.comments,
        }));
        setPosts(newList);
      };

      const params = { onSuccess, onError, onLoading };
      selectedCategoryID
        ? await getPostsByCategory({ selectedCategoryID, ...params })
        : await getPosts(params);
    },
    [onError]
  );

  const addPost = useCallback(
    async (newPost: NewPost) => {
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
    async ({
      postID,
      updatedPost,
      selectedCategoryID,
    }: {
      postID: string;
      updatedPost: NewPost;
      selectedCategoryID?: string;
    }) => {
      const onSuccess = async () => {
        await getPostList(selectedCategoryID);
        // createAlert({
        //   message: "Post successfully updated.",
        //   severity: "success",
        // });
      };

      await updatePost({ postID, updatedPost, onSuccess, onError, onLoading });
    },
    [onError, getPostList]
  );

  const removePost = useCallback(
    async ({
      postID,
      selectedCategoryID,
    }: {
      postID: string;
      selectedCategoryID?: string;
    }) => {
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
        updatePostData,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
