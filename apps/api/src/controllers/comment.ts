import Comment from "../models/Comment";

//GET All Comments
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        const {message} = error;
        res.status(500).send({message}); 
    }
}

//GET Comment by Id
const getCommentById = async (req, res) =>{
    const {id} = req.params;

    try {
        const comment = await Comment.findById(id);
        if(!comment){
            res.status(400).json('Comment not found');
        }
        res.status(200).json(comment);
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

//POST Comment
const createComment = async (req, res) =>{
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

//PATCH Comment
const updateComment = async (req, res) =>{
    try {
        const {id} = req.params;

        const comment = await Comment.findByIdAndUpdate(id, req.body, {new: true});
        if(!comment){
            res.status(400).json('Comment not found');
        }
        res.status(200).json(comment);
        
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

//Delete Comment
const deleteComment = async (req, res) =>{
    try {
        const {id} = req.params;

        const comment = await Comment.findByIdAndDelete(id);
        if(!comment){
            res.status(400).json('Comment not found');
        }
        //res.status(204);
        res.status(200).send(comment);
        
    } catch (error) {
        const {message} = error;
        res.status(500).send({message});
    }
}

export default {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}