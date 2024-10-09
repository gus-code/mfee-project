import { AxiosError, AxiosResponse } from "axios";

import axios from "../axios";
import { PostsResponse, PostResponse, NewPost } from "../../types";

export const getPosts = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: PostsResponse[]) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: "/posts",
    method: "get",
  })
    .then((response: AxiosResponse) => {
      const data: PostsResponse[] = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const getPostsByCategory = async ({
  selectedCategoryID,
  onSuccess,
  onError,
  onLoading,
}: {
  selectedCategoryID: string;
  onSuccess?: (data: PostsResponse[]) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: `/posts/category/${selectedCategoryID}`,
    method: "get",
  })
    .then((response: AxiosResponse) => {
      const data: PostsResponse[] = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const getPost = async ({
  postId,
  onSuccess,
  onError,
  onLoading,
}: {
  postId: string;
  onSuccess?: (data: PostResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: `/posts/${postId}`,
    method: "get",
  })
    .then((response: AxiosResponse) => {
      const data: PostResponse = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const createPost = async ({
  newPost,
  onSuccess,
  onError,
  onLoading,
}: {
  newPost: NewPost;
  onSuccess?: (data: PostsResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    method: "post",
    url: `/posts`,
    data: newPost,
  })
    .then((response: AxiosResponse) => {
      const data: PostsResponse = response.data;
      if (response.status === 201 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const updatePost = async ({
  postId,
  updatedPost,
  onSuccess,
  onError,
  onLoading,
}: {
  postId: string;
  updatedPost: NewPost;
  onSuccess?: (data: PostsResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: `/posts/${postId}`,
    method: "patch",
    data: updatedPost,
  })
    .then((response: AxiosResponse) => {
      const data: PostsResponse = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const deletePost = async ({
  postId,
  onSuccess,
  onError,
  onLoading,
}: {
  postId: string;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: `/posts/${postId}`,
    method: "delete",
  })
    .then((response: AxiosResponse) => {
      if (response.status === 204 && onSuccess) onSuccess();
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};
