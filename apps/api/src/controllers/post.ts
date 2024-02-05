import { RequestHandler, Request, Response } from 'express';
import Post from '../models/post';
import PostComment from '../models/postComment';

const getPost = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate('category');
        res.status(200).json(posts);
    } catch (error) {
        const { message } = error;
        res.status(500).json({ message });
    }
};

const createPost: RequestHandler = async (req: Request, res: Response) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        const { message } = error;
        res.status(500).json({ message });
    }
};

const getPostByCategory: RequestHandler = async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    try {
        const posts = await Post.where('category').equals(categoryId).populate('category');
        res.status(200).json(posts);
    } catch (error) {
        const { message } = error;
        res.status(500).json({ message });
    }
};

const createPostComment: RequestHandler = async (req: Request, res: Response) => {
    const { postId } = req.params;
    try {
        const currentPost = await Post.findById(postId);
        const postComment = await PostComment.create(req.body);
        currentPost.comments.push(postComment._id);
        const updatedPost = await Post.findByIdAndUpdate(postId, currentPost, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(201).json(postComment);
    } catch (error) {
        const { message } = error;
        res.status(500).json({ message });
    }
};

const getPostById: RequestHandler = async (req: Request, res: Response) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId).populate('category').populate('comments');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        const { message } = error;
        res.status(500).json({ message });
    }
};

const getPostCommentByAuthor: RequestHandler = async (req: Request, res: Response) => {
    const { author } = req.query;
    try {
        const postsCommentsByAuthor = await PostComment.findByAuthor(author.toString());
        res.status(200).json(postsCommentsByAuthor);
    } catch (error) {
        const { message } = error;
        res.status(500).json({ message });
    }
};

const updatePost: RequestHandler = async (req: Request, res: Response) => {
    const { postId } = req.params;

    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        const { message } = error;
        res.status(500).json({ message });
    }
};

const deletePost: RequestHandler = async (req: Request, res: Response) => {
    const { postId } = req.params;

    try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).json(post);
    } catch (error) {
        const { message } = error;
        res.status(500).send({ message });
    }
};

export default {
    getPost,
    getPostByCategory,
    getPostById,
    getPostCommentByAuthor,
    createPost,
    createPostComment,
    updatePost,
    deletePost
};