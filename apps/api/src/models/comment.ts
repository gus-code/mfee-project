import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
  author: string;
  content: string;
  // postId: mongoose.Schema.Types.ObjectId;
}

export const commentSchema = new Schema<IComment>(
  {
    author: {
      type: String,
      required: [true, 'Property is required']
    },
    content: {
      type: String,
      required: [true, 'Property is required']
    }
    // postId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Post'
    // }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
