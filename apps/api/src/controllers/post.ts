import Post from "../models/Post";
import Comment from '../models/Comment';
//import commentController from '../controllers/comment';

//GET All Posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('category').exec();
        res.status(200).json(posts);
    } catch (error) {
        const {message} = error;
        res.status(500).send({message}); 
    }
}

//GET All Posts bye Category
const getPostsByCategory = async (req, res) => {
    const {category} = req.params;
    console.log(category);
    try {
        const posts = await Post.find({category: category});
        res.status(200).json(posts);
    } catch (error) {
        const {message} = error;
        res.status(500).send({message}); 
    }
}


//GET Post by Id
const getPostById = async (req, res) =>{
    const {id} = req.params;

    try {
        const post = await Post.findById(id).populate('category').exec();
        if(!post){
            res.status(400).json('Post not found');
        }
        res.status(200).json(post);
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

//POST Post
const createPost = async (req, res) =>{
    try {const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

//POST Post with comment
const createPostComment = async (req, res) =>{
    try {
        const {id} = req.params;
        const post = await Post.findById(id);

        if(!post){
            res.status(400).json('Post not found');
        }
        const comment = await Comment.create(req.body);
        let newComments = post.comments;
        newComments.push(comment.id);
        const postUpdated = await Post. findByIdAndUpdate(id, {comments:newComments}, {new: true}).populate('comments').exec();

        res.status(201).json(comment);
        
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

//PATCH Post
const updatePost = async (req, res) =>{
    try {
        const {id} = req.params;

        const post = await Post.findByIdAndUpdate(id, req.body, {new: true});
        if(!post){
            res.status(400).json('Post not found');
        }
        res.status(200).json(post);
        
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

//Delete Post
const deletePost = async (req, res) =>{
    try {
        const {id} = req.params;

        const post = await Post.findByIdAndDelete(id);
        if(!post){
            res.status(400).json('Post not found');
        }
        res.status(204);
        //res.status(200).json(post);
        
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

export default {
    getPosts,
    getPostsByCategory,
    getPostById,
    createPost,
    createPostComment,
    updatePost,
    deletePost
}