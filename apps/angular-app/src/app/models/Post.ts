import { Category, GetCategoryResponse } from './Category';
import { Comment, CommentResponse } from './Comment';

export type Post = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: Category;
  comments: {
    count: number;
    data?: Array<Comment>;
  };
};

export type GetPostsResponse = {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: GetCategoryResponse;
  comments: Array<string>;
};

export type GetPostResponse = {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: GetCategoryResponse;
  comments: Array<CommentResponse>;
};
