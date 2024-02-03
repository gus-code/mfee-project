import mongoose, { Document, Schema } from 'mongoose';

interface ICategory {
  name: string;
}

interface IComment {
  author: string;
  content: string;
}
interface IPost extends Document {
  title: string;
  image?: string;
  description: string;
  category: ICategory;
  comments?: Array<IComment>;
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
    comments: {
      type: [{ author: String, content: String }]
    }
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
