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


// TypeScript interfaces for BE models

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewCategory {
  name: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  post_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

// Payload types
export interface RegisterPayload {
  username: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface CreateCategoryPayload {
  name: string;
}

export interface UpdateCategoryPayload {
  name: string;
}

export interface CreatePostPayload {
  title: string;
  image: string;
  description: string;
  category: string;
}

export interface UpdatePostPayload {
  id: string;
  title?: string;
  image?: string;
  description?: string;
  category?: string;
}

export interface CreateCommentPayload {
  id: string;
  author: string;
  content: string;
}

// Response types
export interface AuthResponse {
  accessToken: string;
  message?: string;
}

export interface MeResponse {
  user: { name: string; username: string } | null;
}

// --- to use the endpoint getPost and category (Get)
export interface CategoryN {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CommentN {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type CommentsList = {
  commentsArray: CommentN[];
}

export interface PostN {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: Category;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}