export default interface Post {
  title: string;
  img?: string;
  description: string;
  categoryID: number;
  categoryName: string;
  comments?: string[];
}

export default interface Comment {
  content: string;
  author?: string;
}
