import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Property is required']
    },
    password: {
      type: String,
      required: [true, 'Property is required']
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;