export interface Post {
  title: string;
  image: string;
  description: string;
  category: string;
  comments: string[];
}

export interface CuratedPost {
  title: string;
  image: string;
  description: string;
  category: string;
}

export interface Comment {
  author: string;
  content: string;
}
