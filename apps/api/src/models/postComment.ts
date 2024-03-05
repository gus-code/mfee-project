import mongoose, { Document, HydratedDocument, Model, Schema } from 'mongoose';

interface IPostComment extends Document {
    author: string,
    content: string
}

interface PostCommentModel extends Model<IPostComment> {
    findByAuthor(name: string): Promise<HydratedDocument<IPostComment>>;
}

export const postCommentSchema = new Schema<IPostComment, PostCommentModel>(
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

postCommentSchema.static('findByAuthor', function findByAuthor(author: string) {
    return this.where({ author: new RegExp(author, 'i') });
});

const PostComment = mongoose.model<IPostComment, PostCommentModel>('PostComment', postCommentSchema);

export default PostComment;