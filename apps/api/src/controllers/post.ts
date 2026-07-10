import {Request, Response} from "express";
import Post from "../models/post"
import Comment from "../models/comment"
import Category from "../models/category";


const getPosts = async (req: Request,res: Response) =>{
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error){
        const {message}= error as Error;
        res.status(500).json({message});
    }
};

const getPostByCategory = async (req: Request,res: Response)=>{
    const {category} = req.params;

    try{
        const categoryPosts = await Post.find({category}).populate('category');

        res.status(200).json(categoryPosts);
    }catch (error){
        const { message } = error as Error;
        res.status(500).json({ message });
    }
};

const getPostById = async (req: Request,res: Response) => {
    const {id} = req.params;
    try{
        const post = await Post.findById(id).populate('category').populate('comments');
        if(!post){
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json(post);
    } catch(error){
        const { message } = error as Error;
        res.status(500).json({ message });
    }

};

const createPost = async (req: Request,res: Response)=>{
    const {title, image, description, category} = req.body;

    try{
        if(!title || !category || !description || !image){
        return res.status(400).json({message: 'The title, description, image and category are required'});
        }
        const newPost = await Post.create({
            title,
            image,
            description,
            category,
            comments: [],
        });
        res.status(201).json(newPost);
    } catch (error){
        const { message } = error as Error;
        res.status(500).json({ message });
    }
};

const createComment = async (req: Request,res: Response) =>{
    const {id} = req.params;
    const {author, content} = req.body;

    try{
        const post = await Post.findById(id);

        if(!post){
            return res.status(404).json({message: 'Post not found'});
        }
        if(!author || !content){
            return res.status(400).json({message: 'Author and conten are required'});
        }

        const newComment = await Comment.create({
            author,
            content,
        });
        
        post.comments.push(newComment._id);
        await post.save();
        res.status(201).json(newComment);
    } catch(error){
        const { message } = error as Error;
        res.status(500).json({ message });
    }
};


const updatePost = async (req: Request,res: Response)=>{
    const {id}=req.params;
    const {title, description, image, category,}= req.body;
    try{
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({message: 'Post not found'})
        }

        if(category){
            const checkExisting = await Category.findById(category);
            if(!checkExisting){
                return res.status(404).json({message: 'Category does not exist'});
            }
            post.category = category;
        }

        if(title){post.title = title;}
        if (description){post.description = description;}
        if (image){post.image = image;}

        await post.save()
        res.status(200).json(post);
    } catch (error){
        const { message } = error as Error;
        res.status(500).json({ message });
    }
};

const deletePost = async (req: Request,res: Response)=>{
    const {id}= req.params;

    try{
        const post = await Post.findByIdAndDelete(id);

        if (!post){
            return res.status(404).json({message:'Post not found'});
        }
        return res.status(204).send();
    } catch (error){
        const { message } = error as Error;
        res.status(500).json({ message });
    }
};

export default {
    getPosts, 
    getPostByCategory,
    getPostById, 
    createPost, 
    createComment,
    updatePost,
    deletePost
};