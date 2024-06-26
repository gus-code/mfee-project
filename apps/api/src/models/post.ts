import mongoose, { Document, Schema } from 'mongoose';

import Comment from './comment';

interface IPost extends Document {
  title: string;
  image: string;
  description: string;
  category: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
}

const postSchema = new Schema<IPost>(
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
        ref: 'Comment'
      }
    ]
  },
  {
    timestamps: true
  }
);

postSchema.pre('findOneAndDelete', async function (next) {
  try {
    const postToDelete = await this.model.findById(this.getFilter());
    await Comment.deleteMany({ _id: { $in: postToDelete.comments } });
    next();
  } catch (error) {
    console.log(error, 'ERROR!!!');
    next(error);
  }
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;