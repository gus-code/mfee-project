import express from 'express';
import { getCategory } from './categories';

interface post {
    id: string,
    title:string,
    image:string,
    description: string,
    category: string,
    comments: string[]
}

interface comment{
    id: string,
    author: string,
    content: string
}

const router = express.Router();
const posts: post[]=[];
const comments: comment[] = [];

export const getPost = (id: string) => {
    return posts.find((p) => p.id === id);
};

router.get('/', (req,res) =>{
    res.status(200).json(posts);
})

router.get('/category/:category', (req,res)=>{
    const {category} = req.params;
    const categoryPosts = posts.filter((p)=> p.category === category);

    res.status(200).json(categoryPosts);

})

router.get('/:id', (req,res)=>{
    const {id} = req.params;
    const post = getPost(id);
    if(!post){
        return res.status(404).json({message: 'Post not found'});
    }

    const category = getCategory(post.category);
    const postComments = comments.filter((comment)=> post.comments.includes(comment.id));
    res.status(200).json({...post, category, comments:postComments,});

})

router.post('/', (req,res)=>{
    const {title, image, description, category} = req.body;

    if(!title || !category || !description || !image){
        return res.status(400).json({message: 'The title, description, image and category are required'});
    }

    const newPost ={
        id:Date.now().toString(),
        title,
        image,
        description,
        category,
        comments: [],
    }
    posts.push(newPost);
    res.status(201).json(newPost);
})

router.post('/:id/comments', (req,res)=>{
    const {id} = req.params;
    const {author, content} = req.body;
    const post = getPost(id);

    if(!post){
        return res.status(404).json({message: 'Post not found'});
    }
    if(!author || !content){
        return res.status(400).json({message: 'Author and conten are required'});
    }

    const newComment = {
        id: Date.now().toString(),
        author,
        content,
    };
    
    comments.push(newComment);
    post.comments.push(newComment.id);
    res.status(201).json(newComment);

})

router.patch('/:id', (req,res)=>{
    const {id}=req.params;
    const {title, description, image, category,}= req.body;
    const postIndex = posts.findIndex((p)=> p.id === id);

    if(postIndex === -1){
        return res.status(404).json({message: 'Post not found'})
    }
    if(category){
        const checkExisting = getCategory(category);
        if(!checkExisting){
            return res.status(404).json({message: 'Category does not exist'});
        }
    }
    const updatedPost = {...posts[postIndex]}

    if(title){updatedPost.title = title;}
    if (description){updatedPost.description = description;}
    if (image){updatedPost.image = image;}
    if(category){ updatedPost.category = category; }

    posts[postIndex] = updatedPost
    res.status(200).json(updatedPost);
})

router.delete('/:id', (req,res)=>{
    const {id}= req.params;
    const postIndex = posts.findIndex((p)=> p.id === id)

    if (postIndex === -1){
        return res.status(404).json({message:'Post not found'});
    }

    posts.splice(postIndex,1);
    return res.status(204).send();
})

export default router