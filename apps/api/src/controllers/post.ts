type comments = {
    id: string;
    author: string;
    content: string
};

const posts: { 
    id: string;
    title: string; 
    image: string;
    description: string;
    category: string;
    comments: comments[]
}[] = [];

export const getPost = (id: string) => {
    return posts.find((p) => p.id === id);
}

export const getPostByCategory = (category: string) => {
    return posts.find((p) => p.category === category);
}

// GET /posts Return an array of all the posts with status code 200
const getPosts = (req, res) => {
  res.status(200).json(posts);
};

// GET /posts/category/:category Return an array of all the posts by category with status code 200
const getPostsByCategory = (req, res) => {
  const { category } = req.params;
  const post = getPostByCategory(category);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post);
};

// GET /posts/:id Return a post by id with category object and each comment object in the array with status code 200
const getPostById = (req, res) => {
  const { id } = req.params;
  const post = getPost(id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post);
};

// POST /posts Create a new post and return the created post with status code 201
const createPost = (req, res) => {
  const { title, image, description, category } = req.body;

  if (!title || !image || !description || !category) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newPost = {
    id: Date.now().toString(),
    title,
    image,
    description,
    category,
    comments: []
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};

// POST /posts/:id/comments Create a comment inside the post and return the comment with status code 201
const createComment = (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;
  const post = getPost(id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (!author || !content) {
    return res.status(400).json({ message: 'Author and content are required.' });
  }

  const newComment = {
    id: Date.now().toString(),
    author,
    content
  };

  post.comments.push(newComment);
  res.status(201).json(newComment);
};

// PATCH /posts/:id Update post information and return the updated post with status code 200
const updatePost = (req, res) => {
  const { id } = req.params;
  const PostIndex = posts.findIndex((p) => p.id === id);

  if (PostIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const updatedPost = { ...posts[PostIndex] };
  const { title, image, description, category } = req.body;

  if (title) {
    updatedPost.title = title;
  }
  if (image) {
    updatedPost.image = image;
  }
  if (description) {
    updatedPost.description = description;
  }
  if (category) {
    updatedPost.category = category;
  }

  posts[PostIndex] = updatedPost;

  res.status(200).json(updatedPost);
};

// DELETE /posts/:id Delete the post and return the deleted post with status code 200 or 204 if you decide to not return anything
const deletePost = (req, res) => {
  const { id } = req.params;
  const PostIndex = posts.findIndex((p) => p.id === id);

  if (PostIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts.splice(PostIndex, 1);

  res.status(204).send();
};

export default {
  getPosts,
  getPostsByCategory,
  getPostById,
  createPost,
  createComment,
  updatePost,
  deletePost
};