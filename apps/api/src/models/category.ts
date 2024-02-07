import mongoose, { Schema } from 'mongoose';
import ICategory from '../interfaces/category';

export const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Property is required']
    }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
