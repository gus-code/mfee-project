import mongoose from 'mongoose';

interface IPost extends mongoose.Document {
  title: string;
  image: string;
  description: string;
  category: mongoose.Schema.Types.ObjectId;
  comments: mongoose.Schema.Types.ObjectId[];
}

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required']
    },
    image: {
      type: String,
      required: [true, 'image is required']
    },
    description: {
      type: String,
      required: [true, 'description is required']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'category is required']
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Comment',
      required: [true, 'comments is required']
    }
  },
  {
    timestamps: true
  }
);

const PostDocument = mongoose.model<IPost>('Post', postSchema);

export default PostDocument;
