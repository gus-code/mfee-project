import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
  title: string;
  image: string;
  description: string;
  category: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
}

export const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'CategoryId is required']
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

const Post = mongoose.model<IPost>('Post', postSchema)

export default Post;
