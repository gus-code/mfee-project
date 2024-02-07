import mongoose, { Schema } from 'mongoose';
import Post from '../interfaces/post';

export const postSchema = new Schema<Post>(
  {
    title: {
      type: String,
      required: [true, 'Property is required']
    },
    img: {
      type: String
    },
    description: {
      type: String,
      required: [true, 'Property is required']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    comments: {
      type: [{ content: String, author: String }]
    }
  },
  { timestamps: true }
);

const PostModel = mongoose.model<Post>('Post', postSchema);
export default PostModel;
