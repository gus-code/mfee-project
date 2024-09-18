import mongoose, { Document } from 'mongoose';

interface IComment extends Document {
  author: string;
  content: string;
}

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, 'Author is required']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    }
  },
  {
    timestamps: true
  }
);

const CommentDocument = mongoose.model<IComment>('Comment', commentSchema);

export default CommentDocument;
