import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
  title: string;
  image: string;
  description: string;
  category: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId[];
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
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Property is required']
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
      }
    ]
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
