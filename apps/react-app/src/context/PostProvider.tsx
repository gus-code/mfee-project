import React, {
  createContext,
  useCallback,
  // useContext, useEffect,
  useState
} from 'react';

import { NewPost, Post, PostsResponse } from '../types';
// import { SnackbarContext } from './SnackbarProvider';
import { createPost, deletePost, getPosts, getPostsByCategory, updatePost } from '../api';

interface PostContextProps {
  posts: Post[] | null;
  loadingPosts: boolean;
  addPost: (newPost: NewPost) => void;
  removePost: ({ postId, selectedCategoryID }: { postId: string; selectedCategoryID?: string }) => void;
  getPostList: (selectedCategoryID?: string) => void;
  updatePostData: ({
    postId,
    updatedPost,
    selectedCategoryID
  }: {
    postId: string;
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
    // createAlert(
    //   message: "Something went wrong.",
    //   severity: "error",
    // );
  }, []);

  const getPostList = useCallback(
    (selectedCategoryID?: string) => {
      async function process() {
        const onSuccess = async (data: PostsResponse[]) => {
          const newList = data.map((post) => ({
            id: post._id,
            title: post.title,
            image: post.image,
            description: post.description,
            category: post.category,
            comments: post.comments
          }));
          setPosts(newList);
        };

        const params = { onSuccess, onError, onLoading };
        selectedCategoryID ? await getPostsByCategory({ selectedCategoryID, ...params }) : await getPosts(params);
      }
      process();
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
    async ({ postId, updatedPost, selectedCategoryID }: { postId: string; updatedPost: NewPost; selectedCategoryID?: string }) => {
      const onSuccess = async () => {
        await getPostList(selectedCategoryID);
        // createAlert({
        //   message: "Post successfully updated.",
        //   severity: "success",
        // });
      };

      await updatePost({ postId, updatedPost, onSuccess, onError, onLoading });
    },
    [onError, getPostList]
  );

  const removePost = useCallback(
    async ({ postId, selectedCategoryID }: { postId: string; selectedCategoryID?: string }) => {
      const onSuccess = async () => {
        await getPostList(selectedCategoryID);
        // createAlert({
        //   message: "Post successfully deleted.",
        //   severity: "success",
        // });
      };
      setLoadingPosts(true);
      await deletePost({ postId, onSuccess, onError });
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
