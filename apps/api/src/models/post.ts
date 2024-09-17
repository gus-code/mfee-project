import mongoose, { Document, Schema, Types } from 'mongoose';

interface IPost extends Document {
  title: string;
  image: string;
  description: string;
  category: Types.ObjectId;
  comments: [Types.ObjectId];
}

export const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Property is required']
    },
    image: {
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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
