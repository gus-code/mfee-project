import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
  title: string;
  image: string;
  description: string;
  category: string;
  comments: string[];
}

export const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [256, 'title should be no greater than 256 characters']
    },
    image: {
      type: String,
      required: [true, 'image URL is missing']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    category: {
      type: String,
      required: [true, 'Category Id is missing']
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
