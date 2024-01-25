import express from 'express';

const router = express.Router();

const NO_CATEGORY_FOUND = 'Category not found';
const POST_NO_FOUND = 'Post not found';
const INVALID_POST = 'Invalid post missing requirement (title / description / category)';
const INVALID_COMMENT = 'Invalid comment missing content';
// variable for manage the info
const posts = [];

const getCategory = (category: string) => {
  return posts.filter((post) => post.category === category);
};
const getPostById = (id: string) => {
  return posts.find((post) => post.id === id);
};

const getIndexById = (array: any[], id: string) => {
  return array?.length > 0 ? array.findIndex((item) => item.id === id) : -1;
};

const isPostValid = (postObj: { title: string; description: string; category: string }) => {
  const { title, description, category } = postObj;

  const isTitleValid = title?.trim()?.length > 0;
  const isDescValid = description?.trim()?.length > 0;
  const isCategoryValid = category?.trim()?.length > 0;

  return isTitleValid && isDescValid && isCategoryValid;
};

const createNewPost = (post: { title: string; description: string; category: string; image?: string; comments?: string[] }) => {
  const { title, description, category, image, comments } = post;

  const newPost = {
    id: Date.now().toString(),
    title,
    description,
    category,
    image: image ?? '',
    comments: comments?.length ?? []
  };

  return newPost;
};

const createNewComment = (comment: { content: string; author?: string }) => {
  const { author, content } = comment;
  const newComment = {
    id: Date.now().toString(),
    author: author ?? 'anonymous',
    content
  };
  return newComment;
};

// - `GET /posts` Return an array of all the posts with status code 200
router.get('/', (req, res) => {
  res.status(200).json(posts);
});

// - `GET /posts/category/:category` Return an array of all the posts by category with status code 200
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  let postsByCategory = getCategory(category);

  if (!postsByCategory.length) {
    postsByCategory = [];
  }

  res.status(200).json(postsByCategory);
});
// - `GET /posts/:id` Return a post by id with category object and each comment object in the array with status code 200
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const postById = getPostById(id);

  if (!postById) {
    return res.status(404).json({ message: POST_NO_FOUND });
  }
  res.status(200).json(postById);
});
// - `POST /posts` Create a new post and return the created post with status code 201
router.post('/', (req, res) => {
  if (!isPostValid(req.body)) {
    return res.status(400).json({ message: INVALID_POST });
  }
  const newPost = createNewPost(req.body);
  posts.push(newPost);
  res.status(201).json(newPost);
});
// - `POST /posts/:id/comments` Create a comment inside the post and return the comment with status code 201
router.post('/:id/comments', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const isContentValid = content?.trim()?.length > 0;
  const postIndex = getIndexById(posts, id);
  if (postIndex < 0) {
    return res.status(404).json({ message: POST_NO_FOUND });
  } else if (!isContentValid) {
    return res.status(400).json({ message: INVALID_COMMENT });
  }
  const newComment = createNewComment(req.body);
  const updatedPost = { ...posts[postIndex] };
  updatedPost.comments.push(newComment);
  posts[postIndex] = updatedPost;
  res.status(201).json(newComment);
});
// - `PATCH /posts/:id` Update post information and return the updated post with status code 200
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { title, image, description, category } = req.body;
  const postIndex = getIndexById(posts, id);
  if (postIndex < 0) {
    return res.status(404).json({ message: POST_NO_FOUND });
  }

  //   else if (!isPostValid(req.body)) {
  //     return res.status(400).json({ message: INVALID_POST });
  //   }
  const updates = { title, image, description, category };
  const post = { ...posts[postIndex] };
  const updatedPost = { ...post, ...updates };
  posts[postIndex] = updatedPost;
  res.status(200).json(updatedPost);
});

// - `DELETE /posts/:id` Delete the post and return the deleted post with status code 200 or 204 if you decide to not return anything
// * *Add 404 validation where needed*
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const postIndex = getIndexById(posts, id);
  if (postIndex < 0) {
    return res.status(404).json({ message: POST_NO_FOUND });
  }
  posts.splice(postIndex, 1);
  res.status(204).send();
});
export default router;
