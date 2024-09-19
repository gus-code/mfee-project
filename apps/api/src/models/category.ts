import mongoose, { Document, Schema } from 'mongoose';

interface ICategory extends Document {
  name: string;
}

const categorySchema = new Schema<ICategory>(
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
