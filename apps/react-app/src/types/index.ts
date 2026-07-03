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

export interface Comment {
  id: string;
  author: string;
  content: string;
  post_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
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
  name: string;
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
  message: string;
}

export interface MeResponse {
  user: { name: string; username: string } | null;
}

export interface User {
  firstname?: string;
  lastname?: string;
  username: string;
  password: string;
}

export interface NewUser extends User {
  firstname: string;
  lastname: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface CommentResponse {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NewComment {
  author: string;
  content: string;
}

export interface NewPost {
  title: string;
  image: string;
  description: string;
  category: string;
}

export interface UpdateCategory {
  id: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface MeResponse {
  user: { name: string; username: string } | null;
}