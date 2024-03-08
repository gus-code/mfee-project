import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  author: string;
  content: string;
}
export const commentSchema = new Schema<IComment>(
  {
    author: {
      type: String,
      required: [true, 'Author is required']
    },
    content: {
      type: String,
      required: [true, 'Content is missing']
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;