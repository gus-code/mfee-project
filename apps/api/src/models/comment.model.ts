import mongoose, { Schema, Types } from 'mongoose';

interface IComment {
  author: string;
  content: string;
  post: Types.ObjectId
}

const commentSchema = new Schema<IComment>(
  {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment