import mongoose, {Document, Schema} from "mongoose"


interface ICategory extends Document {
  name: string;
}

export const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Property is required']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

categorySchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "category",
});


const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;