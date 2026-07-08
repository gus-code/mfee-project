import mongoose, { Document, Schema, Types } from 'mongoose';
import Comment from '../models/comment.model'

interface IPost extends Document {
  title: string;
  image: string;
  description: string;
  category: Types.ObjectId;
}

export const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

postSchema.pre("findOneAndDelete", async function (next) {
  const postId = this.getQuery()._id;

  await Comment.deleteMany({
    post: postId
  });

  next();
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;