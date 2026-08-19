import express from 'express';
const router = express.Router();

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

export const getPostById = (id: string) => {
  return posts.find((p) => p.id === id);
};

export const getPostByCat= (category: string) => {
  return posts.find((c) => c.category === category);
};

//return all the posts
router.get('/', (req, res) => {
    res.status(200).json(posts);
});

//return posts by category
router.get('/category/:category', (req, res) => {
    const { category } = req.params;

    const post = getPostByCat(category)

    if(!post) {
        return res.status(404).json({message: 'Posts with this category not found'});
    }

    res.status(200).json(post);
});

//retur a post by its category
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const post = getPostById(id)

    if(!post) {
        return res.status(404).json({message: 'Posts with this category not found'});
    }

    res.status(200).json(post);
});

//creat a new post
router.post('/', (req, res) => {
  const { title, image, description, category, comments = [] } = req.body;

  if (!title || !image || !description || !category ) {
    return res.status(400).json({ message: 'All the data is required.' });
  }

  const newPost = {
    id: Date.now().toString(), 
    title,
    image,
    description,
    category,
    comments
  };
  posts.push(newPost);

  res.status(201).json(newPost);
});

//create a comment for a post
router.post('/:id/comments', (req, res) => {
  const { id } = req.params;
  const post = getPostById(id);
  const { author, content } = req.body;

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
});

//update post information
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const updatedPost = { ...posts[postIndex] };
  const { title, image, description, category, comments } = req.body;

  if (title || image || description || category || comments) {
    updatedPost.title = title;
    updatedPost.image = image;
    updatedPost.description = description;
    updatedPost.category = category;
    updatedPost.comments = comments;
  }

  posts[postIndex] = updatedPost;

  res.status(200).json(updatedPost);
});

//delete a post by its id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts.splice(postIndex, 1);

  res.status(204).send();
});

export default router;