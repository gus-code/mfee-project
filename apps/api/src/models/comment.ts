import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
  author: string;
  content: string;
}

const commentSchema = new Schema<IComment>(
  {
    author: String,
    content: String
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;