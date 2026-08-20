import mongoose, { Document, Schema } from 'mongoose';


// --- interfaces
interface IComment extends Document {
    author: string;
    content: string
}

interface IPost extends Document {
    title: string; 
    image: string;
    description: string;
    category: string;
    comments: IComment[]
}

// --- esquema
export const commentSchema = new Schema<IComment> (
    {
        author: {
            type: String,
            required: [true, 'Property is required']
        },
        content: {
            type: String,
            required: [true, 'Property is required']
        }    
    },
    {
        timestamps: true
    }
);

export const postSchema = new Schema<IPost> (
    {
        title: {
            type: String,
            required: [true, 'Property is required']
        },
        image: {
            type: String,
            required: [true, 'Property is required']
        },
        description: {
            type: String,
            required: [true, 'Property is required']
        },
        category: {
            type: String,
            required: [true, 'Property is required']
        },
        comments: {
            type: [commentSchema],
            required: [true, 'Property is required']
        }         
          
    },
    {
        timestamps: true
    }
);

// ---models
export const Comment = mongoose.model<IComment>('Comment', commentSchema);
export const Post = mongoose.model<IPost>('Post', postSchema);

export default{
    Comment,
    Post
}

