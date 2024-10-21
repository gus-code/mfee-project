import capstoneApi from '../api/capstoneApi';

export const createComment = async (comment) => {
  let status;
  const { postId, author, content } = comment;
  await capstoneApi
    .post(`/posts/${postId}/comments`, { author, content })
    .then(() => {
      status = true;
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};
