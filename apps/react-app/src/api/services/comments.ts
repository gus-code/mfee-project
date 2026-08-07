import { AxiosError, AxiosResponse } from "axios";

import axios from "../axios";
import { CreateCommentPayload } from "../../types";

export const createComment = async ({
  postID,
  newComment,
  onSuccess,
  onError,
  onLoading,
}: {
  postID: string;
  newComment: CreateCommentPayload;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    method: "post",
    url: `/posts/${postID}/comments`,
    data: newComment,
  })
    .then((response: AxiosResponse) => {
      if (response.status === 201 && onSuccess) onSuccess();
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};
