import type { Post, Comment, PostResponse } from "../models/types"
import { categories } from "../controllers/category"

const posts: Post[] = []
const comments: Comment[] = []

const buildResponsePost = (post: Post): PostResponse => {
  return {
    ...post,
    category: categories.filter(cat => post.category.includes(cat.id)),
    comments: comments.filter(com => post.category.includes(com.id))
  } as PostResponse
}

const findPost = (id: string): Post | void => {
  return posts.find(el => el.id === id)
}

const getPost = (req, res): void => {
  const { id } = req.params;
  const currentPost = findPost(id)

  if (!currentPost) return res.status(404).json({message: "Post not found"})

  res.status(200).json(buildResponsePost(currentPost));
}

const updatePost = (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex(el => el.id === id)
  if (postIndex < 0) return res.status(404).json({message: "Post not found"})

  const post = req.body;
  if (!post) return res.status(401).json({ message: "Name is required!" })

  Object.keys(post).forEach(key => {
    if (!posts[postIndex][key]) return
    posts[postIndex][key] = post[key]
  })

  res.status(203).json(buildResponsePost(posts[postIndex]));
}

const deletePost = (req, res) => {
  const { id } = req.params;
  const postIndex = categories.findIndex(el => el.id === id)
  if (postIndex < 0) return res.status(404).json({message: "Post not found"})

  const currentPost = buildResponsePost(posts[postIndex])

  posts.splice(postIndex, 1)

  res.status(200).json({status: "Item Deleted", item: currentPost});
}

const createComment = (req, res) => {
  const { id } = req.params;
  const currentPost = findPost(id)
  if (!currentPost) return res.status(404).json({message: "Post not found"})

  const {comment} = req.body;
  if (!comment.author || !comment.content) return res.status(401).json({ message: "Invalid Comment!" })

  const commentId = Date.now().toString()
  comments.push({
    id,
    author: comment.author,
    content: comment.content,
  })

  currentPost.comments.push(commentId)

  res.status(203).json(buildResponsePost(currentPost));
}


const getAllPosts = (req, res) => {
  res.status(200).json(posts.map(post => buildResponsePost(post)));
}

const createPost = (req, res) => {
  const {
    title,
    image,
    description,
    category,
    comments,
  } = req.body;

  if (
    !title
    || !image
    || !description
    || !category
  ) return res.status(401).json({ message: "Invalid Post!" })

  const newComments: string[] = []

  comments.forEach(({author, content}) => {
    if (!author || !content) res.status(401).json({ message: "Invalid Comment!" })

    const id = Date.now().toString()

    newComments.push(id)

    comments.push({
      id,
      author,
      content,
    })
  });

  const newPost: Post = {
    ...req.body,
    id: Date.now().toString(),
    comments: newComments,
  }

  posts.push(newPost)

  res.status(201).json(buildResponsePost(newPost))
}

const getAllPostsByCategory = (req, res): void => {
  const { category } = req.params;
  let categoryPosts = posts.filter(post => post.category.includes(category))

  if (!categoryPosts.length) return res.status(404).json({message: "Category has no posts"})

  categoryPosts = categoryPosts.map(post => buildResponsePost(post))

  res.status(200).json(categoryPosts);
}

export default {
  getPost,
  updatePost,
  deletePost,
  createComment,
  getAllPosts,
  createPost,
  getAllPostsByCategory
}
