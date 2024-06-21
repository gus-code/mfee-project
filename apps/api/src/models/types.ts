export type Category = {
  id: string,
  name: string;
}

export type Comment = {
  id: string
  author: string
  content: string
}

export type Post = {
  id: string
  title: string
  image: string
  description: string
  category: Category['id'][]
  comments: Comment['id'][]
}

export type PostResponse = Post & {
  category: Category[]
  comments: Comment[]
}
