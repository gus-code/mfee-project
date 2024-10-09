import { AxiosError, AxiosResponse } from "axios";

import axios from "../axios";
import { NewComment, CommentResponse } from "../../types";

export const createComment = async ({
  postId,
  newComment,
  onSuccess,
  onError,
  onLoading,
}: {
  postId: string;
  newComment: NewComment;
  onSuccess?: (data: CommentResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    method: "post",
    url: `/posts/${postId}/comments`,
    data: newComment,
  })
    .then((response: AxiosResponse) => {
      const data: CommentResponse = response.data;
      if (response.status === 201 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};
