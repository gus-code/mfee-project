export type Input = {
  value: string;
  error: string;
};

export type FormInputs = {
  title: Input;
  description: Input;
  category: Input;
  image: Input;
};

export type NewPost = {
  title: string;
  image: string;
  description: string;
  category: string;
};

export type Comment = {
  id: string;
  author: string;
  content: string;
};

export interface Alert {
  severity?: "error" | "warning" | "info" | "success";
  message: string;
}

export type Order = "asc" | "desc";

export interface TableData {
  [key: string]: string;
}

export interface HeadCell {
  id: string;
  label: string;
}

export type FormData = { [key: string]: string };

export type Inputs = {
  id: string;
  name: keyof FormInputs;
  label: string;
  type: string;
  options?: { id?: string; name: string }[];
}[];

export interface Category {
  id: string;
  name: string;
}

export interface NewCategory {
  name: string;
}

export interface CategoriesResponse {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type Post = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: string[];
};

export type SelectedPost = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: CommentResponse[];
};

export interface PostsResponse {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CommentResponse {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface PostResponse {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: CategoriesResponse | null;
  comments: CommentResponse[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NewComment {
  author: string;
  content: string;
}

export interface User {
  username: string;
  password: string;
}

export interface NewUser extends User {
  firstame: string;
  lastname: string;
}

export interface AuthResponse {
  message: string;
}

export interface AuthLoginResponse {
  accessToken: string;
}
