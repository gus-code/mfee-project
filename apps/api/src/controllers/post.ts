import { Request, Response } from "express";
import { v4 as uuid, validate } from "uuid";
import { findCategoryById } from "./category"

interface Category {
  id: string;
  name: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
}

interface Post {
  id: string;
  title: string;
  image: string;
  description: string;
  category: Category;
  comments: Comment[];
}

const posts: Post[] = [];

const findPostById = (id: string) => {
  return posts.find((p) => p.id === id);
};

const findPostIndexById = (id: string) => {
  return posts.findIndex((p) => p.id === id);
};

const findPostsByCategoryId = (id: string) => {
  return posts.filter((p) => p.category.id === id);
};


export const getPosts = (req: Request, res: Response) => {
  return res.status(200).json(posts);
};

const categoryID = "92b8d466-b4de-457e-9683-b003e232f3ba";
const currCategory = findCategoryById(categoryID);

const seedPost: Post = {
  id: "82b8d466-b4de-457e-9683-b003e342f3ba",
  title: "Test Post",
  image: "https://photo.img",
  description: "This is a description text",
  category: currCategory,
  comments: []
}

posts.push(seedPost);

export const getPostByID = (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id || !validate(id)) {
    return res.status(400).json({
      message: "An id is required"
    });
  }

  const post = findPostById(id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  return res.status(200).json(post);
};


export const getPostByCategory = (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id || !validate(id)) {
    return res.status(400).json({
      message: "An id is required"
    });
  }

  const postsFound = findPostsByCategoryId(id);

  if (postsFound.length === 0) {
    return res.status(404).json({
      message: "No posts with that category"
    });
  }

  return res.status(200).json(postsFound);
};


export const createPost = (req: Request, res: Response) => {
  const { title, image, description, id } = req.body;

  if (!title || !image || !description || !id) {
    return res.status(400).json({
      message: "You must provide all the values"
    });
  }

  const category = findCategoryById(id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found"
    });
  }

  const newPost: Post = {
    id: uuid(),
    title,
    image,
    description,
    category,
    comments: []
  };

  posts.push(newPost);

  return res.status(201).json(newPost);
};


export const createComment = (req: Request, res: Response) => {
  const { id: postId, author, content } = req.body;

  if (!postId || !author || !content) {
    return res.status(400).json({
      message: "Missing fields"
    });
  }

  const post = findPostById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post does not exist"
    });
  }

  const newComment: Comment = {
    id: uuid(),
    author,
    content
  };

  post.comments.push(newComment);

  return res.status(201).json(newComment);
};


export const updatePost = (req: Request, res: Response) => {
  const { id, title, image, description } = req.body;

  if (!id || !validate(id)) {
    return res.status(400).json({
      message: "Missing or invalid id"
    });
  }

  const post = findPostById(id);

  if (!post) {
    return res.status(404).json({
      message: "Post does not exist"
    });
  }

  if (title) post.title = title;
  if (image) post.image = image;
  if (description) post.description = description;

  return res.status(200).json(post);
};


export const deletePost = (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id || !validate(id)) {
    return res.status(400).json({
      message: "Missing or invalid id"
    });
  }

  const index = findPostIndexById(id);

  if (index === -1) {
    return res.status(404).json({
      message: "Post does not exist"
    });
  }

  const deletedPost = posts.splice(index, 1)[0];

  return res.status(200).json({
    message: "Post deleted",
    post: deletedPost
  });
};
