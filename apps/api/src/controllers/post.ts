import { RequestHandler } from "express";
import Post from "../models/PostMongo";
import Comment from "../models/CommentMongo";

const getPosts: RequestHandler = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('comments').populate('category');
        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

const getPostsByCategory: RequestHandler = async (req, res, next) => {
    const { category } = req.params;

    try {
        const categoryPosts = await Post.find({ category }).populate('comments').populate('category');
        return res.status(200).json(categoryPosts);

    } catch (error) {
        next(error);
    }
};

const getPostsById: RequestHandler = async (req, res, next) => {

    const { id } = req.params;

    try {
        const post = await Post.findById(id).populate('comments').populate('category');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

const createPost: RequestHandler = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        return res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

const createCommentInPost: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const { author, content } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = await Comment.create({
            author,
            content,
            post: post._id,
        });

        post.comments.push(comment._id);

        await post.save();

        return res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

const updatePost: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true }).populate('comments').populate('category');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

const deletePost: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        await Comment.deleteMany({
            _id: { $in: post.comments }
        });

        await Post.findByIdAndDelete(id);

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default {
    getPosts,
    getPostsByCategory,
    getPostsById,
    createPost,
    createCommentInPost,
    updatePost,
    deletePost
};