import { Request, Response } from "express";
import Post from "../models/post.model";
import Comment from "../models/comment.model";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate('category')
      .populate('comments');

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error)
  }
};


export const getPostByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
      .populate('category')
      .populate('comments');

    if( !post ){
      res.status(400).json({message: `No post with id: ${id}`})
    }

    res.status(200).json(post);

  } catch (error) {
    res.status(500).json(error)
  }
};


export const getPostByCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.find({
      category: id
    })
      .populate('category')
      .populate('comments');

    if( !post ){
      res.status(400).json({message: `No post with that category`})
    }

    res.status(200).json(post);

  } catch (error) {
    res.status(500).json(error.message)
  }

};


export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.create(req.body)

    res.status(201).json(post);

  } catch (error) {
    res.status(500).json(error.message)
  }
};


export const createComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { author, content } = req.body;


  try {
    const comment = await Comment.create({ author, content, post: id});
    res.status(201).json(comment)
    
  } catch (error) {
    res.status(500).json(error.message)
  }
};


export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {new: true});

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(201).json(post)
    
  } catch (error) {
    res.status(500).json(error.message)
  }
};


export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const post = await Post.findByIdAndDelete(id, req.body);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

    res.status(201).json(post)
    
  } catch (error) {
    res.status(500).json(error.message)
  }
};
