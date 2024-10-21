import capstoneApi from '../api/capstoneApi';

export const getPosts = async () => {
  let posts = [];

  await capstoneApi
    .get('/posts')
    .then(({ data }) => {
      posts = data;
    })
    .catch((e) => console.error(e));

  return posts;
};

export const getPostById = async (id) => {
  let post;

  await capstoneApi
    .get(`/posts/${id}`)
    .then(({ data }) => {
      post = data;
    })
    .catch((e) => console.error(e));

  return post;
};

export const createPost = async (post) => {
  let status;
  await capstoneApi
    .post(`/posts`, post)
    .then(() => {
      status = true;
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};

export const updatePost = async (post) => {
  let status;
  await capstoneApi
    .patch(`/posts/${post._id}`, post)
    .then(() => {
      status = true;
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};

export const deletePost = async (id) => {
  let status;
  await capstoneApi
    .delete(`/posts/${id}`)
    .then(() => {
      status = true;
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};
