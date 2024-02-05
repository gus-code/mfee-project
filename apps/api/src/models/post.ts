import mongoose, { Document, Schema } from 'mongoose';
import PostComment from './postComment';

interface IPost extends Document {
    title: string,
    image: string,
    description: string,
    category: object,
    comments: object[]
}

export const postSchema = new Schema<IPost>(
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
            type: mongoose.SchemaTypes.ObjectId,
            required: [true, 'Property is required'],
            ref: "Category"
        },
        comments: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "PostComment"
        }]
    },
    {
        timestamps: true
    }
);

postSchema.post('findOneAndDelete', async function (doc) {
    const allPostComments = doc['comments'];
    if (allPostComments.length > 0) {
        await PostComment.deleteMany({ _id: allPostComments });
    }
});

const Post = mongoose.model<IPost>('post', postSchema);

export default Post;