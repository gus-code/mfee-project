import mongoose, { Schema } from 'mongoose';

export const postSchema = new Schema (
    {
       
        title: {
            type: String,
            required: [true, 'Property is required']
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        category: {
            type: mongoose.Types.ObjectId, required: true, ref: 'Category'
        },
        comments: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
        }
    }
);

const Post = mongoose.model('Post', postSchema);

export default Post