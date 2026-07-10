import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
    title:string;
    image:string;
    description: string;
    category: mongoose.Types.ObjectId;
    comments: mongoose.Types.ObjectId[]
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    image: {
      type: String,
      required: [true, 'Image URL is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required']
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