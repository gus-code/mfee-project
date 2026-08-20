import { Post } from "../models/posts";
import { Comment } from "../models/posts";

const  posts: Array<Post> = [];

//----
export const getById = (id: string) => {
  return posts.find((p) => p.id === id);
};

export const getByCat= (category: string) => {
  return posts.find((c) => c.category === category);
};

//----



//return all the posts
const getPosts = ((req, res) => {
    res.status(200).json(posts);
});

//get posts by category
const getPostsByCategory = ((req, res) => {
    const { category } = req.params;

    const post = getByCat(category)

    if(!post) {
        return res.status(404).json({message: 'Posts with this category not found'});
    }

    res.status(200).json(post);
});

//get a post by its category
const getPostById = ((req, res) => {
    const { id } = req.params;

    const post = getById(id)

    if(!post) {
        return res.status(404).json({message: 'Posts with this category not found'});
    }

    res.status(200).json(post);
});

//creat a new post
const createPost = ((req, res) => {
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
const createComment = ((req, res) => {
  const { id } = req.params;
  const post = getById(id);
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
const updatePost = ((req, res) => {
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
const deletePost = ((req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts.splice(postIndex, 1);

  res.status(204).send();
});

export default {
    getPosts,
    getPostsByCategory,
    getPostById,
    createPost,
    createComment,
    updatePost,
    deletePost
};