export type Comment = {
  author: string;
  content: string;
  id: string;
};

export type Post = {
  title: string;
  image: string;
  description: string;
  category: string;
  id: string;
  comments: Comment[];
};
