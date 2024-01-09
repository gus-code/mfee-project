import mongoose, { Document, Schema } from 'mongoose';

interface ICategory extends Document {
  name: string;
}

export const categorySchema = new Schema<ICategory>(
  {
    name: String
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
