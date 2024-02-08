import mongoose, {Document, Schema } from 'mongoose';

interface IPost extends Document {
  title: string;
  image?: string;
  description: string;
  category: mongoose.Schema.Types.ObjectId;
  comments?: mongoose.Schema.Types.ObjectId[];
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ]
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;