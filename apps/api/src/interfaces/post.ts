import { Document } from 'mongoose';
import ICategory from '../interfaces/category';

export default interface Comment {
  content: string;
  author?: string;
}

export default interface Post extends Document {
  title: string;
  img?: string;
  description: string;
  category: ICategory;
  comments?: Comment[];
}
