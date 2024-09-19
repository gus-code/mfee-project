import Post from '../models/posts';
import Comment from '../models/comments';

const getAllPosts = async ( req, res ) => {
    try {
        const posts = await Post.find().populate('category');
        res.status(200).json(posts);
    } catch (error) {
        const {message} = error;
        res.status(500).json({message});
    }
}

const getPostsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const post = await Post.find({category: category}).populate('category');
        if( !post ) {
            return res.status(404).json({ message: 'Post by category not found' });
        }
    
        res.status(200).json(post);
    } catch (error) {
        const {message} = error;
        res.status(500).json({message});
    }
    
}

const getPostsById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if( !post ) {
            return res.status(404).json({ message: 'Post by id not found' });
        }
        
        res.status(200).json(post);
    } catch (error) {
        const {message} = error;
        res.status(500).json({message});
    }
    
}

const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
  
        res.status(201).json(post);
    } catch (error) {
        const {message} = error;
        res.status(500).json({message});
    }
}

const createComment = async (req, res) => {
    const { id } = req.params;
 
    try {
        const post = await Post.findById(id);
        if ( !post ) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        const comment = await Comment.create(req.body);
        if ( !comment ) {
            return res.status(400).json({ message: 'Comment not created' });
        }
        post.comments.push(comment._id);
        await post.save();
  
        res.status(201).json(post);
    } catch (error) {
        const {message} = error;
        res.status(500).json({message});
    }
}

const updatePost = async (req, res) => {
    const { title } = req.body;
    const { id } = req.params;
  
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });  
    }

    try {
        const post = await Post.findByIdAndUpdate(id, {
            title: req.body.title
        },
        {new: true});
    
        res.status(200).json(post);
    } catch (error) {
        const {message} = error;
        res.status(500).json({message});
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await Comment.deleteMany({_id: {$in: post.comments}});
        const postDeleted = await Post.findByIdAndDelete(id);
        res.status(204).json(postDeleted);
    } catch (error) {
        const {message} = error;
        res.status(500).json({message});
    }
}

export default {
    getAllPosts,
    getPostsByCategory,
    getPostsById,
    createPost,
    createComment,
    updatePost,
    deletePost
}