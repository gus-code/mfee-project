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
  severity?: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

export type Order = 'asc' | 'desc';

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

// for Table Category
export interface TableCategoryProps {
  categoriesList: Category[];
}

// for AddCategoryForm component
export type CategoryInput = {
  category: Input,
}

export type NewCategory = {
  category: string,
}

export interface AddCategoryFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (category: NewCategory) => void;
  initialData?: Category | null;
}



// TypeScript interfaces for BE models


// Payload types

export interface RegisterPayload {
  username: string;
  password: string;
  name?: string;
  lastname?: string; 
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
  accessToken: string;
  refreshToken: string;
  username: string;
  name?: string;
  lastname?: string;
}

export interface MeResponse {
  user: { name: string; username: string } | null;
}

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type CommentsList = {
  commentsArray: Comment[];
}

export interface Post {
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


// -- auth
export interface AuthInterface {
  username: string;
  password: string;
  name?: string;
  lastnmae?: string;
}

export type AuthInput = {
  username: Input,
  password: Input,
  name?: Input,
  lastname?: Input,
}

export type NewAuth = {
  username: string,
  password: string,
  name?: string;
  lastname?: string,
}

