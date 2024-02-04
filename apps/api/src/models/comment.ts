import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
  author: string;
  content: string;
}

export const commentSchema = new Schema<IComment>(
  {
    author: {
      type: String,
      required: [true, 'Author is required']
    },
    content: {
      type: String,
      required: [true, 'Content is missing']
    }
  },
  {
    timestamps: true
  }
);

/*  important note: mongoose will take the Capitalized singular string in your model definition and 
      automatically transform it to a plural lowercased version for the collection name. 
      Ex. `Post` will be transformed to `posts` for the collection name
  */
const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
